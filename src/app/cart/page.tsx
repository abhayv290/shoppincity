'use client'
import React from 'react'
import { cartProductType } from '@/src/Components/ProductDetails';
import Container from '@/src/Components/Container';
import { useCart } from '@/src/hooks/useCart';
import truncate from '@/src/utills/truncate';

import priceCalc from '@/src/utills/priceCalc';
import formatPrice from '@/src/utills/formatPrice';

import Image from 'next/image';

import { AiTwotoneDelete } from 'react-icons/ai';
import { Router } from 'next/router';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';


export default function Cart() {
    const { cartItem, cartQty, handleQtyChange, removeItemsFromCart } = useCart();

    const router = useRouter();


    return (
        <div className='mx-auto'>
            <Container>
                <div className="container mx-auto mt-10">
                    <Toaster />
                    {!cartItem.length ? <div className='flex flex-col gap-5 justify-center items-center w-full pb-10'>
                        <Image className='object-contain object-center w-full h-full' alt='emptyCart' height={800} width={1000} src={'https://th.bing.com/th?id=OIP.YwAZew3YsrZlqgJzEv3ZjAHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2'} ></Image>
                        <h1 className='text-xl sm:2xl md:4xl text-center text-slate-800 font-bold'>Your Cart is Empty</h1>
                        <button className='px-4 py-1 rounded-sm text-blue-50 text-base w-1/2 bg-slate-500 hover:bg-slate-700 active:bg-slate-900 shadow-sm hover:shadow-slate-200' type='button' onClick={() => router.push('/')}>Shop Now</button></div>
                        : <div className="sm:flex shadow-md my-10">
                            <div className="  w-[90%] text-slate-900 sm:w-3/4 bg-white sm:px-10 py-10">
                                <div className="flex justify-between border-b pb-8">
                                    <h1 className="font-semibold  text-2xl">Shopping Cart</h1>
                                    <h2 className="font-semibold  text-2xl">{cartQty} Items</h2>
                                </div>
                                {cartItem.map((items) => (<div key={items.id} className="flex items-strech py-1 sm:py-4 md:py-10 lg:py-8 border-t border-gray-50">
                                    <div className="w-3/12 2xl:w-1/4 ">
                                        <Image src={items.selectImg.image} height={200} width={200} alt="Black Leather Purse" className="h-full w-full object-center object-contain block" />
                                        {/* <img src={items.selectImg.image} alt="Black Leather Purse" className="md:hidden  h-full object-center object-contain" /> */}
                                    </div>
                                    <div className="md:pl-3 pl-1 sm:pl-2  w-7/12 2xl:w-3/4 flex flex-col justify-center">
                                        <h5 className="text-s font-semibold leading-3 text-gray-800 md:pt-0 pt-4">{items.brand}</h5>
                                        <div className="flex  items-center justify-between w-full">
                                            <h6 className="text-base w-1/2 font-black leading-none text-wrap text-gray-800">{truncate(items.name)}</h6>
                                            <SetQty cartItem={items} handleQtyChange={handleQtyChange} cartCounter={false} />
                                        </div>
                                        {/* <p className="text-xs leading-3 text-gray-600 pt-2">Height: 10 inches</p> */}
                                        <p className="text-xs leading-3 text-gray-600 py-4">{items.selectImg.color}</p>
                                        <p className="w-96 text-xs leading-3 text-gray-600">{items.description.substring(0, 25)}...</p>
                                        <div className="flex items-center justify-between pt-5">
                                            <div className="flex items-center">
                                                <button type='button' className="text-xs leading-3 underline text-gray-800 cursor-pointer">Move to WishList</button>
                                                <button onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => { toast.success(items.brand + ' removed from the cart'); removeItemsFromCart(items) }} type='button' className="text-lg leading-3 underline text-red-500 pl-5 cursor-pointer"><AiTwotoneDelete /> </button>
                                            </div>
                                            <p className="text-base font-black leading-none text-gray-800">{formatPrice(items.price)}</p>
                                        </div>
                                    </div>
                                </div>))}


                                <a href="#" className="flex font-semibold text-indigo-600 text-sm mt-10">
                                    <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">
                                        <path
                                            d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                                    </svg>
                                    Continue Shopping
                                </a>
                            </div>
                            <div id="summary" className=" w-[90%]   sm:w-1/4   md:w-1/2 sm:px-8 py-10">
                                <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                                <div className="flex justify-between mt-10 mb-5">
                                    <span className="font-semibold text-sm uppercase">{cartQty} Items</span>
                                    <span className="font-semibold text-sm">{priceCalc(cartItem)}</span>
                                </div>
                                <div>
                                    <label className="font-medium inline-block mb-3 text-sm uppercase">
                                        Shipping
                                    </label>
                                    <select className="block p-2 text-gray-600 w-full text-sm">
                                        <option>Standard shipping - ₹40.00</option>
                                        <option>One Day shipping - ₹100.00</option>
                                        <option>Same Day shipping -₹200.00</option>
                                    </select>
                                </div>
                                <div className="py-10">
                                    <label
                                        htmlFor="promo"
                                        className="font-semibold inline-block mb-3 text-sm uppercase"
                                    >
                                        Promo Code
                                    </label>
                                    <input
                                        type="text"
                                        id="promo"
                                        placeholder="Enter your code"
                                        className="p-2 text-sm w-full"
                                    />
                                </div>
                                <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
                                    Apply
                                </button>
                                <div className="border-t mt-8">
                                    <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                                        <span>Total cost</span>
                                        <span>{priceCalc(cartItem)}</span>
                                    </div>
                                    <button className="font-semibold bg-slate-500 py-3 rounded-sm shadow-sm shadow-slate-300 hover:bg-slate-700 text-sm text-white uppercase w-full">
                                        Checkout
                                    </button>
                                </div>
                            </div>
                        </div>}
                </div>
            </Container>
        </div>
    )
}


interface SetQtyProps {
    cartItem: cartProductType;
    cartCounter: boolean;
    handleQtyChange: (num: number, product: cartProductType) => void;
}

const SetQty: React.FC<SetQtyProps> = ({ cartItem, handleQtyChange, cartCounter }) => {
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newQuantity = parseInt(e.target.value, 10);
        const quantityChange = newQuantity - cartItem.quantity;
        handleQtyChange(quantityChange, cartItem);
    };
    return (



        <div >

            <select className='border border-gray-300 shadow-sm shadow-gray-200' aria-label='Quantity' name="Qty" id="Qty" value={cartItem.quantity} onChange={handleSelectChange}>
                {[...Array(8)].map((_, i) => (
                    <option key={i + 1} value={i + 1 <= 5 ? i + 1 : (i - 3) * 5}>
                        {i + 1 <= 5 ? i + 1 : (i - 3) * 5}
                    </option>
                ))}
            </select>
        </div>

    )
}

