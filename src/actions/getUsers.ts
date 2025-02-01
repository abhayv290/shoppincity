import prisma from '@/src/libs/prismadb'

export default async function getUsers() {
    try {
        const users = await prisma.user.findMany();
        return users
    } catch (err: any) {
        throw new Error(err)
    }
}