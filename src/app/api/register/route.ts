
import prisma from '@/src/libs/prismadb'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
export async function POST(req: Request) {
    const { name, email, password } = await req.json();
    if (!req.body) {
        throw new Error('Invalid Credentials');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: { name, email, hashedPassword }
    })
    return NextResponse.json(user);
}