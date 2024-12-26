'use client'
import { getUser } from '@/src/actions/getUser';
import Container from '@/src/Components/Container'
import { cartProductType } from '@/src/Components/ProductDetails';
import { useCart } from '@/src/hooks/useCart'
import { safeUser } from '@/src/type';
import formatPrice from '@/src/utills/formatPrice';

import truncate from '@/src/utills/truncate';


import Image from 'next/image';
import { useRouter } from 'next/navigation';

import React, { useEffect, useState } from 'react'
import { FaHeartCircleXmark } from 'react-icons/fa6';

export default function Wishlist({ isLogged }: { isLogged: safeUser | null }) {
    const { wishlist, removeFromWishlist } = useCart();
    const [wishlistItem, setWishlistItem] = useState<cartProductType[]>([]);

    useEffect(() => {

        if (wishlist) {
            setWishlistItem(wishlist);
        }

    }, [wishlist]);


    const router = useRouter();
    return (!isLogged ? <Container><div className='flex justify-center  shadow-md shadow-slate-100 rounded-sm px-10 text-xl font-semibold  py-5 m-10  '>
        Please Login
    </div></Container> :
        <Container>
            {!wishlistItem.length && <div className='flex justify-center  shadow-md shadow-slate-100 rounded-sm px-10 text-xl font-semibold  py-5 m-10  '>
                Your WishList is Empty
            </div>}
            <div className='grid gap-5 text-center grid-cols-2 md:grid-cols-3'>
                {wishlistItem?.map(item => (
                    <div className='flex-col cursor-pointer flex item-center justify-center p-5 gap-5' key={item.id}>
                        <div className='relative'>
                            <button onClick={() => removeFromWishlist(item)} className='absolute top-0 right-0 z-10 text-2xl text-gray-400 hover:text-slate-900 active:text-rose-500'> <FaHeartCircleXmark /> </button>
                            <Image onClick={() => router.push('/product/' + item.id)} className='object-contain  h-60' src={item.selectImg.image} width={500} height={500} alt='avatar' />
                        </div>
                        <h3>{truncate(item.name)}</h3>
                        <span>From: {formatPrice(item.price)}</span></div>

                ))}

            </div>
        </Container >
    )
}

