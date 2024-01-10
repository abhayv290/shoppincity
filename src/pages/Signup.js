import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {useState} from 'react'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useRouter} from 'next/navigation';
const Signup = () => {
    const router = useRouter();


    const [newUser, setnewUser] = useState({name: '', email: '', password: ''})

    //handles the onchange event
    const handleChange = (e) => {
        setnewUser({
            ...newUser,
            [e.target.name]: e.target.value,
            [e.target.email]: e.target.value,
            [e.target.password]: e.target.value
        })
    }
    // handle the Post request for Signup and data submission in database
    const handleSubmit = async () => {
        const postData = {
            name: newUser.name,
            email_id: newUser.email,
            password: newUser.password
        }
        console.log(postData);
        // Make the POST request using the Fetch API
        try {
            const response = await fetch('http://localhost:3000/api/Signup', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(postData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);

            }

            const data = await response.json();
            setnewUser({name: '', email: '', password: ''});


            //notification
            toast.success(`new user created--${newUser.name}`, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            // router.push('/');
        } catch (error) {
            console.error('Error:', error);
            //notification
            toast.error('User Already Exits', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
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
            <div className=" lg:mx-80 md:mx-48 mt-8 rounded-md bg-gray-50  flex flex-col items-center py-8 shadow-lg shadow-slate-500 ">
                <div className='rounded-full p-8 bg-gray-200  border-solid border-2 border-indigo-300'><Image alt='' src={''} width={10} height={10}></Image><i className='fa-solid  text-gray-700 text-4xl fa-user'></i></div>

                <div className='flex flex-col items-start   p-2'>
                    <label htmlFor="name">UserName</label>
                    <input value={newUser.name} onChange={handleChange} className='border-solid border-2 mb-8 px-4 mt-2 py-1 rounded-md w-80 border-indigo-400' placeholder='Abhay vi' type="text" name='name' />
                    <label htmlFor="email">Email address</label>
                    <input value={newUser.email} onChange={handleChange} className='border-solid  mb-8 px-4 py-1 mt-2  border-2 rounded-md w-80 border-indigo-400' name='email' placeholder='abhay@gmail.com' type="email" />
                    <label htmlFor="password">Password</label>
                    <input value={newUser.password} onChange={handleChange} className='border-solid border-2  mb-2 mt-2 px-4 py-1  rounded-md w-80 border-indigo-400' placeholder='******' type='password' name='password' />
                </div>

                <div className='bg-indigo-500 mx-4 text-gray-100 rounded-md font-semibold  my-2'>
                    <button onClick={handleSubmit} className='px-32 py-1 active:bg-green-500'>Sign up</button>
                </div>
                <div>Already a user? <Link href={'/Login'} className='text-indigo-500 hover:text-indigo-700 font-semibold '>Login</Link></div>

            </div>
        </section>
    )
}

export default Signup