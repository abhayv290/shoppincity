import Razorpay from "razorpay";
import prisma from "@/src/libs/prismadb";
import { NextResponse } from "next/server";
import { cartProductType } from "@/src/Components/ProductDetails";
import { getUser } from "@/src/actions/getUser";

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID as string,
    key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

// Calculate Order Amount
const OrderAmount = (items: cartProductType[]) => {
    const totalAmt = items.reduce((acc, item) => {
        return acc + item.price * item.quantity;
    }, 0);
    return totalAmt;
};

export async function POST(req: Request) {
    const User = await getUser();
    if (!User) {
        return NextResponse.json({ success: false, error: "Unauthorized Error" });
    }

    const { items, order_id } = await req.json(); // Updated to handle Razorpay's order_id
    const totalAmount = OrderAmount(items);
    const orderData = {
        user: { connect: { id: User.id } },
        amount: totalAmount,
        currency: "INR",
        status: "pending",
        deliveryStatus: "pending",
        paymentId: order_id,
        products: items,
    };

    if (order_id) {
        // Retrieve and update the Razorpay order
        const existingOrder = await prisma.order.findFirst({
            where: {
                paymentId: order_id,
            },
        });

        if (!existingOrder) {
            return NextResponse.json({ success: false, error: "Invalid Order ID", status: 400 });
        }

        // Update the database order details
        const updated_order = await prisma.order.update({
            where: {
                paymentId: order_id,
            },
            data: {
                amount: totalAmount,
                products: items,
            },
        });

        return NextResponse.json({ success: true, paymentIntent: updated_order });
    } else {
        // Create a new Razorpay order
        const razorpayOrder = await razorpay.orders.create({
            amount: totalAmount * 100, // Convert to paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        });

        orderData.paymentId = razorpayOrder.id;

        // Save order in the database
        await prisma.order.create({
            data: orderData,
        });

        return NextResponse.json({ paymentIntent: razorpayOrder });
    }
}
