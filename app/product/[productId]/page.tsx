import React from 'react'
import Container from '@/app/Components/Container'
import { product } from '@/app/utills/product'
import ProductDetails from '@/app/Components/ProductDetails'

interface Iparams {
    productId?: string
}
export default function Product({ params }: { params: Iparams }) {
    return (
        <div className='mx-auto sm:px-5 pt-10 pb-10  px-2'>
            <Container>
                <ProductDetails product={product} />
                <div>
                    <div>Add the Rating </div>
                    <div>List of Rating</div>
                </div>
            </Container>
        </div>
    )
}
