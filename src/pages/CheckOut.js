import React, {useEffect, useState} from 'react';
import Link from 'next/link';
export default function CheckOut({cart, subTotal, removeFromCart, clearCart}) {

    let myitem = Object.keys(cart);
    const totalprice = () => {
        let total = 0;
        for (let i = 0; i < myitem.length; i++) {
            const itemKey = myitem[i];
            const item = cart[itemKey];
            total += item.qty * item.price;
        }
        return total;
    }

    return (

        <div className='flex flex-wrap mt-8'>
            <div>
                <h2 className='max-sm:text-center   w-40% text-gray-900 font-semibold mt-8'><span className='md:relative md:left-40 rounded-md px-8  p-2 bg-indigo-600'>Delivery Details</span></h2>
                <div className="container flex flex-wrap">
                    <div class="mt-10 mx-20 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div class="sm:col-span-3">
                            <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">First name</label>
                            <div class="mt-2">
                                <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div class="sm:col-span-3">
                            <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Last name</label>
                            <div class="mt-2">
                                <input type="text" name="last-name" id="last-name" autocomplete="family-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div class="sm:col-span-4">
                            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div class="mt-2">
                                <input id="email" name="email" type="email" autocomplete="email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div class="col-span-full">
                            <label for="street-address" class="block text-sm font-medium leading-6 text-gray-900">Street address</label>
                            <div class="mt-2">
                                <input type="text" name="street-address" id="street-address" autocomplete="street-address" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div class="sm:col-span-2 sm:col-start-1">
                            <label for="city" class="block text-sm font-medium leading-6 text-gray-900">City</label>
                            <div class="mt-2">
                                <input type="text" name="city" id="city" autocomplete="address-level2" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div class="sm:col-span-2">
                            <label for="region" class="block text-sm font-medium leading-6 text-gray-900">State / Province</label>
                            <div class="mt-2">
                                <input type="text" name="region" id="region" autocomplete="address-level1" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div class="sm:col-span-2">
                            <label for="postal-code" class="block text-sm font-medium leading-6 text-gray-900">ZIP / Postal code</label>
                            <div class="mt-2">
                                <input type="text" name="postal-code" id="postal-code" autocomplete="postal-code" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-50% mx-auto mt-8 bg-white rounded-md shadow-md overflow-hidden">
                <div className="text-center  md:w-96  p-4">
                    <h2 className="text-xl font-semibold">Review Your Cart</h2>
                </div>
                <div className="p-4">
                    {

                        myitem.map((k) => (
                            <div key={cart[k]} className="flex items-center justify-between border-b pb-2">
                                <div className="flex items-center space-x-8">
                                    <img src={cart[k].image.src} alt={cart[k].name} className=" h-20 rounded-md" />
                                    <div className=' mx-4 flex flex-col'>
                                        <h3 className="text-lg font-semibold">{cart[k].name}</h3>
                                        <p className="text-gray-500">Price:₹{cart[k].price}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 ml-8">
                                    <button className="text-red-500 text-4xl focus:outline-none">
                                        -
                                    </button>
                                    <span className="font-semibold text-2xl">{cart[k].qty}</span>
                                    <button className="text-green-500 text-4xl focus:outline-none">
                                        +
                                    </button>
                                </div>
                                {/* <button onClick={() => removeFromCart(cart[k])} className="text-red-500 focus:outline-none">Remove</button> */}
                            </div>
                        ))}
                </div>
                {Object.keys(cart).length === 0 && <div className='flex flex-col items-center'>
                    <h3 ><strong>Your Cart is Empty</strong></h3>
                    <img className='w-80' src="https://cdni.iconscout.com/illustration/premium/thumb/your-cart-is-empty-2161427-1815069.png" alt="your cart is empty" />
                    <button className='w-full mt-4 bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 focus:outline-none'>shop now</button>
                </div>}
                <div className="p-4 bg-gray-100 border-t">
                    <div className="flex justify-between">
                        <span className="font-semibold">
                            Total: ₹ {totalprice()} only
                        </span>
                        <button className='w-full mt-4 bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 focus:outline-none'>Order Now</button>
                    </div>

                </div>
            </div>


        </div>

    )
}