'use client'
import React from 'react'

const FormWrap: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <div className='min-h-fit h-full flex items-center justify-center pb-12 pt-24 md:pt-12'>
            <div className='min-h-[650px]  flex flex-col  gap-6 items-center  shadow-md shadow-slate-300 rounded-md p-4 md:p-8'>{children}</div>
        </div>
    )
}


export default FormWrap