import { getUser } from '@/src/actions/getUser'
import React from 'react'
import WishList from './WishList';

export default async function page() {
    const User = await getUser();
    return (
        <>
            <WishList isLogged={User} />
        </>
    )
}
