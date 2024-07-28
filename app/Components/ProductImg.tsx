import React from 'react'

import type { cartProductType, selectImgType } from './ProductDetails'
import Image from 'next/image';
interface ProductImgProps {
    cartProduct: cartProductType;
    product: any;
    handleColor: (value: selectImgType) => void
}
const ProductImg: React.FC<ProductImgProps> = ({ cartProduct, product, handleColor }) => {
    return (
        <div className='grid grid-cols-6  h-full  max-h-[500px] min-h-80 gap-2 sm:min-h-96'>
            <div className='flex flex-col gap-2 items-center justify-center cursor--pointer h-full border border-gray-300  max-h-[500px] min-h-80 sm:min-h-96'>
                {product.images.map((image: selectImgType) => (
                    <div key={image.color} onClick={() => handleColor(image)} className={`relative w-4/5 aspect-square border-slate-400 rounded-md ${image.color === cartProduct.selectImg.color ? 'border-2' : 'border-none'}`}>
                        <Image className='object-contain ' fill src={image.image} alt={product.name}></Image>
                    </div>
                ))}
            </div>
            <div className='col-span-5 relative aspect-square '>
                <Image fill src={cartProduct.selectImg.image} className='object-contain w-full h-full  max-h-[500px] min-h-80 sm:min-h-96 ' alt={product.name}></Image>
            </div>
        </div>

    )
}

export default ProductImg