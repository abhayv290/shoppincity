
import { getUser } from '@/src/actions/getUser'
import NavAdmin from '@/src/Components/admin/NavAdmin'
import { Metadata } from 'next'
import React from 'react'
export const metadata: Metadata = {
    title: 'ShoppinCity admin',
    description: 'Shoppincity admin panel'
}

const layout: React.FC<React.PropsWithChildren> = async ({ children }) => {
    const user = await getUser();
    if (!user || user.role !== 'ADMIN') {
        return <div className="flex w-full font-medium text-2xl justify-center m-5 items-center">You are not authorized as admin</div>
    }
    return (
        <div className='w-full'>
            <NavAdmin />
            {children}
        </div>
    )
}

export default layout
