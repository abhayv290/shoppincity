'use client';

import { useCart } from '@/src/hooks/useCart';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CompletePage from './CompletePage';
import CheckoutForm from './CheckoutForm';
import SpinWheel from '@/src/Components/SpinWheel';


const stripePromise = loadStripe("pk_test_51QaDgtD1PHn7Hc72Xb3sbCIXq4V7cmxJnOJpf8JyD0VS38RM3l3u0JwwOKpp779C6vlMoc1TVAMekggVKVlzBONf00m2aJ9EuJ");

const CheckoutClient = () => {
    const { cartItem, paymentIntent, createPaymentIntent } = useCart();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [clientSecret, setClientSecret] = useState();
    const router = useRouter();
    const [confirmed, setConfirmed] = useState(false);

    // Check for payment confirmation


    // Fetch or update payment intent
    useEffect(() => {
        if (!cartItem) return;

        const controller = new AbortController();
        const signal = controller.signal;

        setLoading(true);

        fetch('/api/stripe_payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: cartItem, payment_intent_id: paymentIntent }),
            signal,
        })
            .then((res) => {
                setLoading(false);
                if (!res.ok) {
                    if (res.status === 401) {
                        router.push('/login');
                    } else {
                        throw new Error('Failed to fetch payment intent');
                    }
                }
                return res.json();
            })
            .then((data) => {
                console.log(data);
                if (data?.paymentIntent?.client_secret) {
                    setClientSecret(data.paymentIntent.client_secret);
                    createPaymentIntent(data.paymentIntent.id);
                }
            })
            .catch((err) => {
                if (err.name === 'AbortError') return; // Ignore aborted requests
                console.error(err);
                toast.error('Some Error Occurred');
                setLoading(false);
            });

        return () => controller.abort();
    }, [cartItem]);
    const confirmationStatus = (value: boolean) => {
        setConfirmed(value);
        !value && toast.error('try again')
    }
    const appearance: { theme: 'stripe', labels: 'floating' } = { theme: 'stripe', labels: 'floating' };
    const options = { clientSecret, appearance };

    if (loading) {
        return <SpinWheel />
    }

    return (
        <div className="flex justify-center">

            {clientSecret && cartItem && (
                <Elements options={options} stripe={stripePromise}>

                    {!confirmed && <CheckoutForm confirmationStatus={confirmationStatus} />}
                </Elements>
            )}
            {confirmed && <div className='mx-auto flex flex-col justify-center items-center space-y-5'>
                <h3 className='font-semibold text-xl text-green-500 text-center'>Payment Success</h3>
                <div>
                    <button onClick={() => router.push('/order')} className='px-4 py-2 rounded-sm hover:shadow-sm hover:shadow-white hover:bg-slate-800 bg-slate-500 text-white'>View your orders </button>
                </div>
            </div>}
        </div>
    );
};

export default CheckoutClient;
