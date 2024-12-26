import { getServerSession } from "next-auth";
import prisma from "../libs/prismadb";
import { authOptions } from '@/src/pages/api/auth/[...nextauth]';

export async function getSession() {
    try {
        return await getServerSession(authOptions);
    } catch (error) {
        console.error("Failed to retrieve session:", error);
        return null; // Return null on session retrieval failure
    }
}

export async function getUser() {
    try {
        const session = await getSession();
        if (!session || !session.user?.email) {
            console.warn("No valid session or email found.");
            return null; // Return null if no session or user email
        }

        // Fetch user with only required fields
        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email,
            },
            select: {
                id: true,
                email: true,
                name: true,
                image: true,
                createdAt: true,
                updatedAt: true,
                emailVerified: true,
            },
        });

        if (!user) {
            console.warn(`No user found with email: ${session.user.email}`);
            return null; // Return null if no user is found
        }

        return {
            ...user,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
            emailVerified: user.emailVerified?.toISOString() || null,
        };
    } catch (error) {
        console.error("Failed to retrieve user:", error);
        return null; // Return null if an error occurs
    }
}
