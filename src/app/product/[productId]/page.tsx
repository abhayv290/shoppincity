import React from 'react'
import Container from '@/src/Components/Container'
import ProductDetails from '@/src/Components/ProductDetails'
import RatingPage from './RatingPage'
import getProducts from '@/src/actions/getProduct'
import AddRating from './AddRating'
import { getUser } from '@/src/actions/getUser'
import { ProductParams } from '@/src/actions/getProduct'
type ProductParam = Promise<{
    productId?: string
}>
export default async function Product({ params }: { params: ProductParam }) {
    const { productId } = await params;
    // Fetch products and user in parallel
    const [products, User] = await Promise.all([
        getProducts({ category: null }),
        getUser(),
    ]);

    const product: any = products.find(item => item.id === productId)



    return (
        <div className='mx-auto sm:px-5 pt-10 pb-10  px-2'>
            <Container>
                <ProductDetails product={product} />
                <div className='flex flex-col w-full mt-32 gap-4'>
                    <hr />
                    {User && <AddRating product={product} user={User} />}
                    {
                        product.reviews.length !== 0 ? <RatingPage product={product} /> : null

                    }
                </div>
            </Container>
        </div>
    )
}
