/* eslint-disable @next/next/no-img-element */
import React, {useState} from 'react'
import {useRouter} from 'next/router'
import Image from 'next/image';

import tshirt1 from '../../Assests/tshirt1_.jpg'


const Post = ({addToCart, Products, variants}) => {

    //To get slug via userouter
    const router = useRouter();
    const {slug} = router.query;
    // console.log(slug);

    const [pin, setPin] = useState()
    const [service, setService] = useState(null);

    const onChange = (e) => {
        setPin(e.target.value);
    }
    //Function for Check the Product availibility at your area_pincode
    const checkAvailibility = async () => {
        let mypin = await fetch('http://localhost:3000/api/pincode');
        let pinJson = await mypin.json();
        // console.log(pinJson);
        (pin && pinJson && pinJson.includes(parseInt(pin))) ? setService(true) : setService(false);
        // console.log(service)
    }

    //Managing Color and Sizes
    const [color, setColor] = useState(Products.color);
    const [size, setsize] = useState(Products.size);

    const refreshvariant = (newsize, newcolor) => {
        let url = `http://localhost:3000/Product/${variants[newcolor][newsize]['slug']}`
        window.location = url;
    }

    return (
        <div>
            <section className="text-gray-600 body-font overflow-hidden">

                <div className="container px-5 py-12 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto px-12 md:px-24 rounded" src={Products.img} />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">{Products.category}</h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{Products.title}</h1>
                            <div className="flex mb-4">
                                <span className="flex items-center">
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <span className="text-gray-600 ml-3">4 Reviews</span>
                                </span>
                                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                                    <a className="text-gray-500">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                        </svg>
                                    </a>
                                    <a className="text-gray-500">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                        </svg>
                                    </a>
                                    <a className="text-gray-500">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                        </svg>
                                    </a>
                                </span>
                            </div>
                            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                                <div className="flex">
                                    <span className="mr-3">Color</span>
                                    {Object.keys(variants).includes('white') && Object.keys(variants['white']).includes(size) && <button onClick={() => {refreshvariant(size, 'white')}} className={`border-2 ${color === 'white' ? 'border-black' : 'border-gray-300'} rounded-full w-6 h-6 focus:outline-none`}></button>}

                                    {Object.keys(variants).includes('red') && Object.keys(variants['red']).includes(size) && <button onClick={() => {refreshvariant(size, 'red')}} className={`border-2 ${color === 'red' ? 'border-black' : 'border-gray-300'} ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none`}></button>}

                                    {Object.keys(variants).includes('black') && Object.keys(variants['black']).includes(size) && <button onClick={() => {refreshvariant(size, 'black')}} className={`border-2 ${color === 'black' ? 'border-black' : 'border-gray-300'} ml-1 bg-black rounded-full w-6 h-6 focus:outline-none`}></button>}

                                    {Object.keys(variants).includes('olive') && Object.keys(variants['olive']).includes(size) && <button onClick={() => {refreshvariant(size, 'olive')}} className={`border-2 ${color === 'olive' ? 'border-black' : 'border-gray-300'} ml-1 bg-lime-900 rounded-full w-6 h-6 focus:outline-none`}></button>}

                                    {Object.keys(variants).includes('gray') && Object.keys(variants['gray']).includes(size) && <button onClick={() => {refreshvariant(size, 'gray')}} className={`border-2 ${color === 'gray' ? 'border-black' : 'border-gray-300'} ml-1 bg-gray-500 rounded-full w-6 h-6 focus:outline-none`}></button>}

                                    {Object.keys(variants).includes('blue') && Object.keys(variants['blue']).includes(size) && <button onClick={() => {refreshvariant(size, 'blue')}} className={`border-2 ${color === 'blue' ? 'border-black' : 'border-gray-300'} ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none`}></button>}
                                    {Object.keys(variants).includes('green') && Object.keys(variants['green']).includes(size) && <button onClick={() => {refreshvariant(size, 'green')}} className={`border-2 ${color === 'green' ? 'border-black' : 'border-gray-300'} ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none`}></button>}
                                </div>
                                <div className="flex ml-6 items-center">
                                    <span className="mr-3">Size</span>
                                    <div className="relative">
                                        <select value={size} onChange={(e) => {refreshvariant(e.target.value, color)}} className="rounded border appearance-none  py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                                            {Object.keys(variants[color]).includes('S') && <option >S</option>}
                                            {Object.keys(variants[color]).includes('M') && <option  >M</option>}
                                            {Object.keys(variants[color]).includes('L') && <option >L</option>}
                                            {Object.keys(variants[color]).includes('XL') && <option >XL </option>}
                                        </select>
                                        <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                                                <path d="M6 9l6 6 6-6"></path>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex mb-4">
                                <a className="flex-grow text-indigo-500 border-b-2 border-indigo-500 py-2 text-lg px-1">Description</a>
                                <a className="flex-grow border-b-2  py-2 text-lg px-1">Reviews</a>
                                <a className="flex-grow border-b-2  py-2 text-lg px-1">Details</a>
                            </div>
                            <p className="leading-relaxed">{Products.desc}</p>
                            <hr />
                            <div className="flex py-12">
                                <span className="title-font font-medium text-2xl text-gray-900">₹{Products.price} only</span>
                                <button onClick={() => {addToCart(slug, 1, 400, 'tshirt', 'M', 'Red', tshirt1)}} className="flex active:bg-green-800 ml-auto text-white bg-indigo-500 border-0 py-2 px-6 
                                focus:outline-none hover:bg-indigo-600 rounded">Add to Cart</button>
                                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5 text-red-600" viewBox="0 0 24 24">
                                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                    </svg>
                                </button>
                            </div>

                            <div className="flex ">
                                <input onChange={onChange} id='pin' type="text" placeholder='Enter your pincode here' className='bg-grey-200 max-sm:text-lg md:p-1 max-sm:w-48 max-sm:px-3 border-indigo-300 border-2 rounded-md ' />
                                <button onClick={checkAvailibility} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Check for Availibilty</button>
                            </div>
                            {(!service && service != null) && <div className='text-red-500 text-sm mt-2'>
                                Sorry! We cannot deliver on this pincode </div>}

                            {(service && service != null) && <div className='text-green-500 text-sm mt-2'>
                                Yay! This Product is available at your pincode </div>
                            }
                        </div>

                    </div>
                </div>

            </section>

        </div>
    )
}


// Another method to fetch the data from the api 

import Product from "@/models/Product";

const mongoose = require('mongoose');
export async function getServerSideProps(context) {

    if (!(mongoose.connections[0].readyState)) {
    }
    await mongoose.connect(process.env.MONGO_URI);


    let Products = await Product.findOne({slug: context.query.slug})

    let variants = await Product.find({title: Products.title})

    let ColorSizeSlug = {};  //{red:{xl:{slug:roadster_tees1}}}
    for (let item of variants) {
        if (Object.keys(ColorSizeSlug).includes(item.color)) {
            ColorSizeSlug[item.color][item.size] = {slug: item.slug};
        }
        else {
            ColorSizeSlug[item.color] = {}
            ColorSizeSlug[item.color][item.size] = {slug: item.slug};
        }

    }


    // Pass data to the page via props
    return {props: {Products: JSON.parse(JSON.stringify(Products)), variants: JSON.parse(JSON.stringify(ColorSizeSlug))}}
}

export default Post 