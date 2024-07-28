"use client"; //to ensure the components is rendered as client component
import React, { useState } from 'react';
import { Oswald, Roboto } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { IoBagHandleSharp, IoHeart, IoSearch, IoCartSharp } from "react-icons/io5";
import { RiAccountCircleFill } from "react-icons/ri";
import { FaShoppingCart } from 'react-icons/fa';

const oswald = Oswald({ subsets: ['latin'], weight: '500' });
const roboto = Roboto({ subsets: ['latin'], weight: '400' });

const Navbar: React.FC = () => {
    const [searchClick, setSearchClick] = useState<boolean>(false);

    return (
        <div className={`${oswald.className} sticky z-10 top-0 flex items-center px-4 sm:px-10 justify-between bg-slate-900 min-h-16 text-blue-50 text-2xl`}>
            <div>
                <Link href={'/'}>
                    ShoppinCity
                </Link>
                {/* Uncomment and ensure the src path is correct */}
                {/* <Image src={'/brandLogo.png'} height={100} width={100} alt='brandLogo' /> */}
            </div>
            <div className='flex gap-6 sm:gap-12 items-center'>
                <div
                    onMouseEnter={() => setSearchClick(true)}
                    onMouseLeave={() => setSearchClick(false)}
                    className='flex items-center sm:relative'
                >
                    <input
                        className={`${roboto.className} ${searchClick ? 'max-sm:absolute  max-sm:text-lg  max-sm:left-0 max-sm:h-12 max-sm:w-full sm:w-52 md:w-96 sm:visible' : 'max-sm:hidden sm:invisible w-0'} h-8 p-2 px-2 pl-10 text-gray-500 transition-all duration-300 outline-1 outline-gray-300 rounded-sm text-base`}
                        placeholder='Search for Products, brands and more'
                        type="text"
                        aria-label="Search"
                    />
                    <button onClick={() => setSearchClick(!searchClick)}
                        className={`sm:absolute sm:left-0 sm:align-middle sm:pr-2 ${searchClick ? 'sm:border-r sm:border-r-gray-400' : ''}`}
                        type='button'
                        aria-label="Toggle Search"
                    >
                        <IoSearch className={searchClick ? 'text-gray-700' : 'text-blue-50'} />
                    </button>
                </div>
                <Link href={'/profile'} className='hover:scale-105 hover:text-blue-100 active:text-blue-300' >
                    <RiAccountCircleFill aria-label="Profile" />
                </Link>
                <Link href={'/wishlist'} className='hover:scale-105 hover:text-blue-100 active:text-blue-300' >
                    <IoHeart aria-label="Wishlist" />
                </Link>
                <Link href={'/cart'} className='hover:scale-105 hover:text-blue-100 active:text-blue-300' >
                    <FaShoppingCart aria-label="Cart" />
                </Link>
            </div>
        </div>
    );
}

export default Navbar;
