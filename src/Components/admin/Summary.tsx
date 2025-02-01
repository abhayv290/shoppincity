'use client'


import formatPrice from '@/src/utills/formatPrice';
import { Order, Product, User } from '@prisma/client'
import React, { useEffect, useState } from 'react'
interface SummaryProps {
    products: Product[];
    users: User[];
    orders: Order[];
}
interface SummaryDataType {
    [key: string]: {
        label: string;
        digit: number;
    }
}
const Summary: React.FC<SummaryProps> = ({ products, users, orders }) => {
    const [summaryData, setSummaryData] = useState<SummaryDataType>({
        sale: {
            label: 'sale',
            digit: 0
        },
        products: {
            label: 'All Products',
            digit: 0
        },
        orders: {
            label: 'All Orders',
            digit: 0
        },
        paidOrders: {
            label: 'paid Orders',
            digit: 0
        },
        unpaidOrders: {
            label: 'unpaid Orders ',
            digit: 0
        },
        users: {
            label: 'Users ',
            digit: 0
        },
    })
    useEffect(() => {
        setSummaryData(prev => {
            let tempD = { ...prev }
            const totalSales = orders.reduce((acc, item) => {
                if (item.status === 'succeeded') {
                    return acc + item.amount
                } else {
                    return acc
                }
            }, 0)
            const unpaidOrders = orders.filter(order => order.status === 'pending')
            tempD.sale.digit = totalSales
            tempD.orders.digit = orders.length
            tempD.paidOrders.digit = orders.length - unpaidOrders.length
            tempD.unpaidOrders.digit = unpaidOrders.length
            return tempD
        })
    }, [users, orders, products])
    const summaryKeys = Object.keys(summaryData);
    return (
        <div className='lg:px-10'>
            <div className='mb-5 mt-10'>
                <h2 className='text-xl md:text-2xl lg:text-3xl font-bold text-center'>Statistics</h2>
            </div>
            <div className='grid grid-cols-2  gap-4 max-h-50vh overflow-y-auto'>
                {summaryKeys?.map((item, idx) => (
                    <div key={idx} className='rounded-xl shadow border-2 p-4 flex flex-col items-center gap-4  transition'>
                        <div className='font-bold text-xl md:text-2xl lg:text-3xl'>
                            {summaryData[item].label === 'sale' ? <span className='first-letter:text-rose-500'>{formatPrice((summaryData[item].digit) / 100)} </span> : <>{summaryData[item].digit}</>}
                        </div>
                        <div className='font-medium'>{summaryData[item].label}</div>
                    </div>
                ))}


            </div>

        </div>
    )
}

export default Summary