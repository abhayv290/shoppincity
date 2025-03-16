import Stripe from 'stripe';
import prisma from '@/src/libs/prismadb';
import { NextResponse } from 'next/server';
import { cartProductType } from '@prisma/client';
import { getUser } from '@/src/actions/getUser';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2025-02-24.acacia',
});

// Calculate total amount from the cart items
const calculateAmount = (products: cartProductType[]) => {
    return products.reduce((total, item) => total + item.price * item.quantity, 0) * 100;
};

export async function POST(req: Request) {
    try {
        const currUser = await getUser();
        if (!currUser) {
            return NextResponse.json({ success: false, status: 401, message: 'Unauthorized' });
        }

        const { items, payment_intent_id } = await req.json();

        // Validate input
        if (!items || !Array.isArray(items) || items.length === 0) {
            return NextResponse.json({ success: false, status: 400, message: 'Invalid items' });
        }

        const totalAmount = calculateAmount(items);

        // Prepare order data
        const orderData = {
            user: { connect: { id: currUser.id } },
            amount: totalAmount,
            currency: 'USD',
            status: 'pending',
            deliveryStatus: 'pending',
            products: items,
            paymentId: payment_intent_id || '',
        };

        if (payment_intent_id) {
            // Retrieve the existing PaymentIntent
            const currIntent = await stripe.paymentIntents.retrieve(payment_intent_id);


            // Check if the PaymentIntent is modifiable
            if (
                ['requires_payment_method', 'requires_confirmation', 'requires_action'].includes(currIntent.status)
            ) {
                const updatedIntent = await stripe.paymentIntents.update(payment_intent_id, {
                    amount: totalAmount,
                });

                const updatedOrder = await prisma.order.update({
                    where: { paymentId: payment_intent_id },
                    data: { amount: totalAmount, products: items },
                });

                return NextResponse.json({
                    success: true,
                    paymentIntent: updatedIntent,
                    order: updatedOrder,
                });
            } else {
                return NextResponse.json({
                    success: false,
                    status: 400,
                    message: `Cannot update PaymentIntent with status: ${currIntent.status}`,
                });
            }
        } else {
            // Create a new PaymentIntent and order
            const paymentIntent = await stripe.paymentIntents.create({
                amount: totalAmount,
                currency: 'USD',
                automatic_payment_methods: { enabled: true },
            });

            orderData.paymentId = paymentIntent.id;
            const newOrder = await prisma.order.create({ data: orderData });

            return NextResponse.json({
                success: true,
                paymentIntent,
                order: newOrder,
            });
        }
    } catch (error: any) {
        console.error('Error processing payment:', error.message);
        return NextResponse.json({ success: false, status: 500, message: 'Internal server error' });
    }
}
