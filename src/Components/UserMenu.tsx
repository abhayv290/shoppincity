'use client'
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { PiUserListBold } from 'react-icons/pi';
import { safeUser } from '../type';
import Image from 'next/image';
import { MdAccountCircle } from 'react-icons/md';


interface propType {
    isLogged: safeUser | null;
}
const UserMenu: React.FC<propType> = ({ isLogged }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
        setIsSubmenuOpen(false);
    };

    const toggleSubmenu = () => {
        setIsSubmenuOpen(!isSubmenuOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (isOpen && !event.target.closest('.relative')) {
                setIsOpen(false);
                setIsSubmenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <>
            <div className='relative z-30'>
                <button
                    onClick={toggleOpen}
                    type='button'
                    className='hover:scale-105 hover:text-blue-100 text-3xl active:text-rose-500'
                    aria-expanded={isOpen}
                >
                    <PiUserListBold aria-label="Profile" />
                </button>
                {isOpen && (
                    <div className='absolute min-h-60 rounded-sm shadow-md shadow-slate-500 bg-slate-200 w-52 text-slate-800 overflow-hidden right-0 top-12 flex flex-col cursor-pointer text-lg items-center justify-start'>
                        {!isLogged ? (<div className='font-normal flex items-center justify-evenly w-full border-b'>
                            <Link className='border-r p-2 text-center w-full hover:bg-blue-500' href='/login'>Login</Link>
                            <Link className='hover:bg-rose-400 p-2 w-full text-center' href='/register'>Sign up</Link>
                        </div>) :
                            (<div className='font-normal flex items-center justify-evenly w-full border-b'>
                                <Link className='border-r p-2 text-center w-full hover:bg-blue-500' href='/login'>{isLogged?.image ? <Image className='object-contain  w-12  rounded-full border shadow-sm shadow-slate-500' height={50} width={50} src={isLogged?.image} alt='avatar'></Image> : <span className='flex items-center justify-center  text-3xl rounded-full border border-gray-500 shadow-sm shadow-gray-400 '> <MdAccountCircle /> </span>}

                                </Link>
                                <button type='button' onClick={() => { setIsOpen(false); signOut() }} className='font-normal h-full hover:bg-blue-400 active:bg-rose-400 px-4 w-full  p-2 border-b border-slate-300' >Logout</button>
                            </div>)
                        }
                        <Link className='font-normal hover:bg-blue-400 active:bg-rose-400 px-4 w-full py-2 border-b border-slate-300' href='/order'>My Orders</Link>
                        <Link className='font-normal hover:bg-blue-400 active:bg-rose-400 px-4 w-full py-2 border-b border-slate-300' href='/contact'>Contact Us</Link>
                        <Link className='font-normal  hover:bg-blue-400 active:bg-rose-400 px-4 w-full py-2 border-b border-slate-300' href='/about'>About Us</Link>
                        <hr />
                        <Link className='font-normal hover:bg-blue-400 active:bg-rose-400 px-4 w-full py-2 border-b border-slate-300' href='/admin'>Admin Dashboard</Link>



                        <button
                            type='button'
                            className='font-normal text-start hover:bg-blue-400 active:bg-rose-400 px-4 w-full py-2 border-b'
                            onClick={toggleSubmenu}
                        >
                            Products
                        </button>


                    </div>

                )}
                {isSubmenuOpen && (
                    <div className="absolute top-72 right-40 text-base bg-white shadow-sm min-w-40 z-50 text-gray-700 flex flex-col rounded-sm">
                        <Link href="/products/category1" className=" hover:bg-blue-400 active:bg-rose-400 px-4  py-2 border-b">Category1</Link>
                        <Link href="/products/category2" className=" hover:bg-blue-400 active:bg-rose-400 px-4  py-2 border-b">Category 2</Link>
                    </div>
                )}
            </div>
            {isOpen && <div className='w-screen opacity-50 h-screen z-20 bg-black  fixed top-0 left-0'>

            </div>}

        </>
    );
};

export default UserMenu;
