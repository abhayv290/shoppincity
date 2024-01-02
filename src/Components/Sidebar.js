import React from 'react'



export default function Sidebar(props) {
    return (
        <div className='fixed top-16 inset-y-0 left-0 w-64 bg-gray-800 transform translate-x-0 transition-transform duration-300 ease-in-out'>
            <div></div>
            <button onClick={props.closeSide} className='bg-gray-100 text-4xl focus:outline-none'>close</button>
        </div>
    )
}
