'use client'
import React, { useState } from 'react'
import Container from './Container'
import categories from '../utills/categories'
import { useRouter } from 'next/navigation'

const Categories = () => {
    const [selected, setSelected] = useState('');
    function constructUrl(params: any) {
        const queryParams = new URLSearchParams(params);
        return `${'/'}?${queryParams.toString()}`;
    }
    const router = useRouter();



    const handleRoute = (label: string) => {
        setSelected(label);
        if (label === 'All') {
            router.push('/')
        } else {
            const url = constructUrl({ category: label })
            router.push(url)
        }
    }

    return (
        <div className='bg-white w-full'>
            <Container>
                <div className="pt-4 flex flex-row w-full  items-center justify-start overflow-x-auto">
                    {categories.map(item => (
                        <div key={item.label} onClick={() => handleRoute(item.label)} className={`flex items-center  justify-center text-center p-2 px-4 gap-1 border-b-[3px]   hover:text-slate-900 ${item.label === selected ? 'text-rose-500 border-rose-400' : 'text-slate-500 border-slate-200'} transition cursor-pointer`}>
                            <h4 className='font-semibold text-nowrap text-base'>{item.label}</h4>
                            <item.icon size={30} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Categories