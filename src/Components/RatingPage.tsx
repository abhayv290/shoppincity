'use client'
import { Rating } from '@mui/material';
import Image from 'next/image';
import React from 'react'

import { VscAccount } from 'react-icons/vsc';
interface RatingProps {
    product: any
}
const RatingPage: React.FC<RatingProps> = ({ product }) => {
    //Function to format the date
    function dateFormat(value: string) {
        const date = new Date(value);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit'
        }).format(date)
    }
    return (
        <div>
            <h1 className='font-bold text-gray-700 text-2xl'>Product Reviews</h1>
            <hr />
            <div className='text-base mt-4'>
                {product.reviews && product.reviews.map((review: any) => (
                    <div key={review.id}>
                        <div className='flex gap-4 items-center'>
                            <div>{review.user.image ? <Image className='rounded-full border border-slate-300' src={review?.user?.image} height={30} width={30} alt='Avatar'></Image> : <VscAccount className='text-2xl font-semibold' />}</div>
                            <div>{review?.user?.name}</div>
                            <div>
                                {dateFormat(review?.createdDate)}
                            </div>
                        </div>
                        <div className='ml-10'><Rating size='small' value={review?.rating} readOnly /> </div>
                        <p className='text-wrap text-sm'>{review?.comment}</p>
                        <hr className='mt-2 mb-2' />
                    </div>

                ))}

            </div>

        </div>
    )
}

export default RatingPage