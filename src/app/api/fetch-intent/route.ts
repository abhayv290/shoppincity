import { getUser } from "@/src/actions/getUser";
import { NextResponse } from "next/server";
import prisma from '@/src/libs/prismadb';
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2025-02-24.acacia',
});

export async function POST(req: Request) {
    try {
        const currUser = await getUser();
        if (!currUser) {
            return NextResponse.json({ status: 401, message: 'Unauthorized' });
        }

        const { paymentId } = await req.json();
        if (!paymentId) {
            return NextResponse.json({ status: 400, message: 'Invalid payment ID' });
        }

        // Retrieve the existing PaymentIntent
        const currIntent = await stripe.paymentIntents.retrieve(paymentId);
        if (!currIntent || currIntent.status !== 'succeeded') {
            return NextResponse.json({
                status: 400,
                message: `PaymentIntent not succeeded. Current status: ${currIntent?.status}`,
            });
        }

        // Extract the address if available
        const shippingAddress = currIntent.shipping?.address;

        // Update the order in the database
        const updatedOrder = await prisma.order.update({
            where: { paymentId },
            data: {
                status: 'succeeded',
                deliveryStatus: 'processing',
                address: shippingAddress,
            },
        });

        return NextResponse.json({
            status: 200,
            message: 'Order data updated successfully',
            order: updatedOrder,
        });
    } catch (error: any) {
        console.error('Error updating order:', error.message);
        return NextResponse.json({
            status: 500,
            message: 'Internal server error',
        });
    }
}
