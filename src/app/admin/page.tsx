
import getDataForGraph from '@/src/actions/getDataForGraph';
import getOrders from '@/src/actions/getOrders';
import getProducts from '@/src/actions/getProduct'
import { getUser } from '@/src/actions/getUser';
import getUsers from '@/src/actions/getUsers';
import OrderGraph from '@/src/Components/admin/OrderGraph';
import Summary from '@/src/Components/admin/Summary'
import Container from '@/src/Components/Container'


import React from 'react'

export default async function page() {
    const product = await getProducts({});
    const users = await getUsers();
    const orders = await getOrders();
    const graphData = await getDataForGraph();
    return (
        <Container>
            <div className='mx-auto px-5 md:px-10 lg:px-20'>
                <Summary products={product} users={users} orders={orders} />
                <div className='mx-auto lg:py-10'>
                    <OrderGraph data={graphData} />
                </div>
            </div>
        </Container>

    )
}
