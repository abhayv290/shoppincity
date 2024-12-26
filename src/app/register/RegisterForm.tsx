'use client'
import Input from '@/src/Components/inputs/Input'
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useForm, type FieldValues, type SubmitHandler } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { MdAccountCircle } from 'react-icons/md';
import { safeUser } from '@/src/type';
interface PropsType {
    isLogged: safeUser | null;
}

const RegisterForm: React.FC<PropsType> = ({ isLogged }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { handleSubmit, register, formState: { errors } } = useForm<FieldValues>();
    const router = useRouter();
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post('/api/register', data).then(() => {
            toast('Account Creation Successful');
            signIn('credentials', {
                email: data?.email,
                password: data?.password,
                redirect: false
            }).then((res) => {
                if (res?.ok) {
                    router.push('/cart');
                    router.refresh();
                    toast.success('Logged in')
                } if (res?.error) {
                    toast.error(res?.error);
                }
            })
        }).catch(() => {
            toast.error('Some Error Occurred');
        }).finally(() => {
            setIsLoading(false);
        })
    }
    useEffect(() => {
        if (isLogged) {
            router.push('/cart');
            router.refresh();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return isLogged ? (<div className="text-center font-semibold text-slate-900">Logged In redirecting...</div>) : (

        <>  <span><MdAccountCircle className='text-8xl rounded-full border-2 shadow-sm shadow-slate-300' />
        </span>
            <h1 className=' text-center text-slate-800 font-bold text-xl sm:text-2xl md:text-4xl'>Sign Up</h1>
            <hr className='bg-slate-300 w-full h-px' />
            <button type='button' onClick={() => { signIn('google') }} className='px-4 p-2 flex justify-center items-center gap-5 min-w-48 border border-slate-300 hover:text-blue-50 font-semibold  hover:bg-slate-700 rounded-md shadow-md shadow-slate-200 text-slate-800 active:bg-slate-900' ><FcGoogle className='text-lg ' /> Login with Google</button>
            <Input type='text' id='name' disabled={isLoading} errors={errors} register={register} required={true} label='Name' />
            <Input type='email' id='email' disabled={isLoading} errors={errors} register={register} required={true} label='Email' />
            <Input type='password' id='password' disabled={isLoading} errors={errors} register={register} required={true} label='Password' />
            <button onClick={handleSubmit(onSubmit)} className='px-4 p-2 min-w-48 text-blue-50 font-semibold bg-slate-500 hover:bg-slate-700 rounded-md shadow-md hover:shadow-slate-200 active:bg-slate-900' type='button' >{isLoading ? 'Loading' : 'Sign Up'}</button>
            <div className='flex justify-between w-full text-slate-800'>
                <span>Already Registered: </span>
                <span className='font-semibold cursor-pointer hover:underline ' onClick={() => router.push('/login')}>Login Here</span>
            </div>

        </>
    )
}

export default RegisterForm