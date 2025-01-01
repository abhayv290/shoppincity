import { getUser } from '@/src/actions/getUser'
import React from 'react'
import Cart from './page';

export default async function layout() {
    const currUser = await getUser();
    return (
        <>
            <Cart currUser={currUser} />
        </>
    )
}
