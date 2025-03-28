'use client'
import React, { useState } from 'react'
import { cartProductType } from '@/src/Components/ProductDetails';
import Container from '@/src/Components/Container';
import { useCart } from '@/src/hooks/useCart';
import truncate from '@/src/utills/truncate';
import priceCalc from '@/src/utills/priceCalc';
import formatPrice from '@/src/utills/formatPrice';
import Image from 'next/image';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import Link from 'next/link';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { SafeUser } from '@/src/type';
interface CartProps {
    currUser: SafeUser | null;
}

const MyCart: React.FC<CartProps> = ({ currUser }) => {
    const { cartItem, cartQty, handleQtyChange, addToWishlist, removeItemsFromCart, clearCart } = useCart();

    const router = useRouter();
    const [shippingCost, setShippingCost] = useState(40);

    const handleShippingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setShippingCost(Number(event.target.value));
    };
    const handleMoveToWishlist = (product: cartProductType) => {
        addToWishlist(product);
        toast.success(truncate(product.name) + 'moved to wishlist')
        removeItemsFromCart(product);
    }
    return (

        <Container>
            <div className="mx-auto  mt-10">

                {!cartItem.length ? <div className='flex flex-col gap-5 justify-center items-center w-full pb-10'>
                    <Image className='object-contain object-center w-full h-full' alt='emptyCart' height={800} width={1000} src={'https://th.bing.com/th?id=OIP.YwAZew3YsrZlqgJzEv3ZjAHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2'} ></Image>
                    <h1 className='text-xl sm:2xl md:4xl text-center text-slate-800 font-bold'>Your Cart is Empty</h1>
                    <button className='px-4 py-1 rounded-sm text-blue-50 text-base w-1/2 bg-slate-500 hover:bg-slate-700 active:bg-slate-900 shadow-sm hover:shadow-slate-200' type='button' onClick={() => router.push('/')}>Shop Now</button></div>
                    : <div className="sm:flex max-sm:w-[90vw] overflow-x-hidden shadow-md px-2 my-10">
                        <div className=" w-full text-slate-900 sm:w-3/4 bg-white sm:px-10 py-10">
                            <div className="flex justify-between border-b pb-8">
                                <h1 className="font-semibold  text-2xl">Shopping Cart</h1>
                                <h2 className="font-semibold  text-2xl">{cartQty} Items</h2>
                            </div>
                            {cartItem.map((items) => (<div key={items.id} className="flex items-stretch py-1 sm:py-4 md:py-10 lg:py-8 border-t border-gray-50">
                                <div className="w-3/12 2xl:w-1/4 ">
                                    <Image src={items.selectImg.image} height={200} width={200} alt="Black Leather Purse" className="h-full w-full object-center object-contain block" />
                                    {/* <img src={items.selectImg.image} alt="Black Leather Purse" className="md:hidden  h-full object-center object-contain" /> */}
                                </div>
                                <div className="md:pl-3 pl-1 sm:pl-2  w-7/12 2xl:w-3/4 flex flex-col justify-center">
                                    <h5 className="text-s font-semibold leading-3 text-gray-800 md:pt-0 pt-4">{items.brand}</h5>
                                    <div className="flex  items-center justify-between w-full">
                                        <h6 className="text-base w-1/2 font-black leading-none text-wrap text-gray-800">{truncate(items.name)}</h6>
                                        <SetQty cartItem={items} handleQtyChange={handleQtyChange} />
                                    </div>
                                    {/* <p className="text-xs leading-3 text-gray-600 pt-2">Height: 10 inches</p> */}
                                    <p className="text-xs leading-3 text-gray-600 py-4">{items.selectImg.color}</p>
                                    <p className="w-96 text-xs leading-3 text-gray-600">{items.description.substring(0, 25)}...</p>
                                    <div className="flex items-center justify-between pt-5">
                                        <div className="flex items-center">
                                            <button onClick={() => handleMoveToWishlist(items)} type='button' className="text-xs active:text-rose-500 leading-3 hover:underline text-gray-800 cursor-pointer">Move to WishList</button>
                                            <button onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => { toast.success(items.brand + ' removed from the cart'); removeItemsFromCart(items) }} type='button' className="text-lg leading-3 underline text-red-500 pl-5 cursor-pointer"><RiDeleteBin2Fill /> </button>
                                        </div>
                                        <p className="text-base font-black leading-none text-gray-800">{formatPrice(items.price)}</p>
                                    </div>
                                </div>
                            </div>))}

                            <div className='flex justify-between items-baseline'>

                                <Link href="/" className="flex items-center font-semibold hover:text-green-400 active:text-green-600 text-indigo-600 text-sm mt-10">
                                    <FaArrowLeftLong className="fill-current mr-2 hover:text-green-400 active:text-green-600 text-indigo-600 text-xl" />
                                    Continue Shopping
                                </Link>
                                <button onClick={() => clearCart()} className='flex font-semibold text-indigo-600 text-sm mt-10 hover:text-rose-500 active:text-rose-700'>ClearCart</button>
                            </div>

                        </div>
                        <div id="summary" className=" w-[90%]   sm:w-1/4   md:w-1/2 sm:px-8 py-10">
                            <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                            <div className="flex justify-between mt-10 mb-5">
                                <span className="font-semibold text-sm uppercase">{cartQty} Items</span>
                                <span className="font-semibold text-sm">{priceCalc(cartItem, 0)}</span>
                            </div>
                            <div>
                                <label className="font-medium inline-block mb-3 text-sm uppercase">
                                    Shipping
                                </label>
                                <select onChange={handleShippingChange} className="block p-2 text-gray-600 w-full text-sm">
                                    <option value={40}>Standard shipping - ₹40.00</option>
                                    <option value={100}>One Day shipping - ₹100.00</option>
                                    <option value={200}>Same Day shipping -₹200.00</option>
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
                                    <span>{priceCalc(cartItem, shippingCost)}</span>
                                </div>
                                <button onClick={() => currUser ? router.push('/checkout') : router.push('/login')} className="font-semibold bg-slate-500 py-3 rounded-sm shadow-sm shadow-slate-300 hover:bg-slate-700 text-sm text-white uppercase w-full">
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>}
            </div>
        </Container>

    )

}

export default MyCart
interface SetQtyProps {
    cartItem: cartProductType;

    handleQtyChange: (num: number, product: cartProductType) => void;
}

const SetQty: React.FC<SetQtyProps> = ({ cartItem, handleQtyChange }) => {
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newQuantity = parseInt(e.target.value, 10);
        const quantityChange = newQuantity - cartItem.quantity;
        handleQtyChange(quantityChange, cartItem);
    };
    return (
        <div >

            <select className='border border-gray-300 shadow-sm shadow-gray-200' aria-label='Quantity' name="Qty" id="Qty" value={cartItem.quantity} onChange={handleSelectChange}>
                {[...Array(6)].map((_, i) => (
                    <option key={i + 1} value={i + 1 <= 5 ? i + 1 : (i - 3) * 5}>
                        {i + 1 <= 5 ? i + 1 : (i - 3) * 5}
                    </option>
                ))}
            </select>
        </div>

    )
}