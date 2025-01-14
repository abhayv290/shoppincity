import { getUser } from "@/src/actions/getUser";
import { Review } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const currUser = await getUser();
    if (!currUser) {
        return NextResponse.json({ status: 401, message: 'UnAuthorize! Please Login ' })
    }
    const { comment, rating, product } = await req.json();
    try {
        const delivered = currUser.order.some(order => order.products.find(item => item.id === product.id) && order.deliveryStatus === 'processing');
        const prevReview = product.reviews.find((review: Review) => review.userId === currUser.id);
        if (!delivered) return NextResponse.json({ status: 403, message: 'You have not made  purchase of this product ' });
        if (prevReview) return NextResponse.json({ status: 400, message: 'Reviewed' });
        const newReview = await prisma?.review.create({
            data: {
                userId: currUser.id,
                productId: product.id,
                rating: rating,
                comment: comment,
            }
        })
        return NextResponse.json({ status: 200, reviews: newReview })
    } catch (err: any) {
        throw new Error(err);
    }
}

