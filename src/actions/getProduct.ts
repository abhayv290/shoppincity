import prisma from '@/src/libs/prismadb';

export type ProductParams = {
    category?: string | null;
    search?: string | null;
}

export default async function getProducts(params: ProductParams) {
    try {
        const { category, search } = params;

        // Simplify search initialization
        const searchString = search || '';

        // Build query conditionally
        const query: any = {
            ...(category && { category }),
            ...(searchString && {
                OR: [
                    { name: { contains: searchString, mode: 'insensitive' } },
                    { description: { contains: searchString, mode: 'insensitive' } },
                ],
            }),
        };

        const products = await prisma?.product.findMany({
            where: query,
            include: {
                reviews: {
                    include: {
                        user: true,
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
            },
        });

        return products;
    } catch (err: any) {
        console.error('Error fetching products:', err.message || err);
        throw new Error('Failed to fetch products. Please try again later.');
    }
}
