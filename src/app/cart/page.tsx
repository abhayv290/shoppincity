import { getUser } from '@/src/actions/getUser'
import React from 'react'
import MyCart from './MyCart';

export default async function page() {
    const User = await getUser();

    return (
        <>
            <MyCart currUser={User} />
        </>
    )
}
