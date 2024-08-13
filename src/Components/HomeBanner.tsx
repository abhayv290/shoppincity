import React from 'react'
import Image from 'next/image'


const HomeBanner = () => {
    return (
        <div>
            <Image placeholder='blur' blurDataURL='/banner.webp' className='w-full max-sm:hidden' src={'/banner.webp'} width={1080} height={1000} alt='banner'></Image>
            <Image placeholder='blur' blurDataURL='/bannermobile.webp' className='w-full  sm:hidden' src={'/bannermobile.webp'} width={1080} height={1000} alt='banner'></Image>
        </div>
    )
}

export default HomeBanner