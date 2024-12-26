import React from 'react'
import { FaLinkedinIn } from 'react-icons/fa'
import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter } from 'react-icons/io5'
import { Oswald } from 'next/font/google'
const oswald = Oswald({ subsets: ['latin'], weight: '500' })
const Footer = () => {
    return (
        <footer className="text-gray-400 bg-gray-950 body-font">
            <div className="container px-5 py-12 mx-auto">
                <div className="flex flex-wrap md:text-left text-center order-first">
                    <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                        <h2 className="title-font font-bold hover:underline   text-white tracking-widest text-sm mb-3">Electronics</h2>
                        <nav className="list-none mb-10">
                            <li>
                                <a className="text-gray-400 hover:text-white">Mobile & Smart watches</a>
                            </li>
                            <li>
                                <a className="text-gray-400 hover:text-white">Laptops & Accessories</a>
                            </li>
                            <li>
                                <a className="text-gray-400 hover:text-white">TVs & other home Appliances</a>
                            </li>
                            <li>
                                <a className="text-gray-400 hover:text-white">Speakers & headphones</a>
                            </li>
                            <li>
                                <a className="text-gray-400 hover:text-white">Computers & tablets</a>
                            </li>
                        </nav>
                    </div>
                    <div className="lg:w-1/4 md:w-1/2 w-full px-4 lg:border-r border-gray-500">
                        <h2 className="title-font font-bold hover:underline   text-white tracking-widest text-sm mb-3">Fashion</h2>
                        <nav className="list-none mb-10">
                            <li>
                                <a className="text-gray-400 hover:text-white">Tshirts for Men</a>
                            </li>
                            <li>
                                <a className="text-gray-400 hover:text-white">Shirts for Men</a>
                            </li>
                            <li>
                                <a className="text-gray-400 hover:text-white">jeans for Men & Women</a>
                            </li>
                            <li>
                                <a className="text-gray-400 hover:text-white">Saree </a>
                            </li>
                            <li>
                                <a className="text-gray-400 hover:text-white">Kurti for Girls </a>
                            </li>
                        </nav>
                    </div>
                    <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                        <h2 className="title-font font-bold hover:underline   text-white tracking-widest text-sm mb-3">Useful Links</h2>
                        <nav className="list-none mb-10">
                            <li>
                                <a className="text-gray-400 hover:text-white">Help & support</a>
                            </li>
                            <li>
                                <a className="text-gray-400 hover:text-white">FAQs</a>
                            </li>
                            <li>
                                <a className="text-gray-400 hover:text-white">Buying Guide</a>
                            </li>
                            <li>
                                <a className="text-gray-400 hover:text-white">Privacy Policy </a>
                            </li>
                            <li>
                                <a className="text-gray-400 hover:text-white">T&C</a>
                            </li>
                        </nav>
                    </div>
                    <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                        <h2 className="title-font font-bold hover:underline   text-white tracking-widest text-sm mb-3">Contact With Us</h2>
                        <div className="flex xl:flex-nowrap md:flex-nowrap lg:flex-wrap flex-wrap justify-center items-end md:justify-start">
                            <div className="relative w-40 sm:w-auto xl:mr-4 lg:mr-0 sm:mr-4 mr-2">
                                <label htmlFor="footer-field" className="leading-7 text-sm text-gray-400"></label>
                                <input type="text" id="footer-field" name="footer-field" placeholder='Enter email' className="w-full bg-gray-800 rounded border bg-opacity-40 border-gray-700 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                            <button className="lg:mt-2 xl:mt-0 flex-shrink-0 inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Submit</button>
                        </div>
                        <p className="text-gray-500 text-sm mt-2 md:text-left text-center">Know more about
                            <br />India&apos;s  one of the biggest online  store
                        </p>
                    </div>
                </div>
            </div>
            <div className="bg-gray-900 bg-opacity-75">
                <div className="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col">
                    <a className="flex title-font font-medium items-center md:justify-start justify-center text-white">

                        <span className={`ml-3  text-xl ${oswald.className}`}>ShoppinCity</span>
                    </a>
                    <p className="text-sm text-gray-400 sm:ml-6 sm:mt-0 mt-4">© 2024  —
                        <a href="https://twitter.com/abhayv90" className="text-gray-500 ml-1" target="_blank" rel="noopener noreferrer">@abhayv290</a>
                    </p>
                    <span className="inline-flex text-2xl sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                        <a href='https://www.facebook.com' target="_blank" rel="noopener noreferrer" className="text-gray-400 transition-transform hover:scale-110 hover:rotate-180 hover:text-blue-600">
                            <IoLogoFacebook />
                        </a>
                        <a href='https://www.X.com/abhayv290' target="_blank" rel="noopener noreferrer" className="ml-3 text-gray-400 transition-transform hover:scale-110 hover:rotate-180 hover:text-blue-300 hover:">
                            <IoLogoTwitter />
                        </a>
                        <a href='https://www.instagram.com/abhayvii' target="_blank" rel="noopener noreferrer" className="ml-3 text-gray-400 transition-transform hover:text-pink-700 hover:scale-110 hover:rotate-180 hover:">
                            <IoLogoInstagram />
                        </a>
                        <a href='https://www.linkedin.in/in/abhayvii' target="_blank" rel="noopener noreferrer" className="ml-3 text-gray-400 transition-transform hover:text-blue-800 hover:scale-110 hover:rotate-180 hover:">
                            <FaLinkedinIn />
                        </a>
                    </span>
                </div>
            </div>
        </footer>
    )
}

export default Footer
