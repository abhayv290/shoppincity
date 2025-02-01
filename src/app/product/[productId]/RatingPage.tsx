'use client'
import { Rating } from '@mui/material';
import Image from 'next/image';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

import React from 'react'

import { VscAccount } from 'react-icons/vsc';
interface RatingProps {
    product: any
}
const RatingPage: React.FC<RatingProps> = ({ product }) => {
    console.log(product.reviews);
    return (
        <div>
            <h1 className='font-bold text-gray-700 text-2xl'>Product Reviews</h1>
            <hr />
            <div className='text-base mt-4'>
                {product?.reviews?.map((review: any) => (
                    <div key={review.id}>
                        <div className='flex gap-4 items-center'>
                            <div>{review.user.image ? <Image className='rounded-full border border-slate-300' src={review?.user?.image} height={30} width={30} alt='Avatar'></Image> : <VscAccount className='text-2xl font-semibold' />}</div>
                            <div>{review?.user?.name}</div>
                            <div>
                                {dayjs(review?.createdAt).fromNow()}
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