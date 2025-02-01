'use client'
import Container from '../Container';
import React, { useState } from 'react'
import { IconType } from 'react-icons/lib'
import { MdDashboardCustomize, MdLibraryAdd } from 'react-icons/md';
import { BsDatabaseAdd } from "react-icons/bs";
import { AiOutlineProduct } from 'react-icons/ai'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
interface navItemProps {
    icon: IconType;
    label: string;
    route: string;
}
const NavAdmin = () => {

    const path = usePathname();
    const navItem: navItemProps[] = [
        { icon: MdDashboardCustomize, label: 'Dashboard', route: '' },
        { icon: MdLibraryAdd, label: 'Add Products', route: 'add-products' },
        { icon: AiOutlineProduct, label: 'Manage Products', route: 'manage-products' },
        { icon: BsDatabaseAdd, label: 'Manage Orders', route: 'manage-orders' }
    ]


    return (
        <Container>
            <div className={`w-full overflow-x-auto flex flex-nowrap gap-4 md:gap-8 lg:gap-12   md:justify-evenly   custom-scrollbar-hide border-b-[3px]  px-4 pt-5`}>

                {navItem.map((item: navItemProps, idx: number) => (
                    <Link className={`hover:font-bold    py-2 hover:text-rose-500 flex ${path === '/admin/' + item.route ? 'text-rose-600' : ''} items-center justify-center gap-4`} href={'/admin/' + item.route} key={idx}>

                        <item.icon className='text-4xl md:text-3xl' fontWeight={500} />
                        <span className='text-base md:text-xl lg:text-2xl font-semibold'>{item.label}</span>

                    </Link>

                ))

                }
            </div>
        </Container>

    )
}

export default NavAdmin