import Stripe from 'stripe';
import prisma from '@/src/libs/prismadb'
import { NextResponse } from 'next/server';
import { cartProductType } from '@/src/Components/ProductDetails';
import { getUser } from '@/src/actions/getUser';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-12-18.acacia",
});

const OrderAmount = (items: cartProductType[]) => {
    const totalAmt = items.reduce((acc, item) => {
        return acc + (item.price * item.quantity);
    }, 0)
    return totalAmt;
}

export async function POST(req: Request) {
    const User = await getUser();
    if (!User) {
        return NextResponse.json({ success: false, error: 'Unathorized Error' });
    }
    const { items, payment_intent_id } = req.body;
    const totalAmount = OrderAmount(items);


}