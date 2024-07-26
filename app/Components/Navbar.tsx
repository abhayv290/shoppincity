"use client"; // This ensures the component is treated as a Client Component
import React from 'react';
import { Oswald, Roboto } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { IoBagHandleSharp, IoHeart, IoSearch } from "react-icons/io5";
import { RiAccountCircleFill } from "react-icons/ri";
import { useState } from 'react';
const oswald = Oswald({ subsets: ['latin'], weight: '500' });
const roboto = Roboto({ subsets: ['latin'], weight: '400' });

const Navbar: React.FC = () => {
    const [searchClick, setsearchClick] = useState(false);

    return (
        <div className={`${oswald.className} flex items-center px-4 sm:px-10 justify-between bg-slate-900 min-h-16 text-blue-50 text-2xl`}>
            <div>
                <Link href={'/'}>
                    ShoppinCity
                </Link>
                {/* Uncomment and ensure the src path is correct */}
                {/* <Image src={'/brandLogo.png'} height={100} width={100} alt='brandLogo' /> */}
            </div>
            <div className='flex gap-6 sm:gap-12 items-center'>
                <div className='flex items-center relative'>
                    <span>
                        <input
                            className={`${roboto.className} ${searchClick ? 'max-sm:absolute max-sm:top-10 max-sm:-right-32 max-sm:w-64' : 'max-sm:hidden'} sm:w-52 md:w-96 h-8 p-2 px-2 pl-10 text-gray-700 outline-1 outline-gray-200 rounded-sm  text-base`}
                            placeholder='Search for Products, brands and more'
                            type="text"
                        />
                    </span>
                    <button className='sm:absolute sm:left-0 sm:align-middle sm:pr-2 sm:border-r sm:border-r-gray-400' onClick={() => searchClick ? setsearchClick(false) : setsearchClick(true)} type='button'>
                        <IoSearch className=' sm:text-gray-700' />
                    </button>
                </div>
                <Link href={'/profile'}>
                    <RiAccountCircleFill />
                </Link>
                <Link href={'/wishlist'}>
                    <IoHeart />
                </Link>
                <Link href={'/bag'}>
                    <IoBagHandleSharp />
                </Link>
            </div>
        </div>
    );
}

export default Navbar;
