import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Login = () => {
    return (

        <section>
            <div className=" lg:mx-80 md:mx-48 mt-8 rounded-md bg-gray-50 flex flex-col items-center py-8 shadow-lg shadow-slate-500 ">
                <div className='rounded-full p-8 bg-gray-200  border-solid border-2 border-indigo-300'><Image alt='' src={''} width={10} height={10}></Image><i className='fa-solid  text-gray-700 text-4xl fa-user'></i></div>

                <div className='flex flex-col items-start   p-2'>

                    <label htmlFor="email">Email address</label>
                    <input className='border-solid  mb-8 px-4 py-1 mt-2  border-2 rounded-md w-80 border-indigo-400' name='email' placeholder='xyz@gmail.com' type="email" />
                    <label htmlFor="password">Password</label>
                    <input className='border-solid border-2  mb-2 mt-2 px-4 py-1  rounded-md w-80 border-indigo-400' placeholder='******' type='password' name='password' />
                </div>
                <div className='flex justify-between '>
                    <input type="checkbox" name="check" placeholder='remember me' id="check" />
                    <label className='mr-20' htmlFor="check">remember me</label>
                    <button className=' text-indigo-300 text-md '>Forgot password ?</button>
                </div>
                <div className='bg-indigo-500 active:text-indigo-700 mx-4 text-gray-100 rounded-md font-semibold  my-2'>
                    <button className='px-32 py-1'>Login</button>
                </div>
                <div><Link href={'Signup'} >  New User? <strong className='text-indigo-500 hover:text-indigo-700 ' >Sign Up</strong ></Link></div>

            </div>
        </section>

    )
}



export default Login