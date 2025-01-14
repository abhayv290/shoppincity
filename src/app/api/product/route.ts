import { getUser } from "@/src/actions/getUser";
import { NextResponse } from "next/server";

//add the product to store
export async function POST(req: Request) {
    const currUser = await getUser();
    if (!currUser || currUser?.role !== 'ADMIN') return NextResponse.json({ status: 401, message: 'UnAuthorize User' });
    const { name, description, inStock, category, brand, price, images } = await req.json();

    const product = await prisma?.product.create({
        data: {
            name, description, category, price: parseFloat(price), brand, images, inStock
        }
    })
    if (product) {
        return NextResponse.json({ status: 200, message: 'Product added' });
    }
    return NextResponse.json({ status: 400, message: 'data not uploaded ' })
}

// update the stock option
export async function PUT(req: Request) {
    const currUser = await getUser();
    if (!currUser || currUser?.role !== 'ADMIN') return NextResponse.json({ status: 401, message: 'UnAuthorize User' });
    const { id, inStock } = await req.json();

    const product = await prisma?.product.update({
        where: { id },
        data: { inStock }
    });
    if (product) {
        return NextResponse.json({ status: 200, message: 'Product updated' });
    }
    return NextResponse.json({ status: 500, message: 'Internal Server Error' });
}

export async function DELETE(req: Request) {
    const currUser = await getUser();
    if (!currUser || currUser?.role !== 'ADMIN') return NextResponse.json({ status: 401, message: 'UnAuthorize User' });

    const { id } = await req.json();
    const product = await prisma?.product.delete({
        where: { id }
    })
    if (product) {
        return NextResponse.json({ message: 'product deleted' });
    }
    return NextResponse.json({ message: 'some error occurred' })
}