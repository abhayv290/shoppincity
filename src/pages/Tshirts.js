/* eslint-disable @next/next/no-img-element */
import React, {useEffect} from 'react'
import Link from 'next/link'
export default function Tshirts({Products}) {
    console.log(Products);


    return (
        <div>
            <section className="text-gray-600 body-font">
                <div className="container 5 py-12 mx-auto">
                    <div className="flex flex-wrap md:m-4">
                        {Object.keys(Products).map((item, index) => (
                            <div key={index} className="lg:w-1/4 shadow  shadow-gray-200 md:w-1/3 max-sm:m-4 mx-auto p-4 w-2/5">
                                <Link href={`/Product/${Products[item].slug}`} className="block max-sm:h-56 relative rounded overflow-hidden">
                                    <img alt="ecommerce" className="  block" src={Products[item].img} /></Link>
                                <div className="mt-4">
                                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Tshirts</h3>
                                    <h2 className="text-gray-900 title-font text-lg font-medium">{Products[item].title}</h2>
                                    <p className="mt-1">₹{Products[item].price}</p>

                                    <div className='mt-1'>
                                        {Products[item].size.includes('S') && <span className='bg-gray-100 mx-1 px-2 border '>S</span>}
                                        {Products[item].size.includes('M') && <span className='bg-gray-100 mx-1 px-2 border ' >M</span>}
                                        {Products[item].size.includes('L') && <span className='bg-gray-100 mx-1 px-2 border '>L</span>}
                                        {Products[item].size.includes('XL') && <span className='bg-gray-100 mx-1 px-2 border '>XL </span>}
                                    </div>

                                    <div className='mt-2'>
                                        {Products[item].color.includes('red') && <button className="border-2 border-gray-300 bg-red-600 rounded-full w-6 h-6 focus:outline-none"></button>}
                                        {Products[item].color.includes('black') && <button className="border-2 border-gray-300 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                                        {Products[item].color.includes('green') && <button className="border-2 border-gray-300 bg-green-600 rounded-full w-6 h-6 focus:outline-none"></button>}
                                        {Products[item].color.includes('gray') && <button className="border-2 border-gray-300 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                                        {Products[item].color.includes('blue') && <button className="border-2 border-gray-300 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                                        {Products[item].color.includes('yellow') && <button className="border-2 border-gray-300 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                                        {Products[item].color.includes('white') && <button className="border-2 border-gray-300 bg-gray-50 rounded-full w-6 h-6 focus:outline-none"></button>}
                                        {Products[item].color.includes('olive') && <button className="border-2 border-gray-300 bg-lime-950 rounded-full w-6 h-6 focus:outline-none"></button>}

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>





    )
}


//Using Fetch API to Fetch data from external API

// export async function getServerSideProps() {
//     const res = await fetch('http://localhost:3000/api/getProducts')
//     const repo = await res.json()
//     // Pass data to the page via props
//     return {props: {repo}}
// }




// Another method to fetch the data from the api 

import Product from "@/models/Product";

const mongoose = require('mongoose');
export async function getServerSideProps(context) {

    if (mongoose.connections[0].readyState) {

    }
    await mongoose.connect(process.env.MONGO_URI);

    let Products = await Product.find({category: 'Tshirt'})
    let tshirts = {};
    for (let item of Products) {
        if (item.title in tshirts) {
            if (!(tshirts[item.title].color.includes(item.color)) && item.available_qty > 0) {
                tshirts[item.title].color.push(item.color);
                tshirts[item.title].available_qty += item.available_qty;
            }
            if (!(tshirts[item.title].size.includes(item.size)) && item.available_qty > 0) {
                tshirts[item.title].size.push(item.size);
                tshirts[item.title].available_qty += item.available_qty;
            }

        }
        else {
            tshirts[item.title] = JSON.parse(JSON.stringify(item))

            if (item.available_qty > 0) {
                tshirts[item.title].color = [item.color]
                tshirts[item.title].size = [item.size]
            }

        }
    }


    // Pass data to the page via props
    return {props: {Products: JSON.parse(JSON.stringify(tshirts))}}
}









