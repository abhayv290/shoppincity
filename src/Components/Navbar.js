import Image from 'next/image'
import React from 'react'
import shoppincity from '/src/Assests/BrandLogo.png'
import shoppin from '../../public/sh.png'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
// import { useEffect, useState } from 'react'
export default function Navbar() {
    function toggleDropdown() {
        let dropdown = document.getElementById("dropdown");
        dropdown.classList.toggle("hidden");
    }
    const pathname = usePathname();
    // console.log(pathname);




    return (
        <header className="text-gray-500 body-font shadow-lg shadow-slate-200 sticky top-0 z-10 bg-white">
            <div className="container mx-auto flex flex-wrap p-5 md:flex-row md:items-center">
                <Link href={'/'} className={`${pathname === '/' ? 'text-red-600 font-extra-bold' : ""} flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0`}>
                    <Image className='rounded-md' src={shoppincity} width={50} height={50} alt='brand_logo' />
                    <span className="ml-3 text-xl">  <Image src={shoppin} width={150} height={150} alt='brandname'></Image></span>
                </Link>

                <nav className="md:ml-auto max-sm:hidden  md:mr-auto flex flex-wrap items-center text-base justify-center font-bold">
                    <Link href={'/Tshirts'} className={`${pathname === '/Tshirts' ? 'text-red-600 font-extra-bold' : ""} mr-5 hover:text-gray-900`}>Tshirts</Link>
                    <Link href={'/Hoodies'} className={`${pathname === '/Hoodies' ? 'text-red-600 font-extra-bold' : ""} mr-5 hover:text-gray-900`}>Hoodies</Link>
                    <Link href={'/'} className={`${pathname === '/Mugs' ? 'text-red-600 font-extra-bold' : ""}  mr-5 hover:text-gray-900   `}>Mugs</Link>
                    <Link href={'/Bags'} className="mr-5 hover:text-gray-900">Bags</Link>
                    <div className="relative  inline-block text-left">
                        <button onClick={toggleDropdown} className="inline-flex items-center justify-center p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700">
                            <span>Menu</span>

                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        <div id='dropdown' className=" absolute right-0 mt-2 space-y-2 bg-white hidden border border-gray-200 rounded-md shadow-lg">

                            <Link href={'/'} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-300">Item 1</Link>
                            <Link href={'/'} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-300">Item 2</Link>
                            <Link href={'/'} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-300">Item 3</Link>
                        </div>
                    </div>

                </nav>
                <div className=" relative left-16 md:-left-2 rounded-md ">
                    <span><i className="text-red-700 fa-regular px-2 text-4xl fa-heart"></i></span>
                    <span><i className="fa-solid fa-cart-arrow-down px-2 text-4xl"></i></span>
                </div>
            </div>


        </header>
    )
}
