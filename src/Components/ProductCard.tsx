"use client"
import React from 'react'
import Image from 'next/image'
import truncate from '../utills/truncate'
import formatPrice from '../utills/formatPrice'
import { useRouter } from 'next/navigation'

interface ProductCardProps {
    product: any
}
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const router = useRouter();
    return (
        <div >

            <div className='flex   flex-col max-h-80 max-w-64 items-center justify-center gap-2 p-5 text-base shadow-gray-200 shadow-lg'>
                <div>
                    {product.brand}
                </div>
                <div onClick={() => router.push(`/product/${product.id}`)} className='h-48 md:max-w-64 sm:max-w-48 flex-grow cursor-pointer justify-center items-center' ><Image className='w-full h-full object-contain ' height={300} width={500} src={product.images[0].image} alt={product.name}></Image></div>
                <div onClick={() => router.push(`/product/${product.id}`)} className='text-center cursor-pointer'><h3>{truncate(product.name)}</h3></div>
                <div>{formatPrice(product.price)}</div>

            </div>
        </div>
    )
}

export default ProductCard