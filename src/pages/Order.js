/* eslint-disable @next/next/no-img-element */
import React from 'react'

const Order = () => {
    return (

        <section className="text-gray-600 body-font">
            <div className="container px-5 py-12 mx-auto flex flex-wrap max-sm:flex-col-reverse ">

                <div className="sm:w-1/2 mb-10  px-4">
                    <div className="rounded-lg h-72 overflow-hidden">
                        <img alt="content" className="object-cover object-center h-50% w-50%" src="https://dummyimage.com/501x501" />
                    </div>
                       
                    <div className="flex flex-col m-6 lg:items-start items-center">
                        <div className="flex-grow">
                            <h2 className="text-gray-900 text-lg title-font font-medium mb-3">Shipping Address <i className='fas fa-shipping-fast'></i></h2>
                            <p className="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine.</p>
                            <a className="mt-3 text-indigo-500 inline-flex items-center">Track your Order
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col flex-wrap lg:py-6 -mb-10 md:w-1/2 lg:pl-12 md:text-left text-center">
                    <div className="flex flex-col mb-10 md:items-start items-center">
                        
                        <div className="flex-grow rounded-md  ">
                            <h3 className="text-gray-900 text-lg title-font font-medium mb-3">Order Id: <span className='text-red-600'> #34234</span></h3>
                            <h2 className="text-gray-900 text-lg title-font font-medium mb-3">Brand Name</h2>
                            <p className='text-black'>Size: M  color: red </p>
                           
                            <h3 className="text-gray-900 text-lg title-font font-medium mb-3">Price total: ₹500 <span className='text-sm text-red-500'>cash on delivery</span> </h3>
                            
                            <p className="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine.</p>
                            <a className="mt-3 text-indigo-500 inline-flex items-center">Learn More
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                                </svg>
                            </a>
                        </div>
                    </div>


                </div>
            </div>
        </section>          
    )
}

export default Order