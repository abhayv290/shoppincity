import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {useState} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useRouter} from 'next/router';

const Login = () => {
    const router = useRouter();

    const [user, setUser] = useState({email: '', password: ''});

    // handle the onchange event
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    // handle the form submission event
    const handleSubmit = async () => {
        const postData = {
            email: user.email,
            password: user.password,
        };

        // Make the POST request using the Fetch API
        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(postData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            localStorage.setItem('token', data.webtoken);
            // Notification
            toast.success('Login successful', {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            setTimeout(() => {
                router.push('/');
            }, 1000);

        } catch (error) {
            console.error('Error:', error);
            // Notification
            toast.error('Invalid Credentials', {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        }
    };

    return (
        <section>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <div className="lg:mx-80 md:mx-48 mt-8 rounded-md bg-gray-50 flex flex-col items-center py-8 shadow-lg shadow-slate-500">
                <div className='rounded-full p-8 bg-gray-200  border-solid border-2 border-indigo-300'>
                    <Image alt='' src={''} width={10} height={10}></Image>
                    <i className='fa-solid text-gray-700 text-4xl fa-user'></i>
                </div>

                <div className='flex flex-col items-start p-2'>
                    <label htmlFor="email">Email address</label>
                    <input
                        onChange={handleChange}
                        className='border-solid mb-8 px-4 py-1 mt-2 border-2 rounded-md w-80 border-indigo-400'
                        name='email'
                        placeholder='abhay@gmail.com'
                        type="email"
                        value={user.email}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        onChange={handleChange}
                        className='border-solid border-2 mb-2 mt-2 px-4 py-1 rounded-md w-80 border-indigo-400'
                        placeholder='******'
                        type='password'
                        name='password'
                        value={user.password}
                    />
                </div>
                <div className='flex justify-between '>
                    <input type="checkbox" name="check" placeholder='remember me' id="check" />
                    <label className='mr-20' htmlFor="check">remember me</label>
                    <button className='text-indigo-300 text-md '>Forgot password ?</button>
                </div>
                <div className='bg-indigo-500 active:bg-green-700 mx-4 text-gray-100 rounded-md font-semibold my-2'>
                    <button onClick={handleSubmit} className='px-32 py-1'>Login</button>
                </div>
                <div>
                    <Link href={'Signup'}>
                        New User? <strong className='text-indigo-500 hover:text-indigo-700'>Sign Up</strong>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Login;
