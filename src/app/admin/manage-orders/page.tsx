import getOrders from '@/src/actions/getOrders'
import React from 'react'
import ManageOrders from './ManageOrders';
import Container from '@/src/Components/Container';

export default async function page() {
    const orders = await getOrders();

    return (
        <div className='w-full px-5 py-3'>
            <Container>
                <ManageOrders orders={orders} />

            </Container>
        </div>
    )
}
