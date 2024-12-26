'use client'
import React, { useCallback, useState } from 'react'

import { Icon, Rating } from '@mui/material'

import ProductImg from './ProductImg'
import { FaCartArrowDown } from 'react-icons/fa6'
import { useCart } from '../hooks/useCart'
import truncate from '../utills/truncate'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'



interface productDetailsProps {
    product: any
}
export type cartProductType = {
    id: string;
    name: string;
    description: string;
    category: string;
    brand: string;
    selectImg: selectImgType;
    quantity: number;
    price: number;

}
export type selectImgType = {
    color: string;
    colorCode: string;
    image: string;
}
const ProductDetails: React.FC<productDetailsProps> = ({ product }) => {
    //Reducer function to calculate the avg rating of the product
    const router = useRouter();

    const rating = product.reviews.reduce((acc: number, curr: any) => acc + curr.rating, 0) / product.reviews.length



    // cartState
    const [cartProduct, setCartProduct] = useState<cartProductType>({
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        brand: product.brand,
        selectImg: { ...product.images[0] },

        quantity: 1,
        price: product.price
    })

    //handle Color function 
    // const handleColor = (image: selectImgType) => {
    //     //update the setCartProduct 
    //     setCartProduct({ ...cartProduct, selectImg: image });
    // }
    //Same job using react usecallback hook 
    const handleColor = useCallback((value: selectImgType) => {
        setCartProduct((prev) => { return { ...prev, selectImg: value } })
    }, [])

    //This Arrow function handles the change in the quantity of the cart product
    const handleQtyChange = (num: number) => {
        setCartProduct({ ...cartProduct, quantity: cartProduct.quantity + num })
    }

    // This Function Add Items to the cart
    const { addToCart, cartItem, cartQty } = useCart();

    const handleCartButton = (cartProduct: cartProductType) => {
        if (cartItem?.find(item => item.id === cartProduct.id && item.selectImg.color === cartProduct.selectImg.color)) {
            //Check if the item is already in the cart
            // toast.error(`${truncate(cartProduct.name)} already in the cart`)
            router.push('/cart');
        } else {
            addToCart(cartProduct);
            toast.success(`${truncate(cartProduct.brand)} added to the cart `)

        }
    }



    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 text-slate-700'>
            <Toaster />
            <div>
                <ProductImg product={product} handleColor={handleColor} cartProduct={cartProduct} />
            </div>
            <div className='space-y-2'>
                <h1 className='text-xl sm:text-3xl font-semibold'>{product.name}</h1>
                <div className='flex gap-2 items-center'>
                    <Rating value={rating} precision={0.5} readOnly />
                    <h5 className='text-base text-slate-500' >{product.reviews.length} reviews</h5>
                </div>
                <hr className='mt-2 mb-2' />
                <div className='text-base  text-justify'>{product.description}</div>

                <hr className='mt-2 mb-2' />
                <div><span className='font-semibold '>CATEGORY: </span> Mobile</div>
                <div><span className='font-semibold '>BRAND: </span> Apple</div>
                <div className={product.inStock ? 'text-teal-400' : 'text-red-500'}>{product.inStock ? 'in Stock' : 'Out of Stock'}</div>
                <hr className='mt-2 mb-2' />
                <SetColor images={product.images} cartProduct={cartProduct} handleColor={handleColor} />
                <hr className='mt-2 mb-2' />
                <SetQty cartProduct={cartProduct} cartCounter={false} handleQtyChange={handleQtyChange} />
                <hr className='mt-2 mb-2' />
                <div>
                    <button className='flex w-48 items-center justify-center gap-2 hover:bg-slate-600 hover:text-gray-100 p-1 px-4 rounded-sm active:bg-green-600 border-2 border-slate-700 shadow-sm  shadow-slate-800 hover:' onClick={() => handleCartButton(cartProduct)} type='button'><FaCartArrowDown className='text-lg' /> <span className='text-lg'>{(cartItem?.find(item => item.id === cartProduct.id && item.selectImg.color === cartProduct.selectImg.color)) ? 'Go To Cart' : 'Add To Cart'}</span> </button>
                </div>

            </div>
        </div>
    )
}

export default ProductDetails

interface ColorProps {
    images: selectImgType[];
    cartProduct: cartProductType;
    handleColor: (value: selectImgType) => void

}
export const SetColor: React.FC<ColorProps> = ({ images, cartProduct, handleColor }) => {

    return (
        <div className='flex gap-4 items-center'>
            <span className='font-semibold text-slate-700'>COLOR: </span>
            <div className='flex items-center gap-4 justify-center'>{images.map((image, index) => (
                <div onClick={() => handleColor(image)} key={index} className={`h-7 w-7 rounded-full cursor-pointer  flex items-center justify-center  border-teal-300 r ${cartProduct.selectImg.color === image.color ? 'border-2' : 'border-none'}   `} >
                    <div style={{ background: image.colorCode }} className='h-5 w-5 rounded-full align-middle  border-1 border-slate-300'>

                    </div>
                </div>
            ))}</div>

        </div>
    )
}
interface SetQtyProps {
    cartCounter?: boolean;
    cartProduct: cartProductType;
    handleQtyChange: (num: number) => void;
}

export const SetQty: React.FC<SetQtyProps> = ({ cartProduct, handleQtyChange, cartCounter }) => {
    return (
        <div className='flex gap-5 items-center '>
            {cartCounter ? null : <div className='font-semibold text-slate-700'>QUANTITY: </div>}
            <div className='flex items-center gap-2'>
                <button disabled={cartProduct.quantity === 1 ? true : false} onClick={() => handleQtyChange(-1)} type='button' className='font-bold  hover:scale-105 hover:text-red-600 text-xl px-2  border border-slate-400 shadow-md shadow-slate-300'>-</button>
                <h4 className='font-bold' >{cartProduct.quantity}</h4>
                <button onClick={() => handleQtyChange(1)} type='button' className='font-bold hover:scale-105 hover:text-green-600  text-xl border border-slate-400 px-2 shadow-md shadow-slate-300'>+</button>

            </div>
        </div>
    )
}