/* eslint-disable @next/next/no-img-element */
import React, {useEffect, useState} from 'react';
// import Draggable from "react-draggable";
import Link from 'next/link';


const Cart = ({cart, subTotal, handleQuantityChange, clearCart}) => {



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
        // <Draggable>


        <div className="max-w-md mx-auto bg-white rounded-md shadow-md overflow-hidden">
            <div className="bg-indigo-500 text-white p-4">
                <h2 className="text-xl font-semibold">Shopping Cart</h2>
            </div>
            <div className="p-4">
                {

                    myitem.map((k, index) => (
                        <div key={index} className="flex items-center justify-between border-b pb-2">
                            <div className="flex items-center space-x-8">
                                <img src={cart[k].image.src} alt={cart[k].name} className=" h-20 rounded-md" />
                                <div className=' mx-4 flex flex-col'>
                                    <h3 className="text-lg font-semibold">{cart[k].name}</h3>
                                    <p className="text-gray-500">Price:₹{cart[k].price}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 ml-8">
                                <button onClick={() => {handleQuantityChange(myitem[index], -1)}} className="text-red-500 text-4xl focus:outline-none">
                                    -
                                </button>
                                <span className="font-semibold text-2xl">{cart[k].qty}</span>
                                <button onClick={() => {handleQuantityChange(myitem[index], 1)}} className="text-green-500 text-4xl focus:outline-none">
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
                    <button onClick={() => {clearCart()}} className='w-full mt-4 bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 focus:outline-none'>ClearCart</button>
                </div>
                <Link href={'/CheckOut'}> <button className="w-full mt-4 bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 focus:outline-none">
                    Checkouts
                </button></Link>
            </div>
        </div>
        // </Draggable>
    );
};

export default Cart;
