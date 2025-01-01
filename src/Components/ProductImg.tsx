import React, { useState } from 'react'

import type { cartProductType, selectImgType } from './ProductDetails'
import Image from 'next/image';
import { FaHeart } from 'react-icons/fa6';
import { useCart } from '../hooks/useCart';
import toast from 'react-hot-toast';
import truncate from '../utills/truncate';

interface ProductImgProps {
    cartProduct: cartProductType;
    product: any;

    handleColor: (value: selectImgType) => void

}
const ProductImg: React.FC<ProductImgProps> = ({ cartProduct, product, handleColor }) => {
    const { wishlist, addToWishlist, removeFromWishlist } = useCart();
    const handleWishlist = (cartProduct: cartProductType) => {
        if (wishlist.find(item => item.id === cartProduct.id)) {
            removeFromWishlist(cartProduct);
            toast.success(`${truncate(cartProduct.brand)} removed from the wishlist`)
        } else {
            addToWishlist(cartProduct)
            toast.success(`${truncate(cartProduct.brand)} added to the wishlist`)
        }
    }

    return (
        <div className='grid grid-cols-6  h-full  max-h-[500px] min-h-80 gap-2 sm:min-h-96'>
            <div className='flex flex-col gap-2 items-center justify-center cursor--pointer h-full border border-gray-300  max-h-[500px] min-h-80 sm:min-h-96'>
                {product.images.map((image: selectImgType) => (
                    <div key={image.color} onClick={() => handleColor(image)} className={`relative w-4/5 aspect-square border-slate-400 rounded-md ${image.color === cartProduct.selectImg.color ? 'border-2' : 'border-none'}`}>
                        <Image className='object-contain ' fill src={image.image} alt={product.name}></Image>
                    </div>
                ))}
            </div>
            <div className='col-span-5 relative aspect-square h-full w-full'>
                <Image fill src={cartProduct.selectImg.image} className='object-contain w-full   max-h-[500px] min-h-80 sm:min-h-96' alt={product.name}></Image>
                <button className='absolute right-0 bottom-0 text-3xl' onClick={() => handleWishlist(cartProduct)}> <FaHeart className={`${wishlist?.find(item => item.id === cartProduct.id) ? 'text-rose-500' : 'text-gray-300'}`} /> </button>
            </div>
        </div>

    )
}

export default ProductImg