import React from 'react'
import Container from './Components/Container'
import HomeBanner from './Components/HomeBanner'
import Image from 'next/image'
import { products } from './products'

import ProductCard from './Components/ProductCard'



export default function Home() {

  return (
    <div className='mx-auto'>
      <Container>
        <div className='mt-10 mb-10'>
          <HomeBanner />
        </div>
        <div className='mt-5 mx-auto mb-10'>
          <h2 className='sm:text-2xl text-base font-bold'>Exiting Bank Offers for you</h2>
          <Image priority={false} className='shadow-lg mx-auto shodow-gray-100' src={'/bankOffer.webp'} height={200} width={1000} alt='bank offer' ></Image>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8'>
          {/* Populate the Products  */}
          {products.map((items: any) => (
            <div key={items.id} >
              <ProductCard product={items} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}
