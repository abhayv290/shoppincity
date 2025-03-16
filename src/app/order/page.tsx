import getOrders from '@/src/actions/getOrders';
import { getUser } from '@/src/actions/getUser';
import Container from '@/src/Components/Container';
import formatPrice from '@/src/utills/formatPrice';
import truncate from '@/src/utills/truncate'
import Image from 'next/image';
import Link from 'next/link';



import React from 'react';

const page = async () => {
    const currUser = await getUser();

    if (!currUser) {
        return (
            <Container>

                <div className='p-8 shadow-sm shadow-black text-xl font-semibold text-center'>
                    <p>
                        UnAuthorized! Please Login
                    </p>
                    <Link className='font-medium hover:text-red-300 underline underline-offset-2 active:text-blue-400' href={'/login'}>Login</Link>
                </div>
            </Container>
        );
    }

    const Orders = await getOrders();
    const myOrders = Orders.filter((item) => item.userId === currUser.id);

    if (myOrders.length === 0) {
        return (
            <Container>

                <div className="p-8 mt-10 text-center  shadow-sm shadow-black">
                    <h1 className="text-2xl font-bold">No Orders Found</h1>
                    <p className="text-gray-600">You haven’t placed any orders yet.</p>
                </div>
            </Container>
        );
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-8">My Orders</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myOrders.map((order) => (
                    <Link href={'order/' + order.id} key={order.id} className="bg-white shadow-md rounded-lg p-6">
                        {/* Order Summary */}
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Order ID: {order.id}</h2>
                            <p className="text-gray-600 mb-2">Amount: <span className="text-rose-400">{formatPrice(order.amount / 100)}</span></p>
                            <p className="text-gray-600 mb-2">
                                Payment Status:
                                <span
                                    className={`ml-2 px-3 py-1 rounded-full ${order.status === 'succeeded'
                                        ? 'bg-green-200 text-green-700'
                                        : 'bg-yellow-200 text-yellow-700'
                                        }`}
                                >
                                    {order.status}
                                </span>
                            </p>
                            <p className="text-gray-600 mb-2">
                                Delivery Status:
                                <span
                                    className={`ml-2 px-3 py-1 rounded-full ${order.deliveryStatus === 'delivered'
                                        ? 'bg-green-200 text-green-700'
                                        : 'bg-blue-200 text-blue-700'
                                        }`}
                                >
                                    {order.deliveryStatus}
                                </span>
                            </p>
                        </div>

                        {/* Ordered Products */}
                        <div className="mt-4">
                            <h3 className="text-lg font-bold mb-2">Products:</h3>
                            <ul className="space-y-2">
                                {order.products.map((product) => (
                                    <li key={product.id} className="flex items-center gap-4">
                                        <Image width={500} height={500}
                                            src={product.selectImg.image}
                                            alt={product.brand}
                                            className="w-16 h-16 object-contain rounded"
                                        />
                                        <div>
                                            <p className="text-gray-800 font-medium">{truncate(product.name)}</p>
                                            <p className="text-gray-600 text-sm">{product.category}</p>
                                            <p className="text-gray-600 text-sm">Qty: {product.quantity}</p>
                                            <p className="text-gray-600 text-sm">Price: {formatPrice(product.price)}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default page;
