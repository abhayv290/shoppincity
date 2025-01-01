import Container from '@/src/Components/Container'

import React from 'react'
import CheckoutClient from './CheckoutClient'
import { Metadata } from 'next'
export const metadata: Metadata = {
    title: "Shop for Electronics, Fashion, and More! ShoppinCity",
    description: "Find a wide range of products from electronics to fashion, all at unbeatable prices. Enjoy fast shipping, secure payments, and excellent customer service. Shop now and experience the convenience of ShoppinCity!",
};
export default function page() {
    return (
        <div className='md:p-8 py-5  w-full'>

            <Container>

                <CheckoutClient />

            </Container>
        </div>
    )
}
