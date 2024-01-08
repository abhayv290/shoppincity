import React from 'react'
import Image from 'next/image'
import shoppin from '../../public/sh.png'
import Link from 'next/link'


export default function Footer() {
    return (
        <footer className="text-gray-600  bg-indigo-50 body-font bottom-0 ">
            <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
                <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left md:mt-0 mt-10">
                    <Link href={'/index'} className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">

                        <span className="ml-3 text-xl mix-blend-darken">
                            <Image src={shoppin} width={150} height={150} alt='brandname'  ></Image>
                        </span>
                    </Link>
                    <p className="mt-2 text-sm text-gray-500">Where Every Click Unlocks a World of Fashion and More!</p>
                </div>
                <div className="flex-grow flex flex-wrap md:pr-20 -mb-10 md:text-left text-center order-first">
                    <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Shop</h2>
                        <nav className="list-none mb-10">
                            <li>
                                <Link href={'/Tshirts'} className="text-gray-600 hover:text-gray-800">Tshirts</Link>
                            </li>
                            <li>
                                <Link href={'/Hoodies'} className="text-gray-600 hover:text-gray-800">Hoodies</Link>
                            </li>
                            <li>
                                <Link href={'/Mugs'} className="text-gray-600 hover:text-gray-800">Mugs</Link>
                            </li>
                            <li>
                                <Link href={'/Bags'} className="text-gray-600 hover:text-gray-800">Bags</Link>
                            </li>
                        </nav>
                    </div>
                    <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">About</h2>
                        <nav className="list-none mb-10">
                            <li>
                                <Link href={'/Contact'} className="text-gray-600 hover:text-gray-800">Contact us</Link>
                            </li>
                            <li>
                                <Link href={'/About'} className="text-gray-600 hover:text-gray-800">About us </Link>
                            </li>
                            <li>
                                <Link href={'/'} className="text-gray-600 hover:text-gray-800">ShoppinCity Stories</Link>
                            </li>
                            <li>
                                <Link href={'/'} className="text-gray-600 hover:text-gray-800">WebSite Information</Link>
                            </li>
                        </nav>
                    </div>
                    <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Help</h2>
                        <nav className="list-none mb-10">
                            <li>
                                <Link href={'/'} className="text-gray-600 hover:text-gray-800">Payments</Link>
                            </li>
                            <li>
                                <Link href={'/'} className="text-gray-600 hover:text-gray-800">Delivery</Link>
                            </li>
                            <li>
                                <Link href={'/'} className="text-gray-600 hover:text-gray-800">Cancelation & Returns</Link>
                            </li>
                            <li>
                                <Link href={'/'} className="text-gray-600 hover:text-gray-800">FAQs</Link>
                            </li>
                        </nav>
                    </div>
                    <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Privicy-Policy</h2>
                        <nav className="list-none mb-10">
                            <li>
                                <Link href={'/'} className="text-gray-600 hover:text-gray-800">Dry fruits</Link>
                            </li>
                            <li>
                                <Link href={'/'} className="text-gray-600 hover:text-gray-800">Refunds</Link>
                            </li>
                            <li>
                                <Link href={'/'} className="text-gray-600 hover:text-gray-800">Cancelation & Returns</Link>
                            </li>
                            <li>
                                <Link href={'/'} className="text-gray-600 hover:text-gray-800">Terms & Conditions</Link>
                            </li>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="bg-gray-100">
                <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
                    <p className="text-gray-500 text-sm text-center sm:text-left">© 2024 Abhay Vishwakarma
                        <Link href="https://github.com/abhayv290" rel="noopener noreferrer" className="text-slate-700 hover:text-red-600 ml-1" target="_blank"><strong>@abhayv290</strong> </Link>
                    </p>
                    <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
                        <Link href={'/'} className="text-gray-500">
                            <i className='fa-brands fa-facebook fa-fw text-blue-900'></i>
                        </Link>
                        <Link href={'/'} className="ml-3 text-gray-500">
                            <i className='fa-brands fa-twitter fa-blue text-blue-400'></i>
                        </Link>
                        <Link href={'/'} className="ml-3 text-gray-500">
                            <i className="fa-brands  fa-instagram text-pink-800"></i>
                        </Link>

                        <Link href={'/'} className="ml-3 text-gray-500">
                            <i className="fa-brands fa-youtube text-red-700 " ></i>
                        </Link>

                    </span>
                </div>
            </div>
        </footer>
    )
}
