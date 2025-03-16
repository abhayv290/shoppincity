import Container from '@/src/Components/Container'
import React from 'react'
import OrderDetails from './OrderDetails'
import getOrders from '@/src/actions/getOrders'
import { getUser } from '@/src/actions/getUser'

interface PageProps {
    params: {
        orderid: string;
    };
}
type Params = Promise<{ orderid: string }>

export default async function Page({ params }: { params: Params }) {
    const { orderid } = await params;
    const Orders = await getOrders();
    const currUser = await getUser();

    if (!currUser) {
        return (
            <div className='p-8 shadow-sm shadow-black text-2xl font-semibold text-center'>
                Unauthorized
            </div>
        );
    }

    const order = Orders.find(item => item.id === orderid);

    return (
        <div className='w-full p-4 md:p-8'>
            <Container>
                <OrderDetails order={order} />
            </Container>
        </div>
    );
}
