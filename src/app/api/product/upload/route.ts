import { del } from '@vercel/blob';
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');
    try {

        if (filename && request.body) {
            const blob = await put('product/' + filename, request.body, {
                access: 'public',
                token: process.env.BLOB_READ_WRITE_TOKEN
            });

            return NextResponse.json(blob);
        } else {
            return NextResponse.json({ status: 500, message: 'Some Error uploading the image' })
        }
    } catch (err) {
        console.log(err);
        return NextResponse.json({ status: 500, message: 'Internal Server Error' })
    }
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const urlToDelete = searchParams.get('url') as string;
    await del(urlToDelete);
    return NextResponse.json({ message: 'image deleted' });
}
