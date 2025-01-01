import React from 'react'
import Container from '@/src/Components/Container'

import { products } from '@/src/app/products'
import ProductDetails from '@/src/Components/ProductDetails'
import RatingPage from '@/src/Components/RatingPage'

interface Iparams {
    productId?: string
}
export default function Product({ params }: { params: Iparams }) {
    //Find the right Product 

    const product = products.find(item => item.id === params.productId)


    return (
        <div className='mx-auto sm:px-5 pt-10 pb-10  px-2'>
            <Container>
                <ProductDetails product={product} />
                <div className='flex flex-col mt-20 gap-4'>
                    <div>Add the Rating</div>
                    <RatingPage product={product} />
                </div>
            </Container>
        </div>
    )
}
