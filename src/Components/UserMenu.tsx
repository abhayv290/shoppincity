'use client'
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { PiUserListBold } from 'react-icons/pi';
import { safeUser } from '../type';

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
                    <div className='absolute rounded-md shadow-md shadow-slate-300 bg-blue-50 w-52 text-slate-800 overflow-hidden right-0 top-12 flex flex-col cursor-pointer text-lg items-center justify-start'>
                        {!isLogged ? (<div className='font-normal flex items-center justify-evenly w-full border-b'>
                            <Link className='border-r p-2 text-center w-full hover:bg-blue-500' href='/login'>Login</Link>
                            <Link className='hover:bg-rose-400 p-2 w-full text-center' href='/register'>Sign up</Link>
                        </div>) :
                            (<button type='button' onClick={() => { setIsOpen(false); signOut() }} className='font-normal hover:bg-blue-400 active:bg-rose-400 px-4 w-full py-2 border-b' >LogOut</button>)}
                        <Link className='font-normal hover:bg-blue-400 active:bg-rose-400 px-4 w-full py-2 border-b' href='/order'>My Orders</Link>
                        <Link className='font-normal hover:bg-blue-400 active:bg-rose-400 px-4 w-full py-2 border-b' href='/contact'>Contact Us</Link>
                        <Link className='font-normal hover:bg-blue-400 active:bg-rose-400 px-4 w-full py-2 border-b' href='/about'>About Us</Link>
                        <hr />
                        <Link className='font-normal hover:bg-blue-400 active:bg-rose-400 px-4 w-full py-2 border-b' href='/admin'>Admin Dashboard</Link>


                        <div className='relative z-40'>
                            <button
                                type='button'
                                className='w-full text-center px-4 py-2'
                                onClick={toggleSubmenu}
                            >
                                Products
                            </button>

                        </div>
                    </div>

                )}
                {isSubmenuOpen && (
                    <div className="absolute top- right-full bg-white shadow-lg w-32 z-50 text-gray-700 overflow-hidden rounded-md">
                        <Link href="/products/category1" className="block px-4 py-2 hover:bg-gray-200">Category 1</Link>
                        <Link href="/products/category2" className="block px-4 py-2 hover:bg-gray-200">Category 2</Link>
                    </div>
                )}
            </div>
            {isOpen && <div className='w-screen opacity-50 h-screen z-20 bg-black  fixed top-0 left-0'>

            </div>}

        </>
    );
};

export default UserMenu;
