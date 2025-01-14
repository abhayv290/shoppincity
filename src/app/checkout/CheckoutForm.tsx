import React, { useEffect, useState } from 'react';
import { PaymentElement, useStripe, useElements, AddressElement } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';
import { useCart } from '@/src/hooks/useCart';
import SpinWheel from '@/src/Components/SpinWheel';
import priceCalc from '@/src/utills/priceCalc';

interface CheckOutProps {

    confirmationStatus: (value: boolean) => void; // Callback to notify parent of successful payment
}

const CheckoutForm: React.FC<CheckOutProps> = ({ confirmationStatus }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<string>();
    const [isLoading, setIsLoading] = useState(false);
    const [totalAmount, setTotalAmount] = useState('');
    const { createPaymentIntent, cartItem, clearCart } = useCart();
    useEffect(() => {
        if (cartItem) {
            setTotalAmount(priceCalc(cartItem, 0))
        }
        setTimeout(() => {
            setMessage(undefined);
        }, 2000);
    }, [message])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded
            return;
        }

        setIsLoading(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: 'if_required',
            confirmParams: {
                return_url: 'https://localhost:3000/checkout',
            },

        });

        if (error) {
            if (error.type === 'card_error' || error.type === 'validation_error') {
                setMessage(error.message || 'Payment failed. Please try again.');
                toast.error(error.message || 'Payment failed.');
            } else {
                setMessage('An unexpected error occurred.');
                toast.error('An unexpected error occurred.');
            }
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            // Payment succeeded
            confirmationStatus(true); // Notify parent component
            setMessage('Payment succeeded!');
            toast.success('Payment succeeded!');
            try {


                const res = await fetch('/api/fetch-intent', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ paymentId: paymentIntent.id })
                })
                if (!res.ok) {
                    toast.error('Some error occurred while updating the order')

                }
                const data = await res.json();
                if (data.status == 200) {

                    createPaymentIntent(null);
                    clearCart();

                }
            } catch (err) {
                console.log(err);
                toast.error('something went wrong')
            }
        }
        setIsLoading(false);
    };

    const paymentElementOptions: { layout: 'accordion' | undefined } = {
        layout: 'accordion',
    };
    const addressElementOptions = {
        mode: 'shipping' as 'shipping' | 'billing', // or 'billing'
        allowedCountries: ['IN', 'US'], // Restrict to US and Canada
        fields: {
            phone: 'always' as 'always' | 'never' | 'auto', // Always show phone field
        },


    };


    return (
        <form className="lg:px-10 md:px-6  md:w-3/4 w-full px-2 shadow-md shadow-black py-5" id="payment-form" onSubmit={handleSubmit}>
            <div className='text-3xl font-semibold text-center my-5'>Enter Your Details</div>
            <h3 className='font-semibold text-xl text-start mb-2'>Please Add your address</h3>
            <AddressElement id='address-element' options={addressElementOptions} />
            <h3 className='font-semibold text-xl text-start my-2'>Payment Info</h3>
            <PaymentElement id="payment-element" options={paymentElementOptions} />
            <h3 className='text-center w-full  font-semibold my-4  text-xl '>Total: <b className='text-rose-400'>{totalAmount}</b></h3>
            <button
                className="w-full flex justify-center"
                disabled={isLoading || !stripe || !elements}
                id="submit"
            >
                <div
                    className="lg:w-1/2 md:w-3/4 w-full mt-4 px-4 py-2 bg-slate-500 rounded-md hover:bg-slate-700 hover:outline hover:outline-rose-200 active:outline-rose-400 active:bg-slate-900 font-semibold text-white"
                    id="button-text"
                >
                    {isLoading ? <SpinWheel /> : "Pay now"}
                </div>
            </button>
            {/* Show any error or success messages */}
            {message && <div className='text-base text-rose-400 mt-5 text-center' id="payment-message">{message}</div>}
        </form>
    );
};

export default CheckoutForm;
