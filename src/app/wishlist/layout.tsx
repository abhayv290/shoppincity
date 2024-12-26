import React from 'react'
import Wishlist from './page'
import { getUser } from '@/src/actions/getUser'

export default async function layout() {
    const user = await getUser();
    return (
        <>
            <Wishlist isLogged={user} />
        </>
    )
}
