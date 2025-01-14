import Container from '@/src/Components/Container'
import React from 'react'
import ManageProducts from './ManageProducts'
import getProducts from '@/src/actions/getProduct'

const page = async () => {
    const products = await getProducts({ category: null });
    return (
        <div>
            <Container>
                <ManageProducts products={products} />
            </Container>
        </div>
    )
}

export default page