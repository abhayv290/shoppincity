import React from 'react'
import Container from '@/src/Components/Container'
import ProductDetails from '@/src/Components/ProductDetails'
import RatingPage from './RatingPage'
import getProducts from '@/src/actions/getProduct'
import AddRating from './AddRating'
import { getUser } from '@/src/actions/getUser'

interface ProductParams {
    productId?: string
}
export default async function Product({ params }: { params: ProductParams }) {
    const products = await getProducts({ category: null });
    const { productId } = await params;
    const user: any = await getUser();
    const product: any = products.find(item => item.id === productId)



    return (
        <div className='mx-auto sm:px-5 pt-10 pb-10  px-2'>
            <Container>
                <ProductDetails product={product} />
                <div className='flex flex-col w-full mt-32 gap-4'>
                    <hr />
                    {user && <AddRating product={product} user={user} />}
                    {
                        product.reviews.length !== 0 ? <RatingPage product={product} /> : null

                    }
                </div>
            </Container>
        </div>
    )
}
