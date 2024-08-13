import { getServerSession } from "next-auth";
import prisma from "../libs/prismadb";
import { authOptions } from '@/src/pages/api/auth/[...nextauth]';

export async function getSession() {
    return await getServerSession(authOptions);
}

export async function getUser() {
    try {
        const session = await getSession(); // Ensure to await the session retrieval
        if (!session?.user?.email) {
            return null; // Return null if there's no session or no user email
        }

        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email
            }
        });

        if (!user) return null;

        return {
            ...user,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
            emailVerified: user.emailVerified?.toISOString() || null
        };
    } catch (error) {
        console.error("Failed to retrieve user:", error);
        return null; // Return null if there's an error
    }
}
