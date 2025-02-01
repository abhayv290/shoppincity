'use client'
import TextArea from "@/src/Components/inputs/TextArea";
import { safeUser } from "@/src/type";
import { Rating } from "@mui/material";
import { Order, Product, Review } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface ratingProps {
    product: (Product & {
        review: Review;
    });
    user: (safeUser & {
        orders: Order
    }) | null
}

const AddRating: React.FC<ratingProps> = ({ product, user }) => {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FieldValues>({
        defaultValues: {
            comment: '',
            rating: 0
        }
    });
    const setCustomValue = (id: string, val: any) => {
        setValue(id, val, {
            shouldDirty: true, shouldTouch: true, shouldValidate: true
        })
    }
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data);
        setIsLoading(true);

        if (user && product) {
            const reviews = {
                comment: data.comment,
                rating: data.rating,
                product: product
            }
            const res = await axios.post('/api/product/reviews', reviews);
            console.log(res);
            if (res.status === 200 && res.data.status === 200) {
                toast.success('You rated this product ' + data.rating + '⭐')
                reset();
                setIsLoading(false);
                router.refresh();
            } else if (res.data.status === 403) {
                toast.success('Order the product first')
            } else {
                toast.error('Try Again')
            }
        } else {
            toast.error('you have not purchase the product yet')

        }

    }
    return (

        <div className="flex flex-col max-w-[500px] items-start  gap-4">
            <h2 className="font-semibold text-xl md:text-2xl text-start">Rate This Product</h2>
            <Rating onChange={(e, newValue) => setCustomValue('rating', newValue)} />
            <TextArea label="write a review" id="comment" register={register} disabled={isLoading} required errors={errors} />
            <button onClick={handleSubmit(onSubmit)} className="px-4 py-1 font-medium text-base md:text-xl rounded-md outline-none hover:outline hover:outline-rose-200 active:outline-rose-500  border-slate-500 border bg-slate-700 hover:bg-slate-800 text-white w-32 md:w-48" type="button">Submit</button>

        </div>
    )
}

export default AddRating