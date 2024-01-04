import Image from 'next/image';
import React, {useState, useEffect, useRef} from 'react';
import shoppincity from '/src/Assests/BrandLogo.png';
import shoppin from '../../public/sh.png';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import Cart from './Cart';

export default function Navbar({cart, handleQuantityChange, addToCart, clearCart, subTotal}) {
    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef(null);
    const thisCartRef = useRef(null);

    // useEffect(() => {
    //     const handleOutsideClick = (event) => {
    //         // Check if the clicked element is outside the sidebar and cart
    //         console.log(event, thisCartRef.current.contains(event.target));
    //         if (
    //             sidebarRef.current &&
    //             !sidebarRef.current.contains(event.target)
    //             &&
    //             thisCartRef.current &&
    //             !thisCartRef.current.contains(event.target)
    //         ) {
    //             // setIsOpen(false);
    //             thisCartRef.current.classList.add('hidden');
    //         }
    //     };
    //         document.addEventListener('click', handleOutsideClick);

    //         // Cleanup the event listener on component unmount
    //         return () => {
    //             document.removeEventListener('click', handleOutsideClick);
    //         };
    //     }, []);


    const toggleSidebar = () => {
        setIsOpen(!isOpen);
        thisCartRef.current.classList.add('hidden');
    };



    const toggleCart = () => {
        thisCartRef.current.classList.toggle('hidden');

    };
    const toggleDropdown = () => {
        let dropdown = document.getElementById('dropdown');
        dropdown.classList.toggle('hidden');

    };

    const pathname = usePathname();

    return (
        <header
            id="thiscart"
            className="text-gray-500 body-font shadow-lg shadow-slate-200 sticky top-0 z-10 bg-white">
            <div className="container mx-auto flex flex-wrap p-2 md:p-4 flex-row md:items-center">
                <button onClick={toggleSidebar}>
                    <Image className="rounded-md" src={shoppincity} width={50} height={50} alt="brand_logo" />
                </button>
                <Link
                    href={'/'}
                    className={`${pathname === '/' ? 'text-indigo-600 font-extra-bold' : ''
                        } flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0`}>
                    <span className="ml-3 text-xl">
                        {' '}
                        <Image src={shoppin} width={150} height={150} alt="brandname"></Image>
                    </span>
                </Link>

                <nav
                    ref={sidebarRef}
                    id="side"
                    className={`max-sm:text-gray-100  md:ml-auto max-sm:absolute max-sm:left-0 max-sm:top-0 opacity-90 max-sm:flex-col md:mr-auto max-sm:bg-gray-600 flex flex-wrap max-sm:h-screen max-sm:py-12 max-sm:w-60% items-center text-base md:justify-center font-bold max-sm:space-y-6  max-sm:transition-transform ${isOpen ? 'max-sm:translate-x-0' : 'max-sm:-translate-x-full'
                        } `}>
                    <button ref={sidebarRef} onClick={toggleSidebar} className='md:hidden w-full top-0  text-white py-2 rounded-md  focus:outline-none'><i className='hover:text-indigo-600 fa-solid fa-house fa-fw'></i></button>
                    <Link
                        href={'/Tshirts'}
                        className={`${pathname === '/Tshirts' ? 'text-indigo-600 font-extra-bold' : ''
                            } mr-5 hover:text-indigo-900`}>
                        Tshirts
                    </Link>
                    <Link
                        href={'/Hoodies'}
                        className={`${pathname === '/Hoodies' ? 'text-indigo-600 font-extra-bold' : ''
                            } mr-5 hover:text-indigo-900`}>
                        Hoodies
                    </Link>
                    <Link
                        href={'/Mugs'}
                        className={`${pathname === '/Mugs' ? 'text-indigo-600 font-extra-bold' : ''
                            }  mr-5 hover:text-indigo-900   `}>
                        Mugs
                    </Link>
                    <Link href={'/Bags'} className="mr-5 hover:text-indigo-900">
                        Bags
                    </Link>
                    <div className="relative inline-block text-left max-sm:mr-4 max-sm:ml-12">
                        <button
                            onClick={toggleDropdown}
                            className="inline-flex items-center justify-center p-2 max-sm:text-gray-100 hover:text-indigo-800 focus:outline-none focus:text-indigo-900">
                            <span>MyAccount</span>
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>

                        </button>
                        <div
                            id="dropdown"
                            className=" absolute right-0 mt-2 space-y-2 bg-white hidden border border-gray-200 rounded-md shadow-lg">
                            <Link href={'/Login'} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-300">
                                <i className="fa-solid fa-user px-1"></i>  Login
                            </Link>
                            <Link href={'/Signup'} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-300"> <i class="fa-solid fa-user px-1"></i>Signup</Link>

                            <Link href={'/Setting'} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-300">
                                <i className='fa-solid fa-gear  '></i> Settings
                            </Link>
                            <Link href={'/Contact'} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-300">
                                <i className="fa-solid fa-phone "></i>  Contact Us
                            </Link>
                        </div>
                    </div>

                </nav>

                <div className=" relative  left-6 md:-left-2 rounded-md cursor-pointer ">
                    <span>
                        <i className="text-indigo-600 fa-regular px-2 text-4xl fa-heart"></i>
                    </span>
                    <span onClick={toggleCart}>
                        <i className="fa-solid fa-cart-arrow-down px-4 text-4xl"></i>
                    </span>
                </div>
            </div>

            <div ref={thisCartRef} id="thisCart" className="absolute  w-96 top-24 right-0  flex flex-col opacity-90 transition-opacity  justify-end items-center hidden ">
                <Cart cart={cart} clearCart={clearCart} addToCart={addToCart} handleQuantityChange={handleQuantityChange} subTotal={subTotal} />
            </div>
        </header>
    );
}
