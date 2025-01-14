import prisma from '@/src/libs/prismadb'
export default async function (productId: string) {
    const review = prisma?.review.findMany({
        where: {
            productId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    return review;
}