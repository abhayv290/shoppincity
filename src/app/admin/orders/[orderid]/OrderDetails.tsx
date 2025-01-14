import formatPrice from '@/src/utills/formatPrice';
import truncate from '@/src/utills/truncate';
import { cartProductType } from '@prisma/client';
import Image from 'next/image';
import React from 'react';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);

interface OrderDetailProp {
    order: any;
}

const getDeliveryProgress = (status: string) => {
    switch (status) {
        case 'processing':
            return 33;
        case 'shipped':
            return 66;
        case 'delivered':
            return 100;
        default:
            return 0;
    }
};

const OrderDetails: React.FC<OrderDetailProp> = ({ order }) => {
    const deliveryProgress = getDeliveryProgress(order?.deliveryStatus);

    return (
        <div className="p-6 bg-blue-50 min-h-screen">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Order Summary */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                    <ul className="space-y-2">
                        <li className="text-lg font-medium">Order ID: <b>{order?.id}</b></li>
                        <li className="text-lg font-medium">User ID: <b>{order?.userId}</b></li>
                        <li className="text-lg font-medium">Amount: <b className="text-rose-400">{formatPrice(order?.amount / 100)}</b></li>
                        <li className="text-lg font-medium">
                            Payment Status:
                            <span
                                className={`ml-2 px-3 py-1 rounded-full ${order?.status === 'succeeded'
                                    ? 'bg-green-200 text-green-700'
                                    : 'bg-yellow-200 text-yellow-700'
                                    }`}
                            >
                                {order?.status}
                            </span>
                        </li>
                        <li className="text-lg font-medium">Delivery Status: <b>{order?.deliveryStatus}</b></li>
                        <li className="text-lg font-medium">Date: <b>{dayjs(order?.createdAt).fromNow()}</b></li>
                    </ul>
                </div>

                {/* Delivery Progress */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">Delivery Progress</h2>
                    <div className="relative w-full bg-gray-200 rounded-lg h-4">
                        <div
                            className={`absolute top-0 left-0 h-4 rounded-lg ${deliveryProgress === 100 ? 'bg-green-500' : 'bg-blue-500'
                                }`}
                            style={{ width: `${deliveryProgress}%` }}
                        />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                        {deliveryProgress === 100
                            ? 'Order Delivered'
                            : `${deliveryProgress}% Progress`}
                    </p>

                </div>

                {/* Ordered Products */}
                <div className="overflow-x-auto">
                    <table className="table-auto w-full text-left text-gray-700">
                        <thead>
                            <tr className="bg-rose-50">
                                <th className="px-4 py-2 min-w-[150px]">Product</th>
                                <th className="px-4 py-2 text-center min-w-[100px]">Price</th>
                                <th className="px-4 py-2 text-center min-w-[100px]">Quantity</th>
                                <th className="px-4 py-2 text-center min-w-[150px]">Total Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order?.products?.map((item: cartProductType) => (
                                <tr key={item.id} className="border-b last:border-0">
                                    <td className="px-4 py-4 flex items-start gap-4">
                                        <Image
                                            className="object-contain w-20 h-20"
                                            width={80}
                                            height={80}
                                            src={item.selectImg.image}
                                            alt={item.brand}
                                        />
                                        <div className="flex flex-col">
                                            <h5 className="font-medium text-lg truncate">{truncate(item.name)}</h5>
                                            <p className="text-sm text-gray-500 whitespace-nowrap">{item.selectImg.color}</p>
                                            <p className="text-sm text-gray-500">{item.category}</p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-center text-rose-400 font-semibold whitespace-nowrap">
                                        {formatPrice(item.price)}
                                    </td>
                                    <td className="px-4 py-4 text-center">{item.quantity}</td>
                                    <td className="px-4 py-4 text-center text-rose-400 font-semibold whitespace-nowrap">
                                        {formatPrice(item.quantity * item.price)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default OrderDetails;
