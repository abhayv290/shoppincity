'use client'
import Input from '@/src/Components/inputs/Input';
import { useForm, type FieldValues, type SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import TextArea from '@/src/Components/inputs/TextArea';
import CheckBox from '@/src/Components/inputs/CheckBox';
import categories from '@/src/utills/categories';
import { IconType } from 'react-icons/lib';
import { colors } from '../../../utills/colors';
import { useDropzone } from 'react-dropzone'

import { PutBlobResult } from '@vercel/blob';
import axios from 'axios';

import { useRouter } from 'next/navigation';
interface imageT {
    color: string;
    colorCode: string;
    image: string | null;
}
const AddFormProduct = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [images, setImages] = useState<ImageType[] | null>(null);
    const [isCreated, setIsCreated] = useState<boolean>(false);
    const router = useRouter();

    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            description: '',
            brand: '',
            category: '',
            images: [],
            inStock: false,
            price: '',
        }
    });
    const category = watch('category');

    const setCustomVal = (id: string, val: any) => {
        setValue(id, val, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }
    useEffect(() => {
        setCustomVal('images', images);
    }, [images])
    useEffect(() => {
        if (isCreated) {
            reset();
            setImages(null);
            setIsCreated(false);
        }
    }, [isCreated, reset])
    const [selected, isSelected] = useState<boolean>(false);
    const addImage = (val: ImageType) => {
        setImages((prev) => {
            if (!prev) return [val]
            return [...prev, val]
        })
    }
    const removeImage = (val: ImageType) => {
        setImages(prev => {
            if (!prev) return null
            return prev.filter((item => item.color !== val.color))
        })
    }
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        // console.log(data);
        // step 1 : upload image to any provider 
        setIsLoading(true);
        let uploadedImage: imageT[] = [];
        if (!data.category) {
            setIsLoading(false);
            return toast.error('Category is not selected');
        }
        if (!data.images || data.images.length === 0) {
            setIsLoading(false);
            return toast.error('no selected image')
        }
        async function uploadImage() {
            console.log('please wait');
            toast('Please wait');
            try {
                for (const item of data.images) {
                    if (item.image) {
                        const response = await fetch(
                            `/api/product/upload?filename=${item.image.name}`,
                            {
                                method: 'POST',
                                body: item.image,
                            },
                        );
                        const newBlob = (await response.json()) as PutBlobResult;
                        if (newBlob) {
                            toast.success(newBlob.pathname + 'uploaded');
                            uploadedImage.push({ ...item, image: newBlob.url });
                            removeImage(item)
                        }

                        setIsLoading(false);
                    }
                }
            } catch (err) {
                toast.error('cannot upload image , try again');
                throw new Error('Image not uploaded try again ');
            }

        }
        await uploadImage();

        // step 2 : upload the data on mongodb 
        const productData = { ...data, images: uploadedImage }
        axios.post('/api/product', productData).then((res) => {
            if (res.status === 200) {
                toast.success('product added');
                reset();
                router.refresh();
            } else {
                toast.error('try again')
            }


        }).catch((err) => {
            toast.error('Some Error Occurred');
            throw new Error('Some Error Occurred');
        })



    }

    return (
        <div className='space-y-5'>
            <h3 className='text-xl md:text-2xl lg:text-3xl font-semibold text-center'>Add A  Product</h3>
            <Input type='text' id='name' label='name' disabled={isLoading} register={register} errors={errors} />
            <Input type='text' id='brand' label='brand' disabled={isLoading} register={register} errors={errors} />
            <TextArea id='description' label='description' disabled={isLoading} register={register} errors={errors} />
            <Input type='number' register={register} errors={errors} id='price' label='price' disabled={isLoading} />
            <CheckBox label='inStock' id='inStock' register={register} disabled={isLoading} />
            <div className='w-full font-medium'>
                <h4 className='mb-2 font-semibold '>Select Category</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 max-h[50vh] overflow-y-auto gap-5">
                    {categories?.map((item, idx) => (
                        <div key={idx}>
                            <SelectCategory label={item.label} Icon={item.icon} selected={category === item.label} onClick={(category) => setCustomVal('category', category)} />
                        </div>
                    ))}
                </div>
            </div>
            <hr />
            <div className='flex w-full flex-col flex-wrap gap-5'>
                <div>
                    <h4 className='font-medium text-xl'>
                        Select the available Color and upload the images
                    </h4>
                    <p className='text-base '>
                    </p>
                </div>
                <div className='grid grid-cols-2  gap-3'>

                    {colors.map((item) => (
                        <div key={item.colorCode}>

                            <SelectColor item={item} addImage={addImage} removeImage={removeImage} isCreated={isCreated} />
                        </div>

                    ))}
                </div>



            </div>
            <hr />
            <div className='w-full flex justify-center my-5 '>

                <button onClick={handleSubmit(onSubmit)} className='px-4 p-1 text-xl min-w-64 text-white  font-semibold bg-slate-500 hover:bg-slate-700 rounded-md shadow-md hover:shadow-slate-200 active:bg-slate-900' type='button' >{isLoading ? 'Loading...' : 'Submit'}</button>
            </div>
        </div>
    )
}

export default AddFormProduct
interface CategoryProps {
    label: String;
    Icon: IconType;
    selected?: Boolean;
    onClick: (label: String) => void
}
const SelectCategory: React.FC<CategoryProps> = ({ label, Icon, selected, onClick }) => {

    return (
        <div className={`rounded-xl border-2 p-4 flex flex-col items-center gap-3 hover:border-slate-400 cursor-pointer  transition ${selected ? 'border-slate-500' : 'border-slate-200'}`} onClick={() => onClick(label)}>
            <Icon size={30} />
            <h4 className=' text-lg md:text-xl font-medium'>{label}</h4>
        </div>

    )
}

interface ImageType {
    color: string;
    colorCode: string;
    image: File | null
}
interface ColorProps {
    item: ImageType;
    addImage: (val: ImageType) => void;
    removeImage: (val: ImageType) => void;
    isCreated: boolean;
}
const SelectColor: React.FC<ColorProps> = ({ item, isCreated, addImage, removeImage }) => {
    const [isSelected, setIsSelected] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        if (isCreated) {
            setIsSelected(false);
            setFile(null);
        }
    }, [isCreated]);

    const handleFileChange = (val: File) => {
        setFile(val);
        addImage({ ...item, image: val });
    };

    const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        setIsSelected(e.target.checked);
        if (!e.target.checked) {
            setFile(null);
            removeImage(item);
        }
    };

    return (
        <div className="border rounded-lg p-4 flex flex-col items-start gap-4 shadow-sm">
            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    id={item.color}
                    checked={isSelected}
                    onChange={handleCheck}
                    className="w-5 h-5 cursor-pointer accent-slate-500"
                />
                <label
                    htmlFor={item.color}
                    className="text-lg font-medium text-slate-700 cursor-pointer"
                >
                    {item.color}
                </label>
            </div>
            {isSelected && (
                <div className="w-full">
                    {!file ? (
                        <SelectImage item={item} handleFileChange={handleFileChange} />
                    ) : (
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-600">{file.name}</p>
                            <button
                                aria-label="Cancel"
                                onClick={() => {
                                    setFile(null);
                                    removeImage(item);
                                }}
                                className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};



interface SelectImageProps {
    item: ImageType;
    handleFileChange: (val: File) => void
}
const SelectImage: React.FC<SelectImageProps> = ({ item, handleFileChange }) => {
    const onDrop = useCallback((item: File[]) => {
        // Do something with the files
        if (item.length > 0) {
            handleFileChange(item[0]);
        }
    }, [handleFileChange])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': ['.jpeg', '.png', '.webp'] } })
    return (
        <div  {...getRootProps()} className='border-2 border=slate-400 border-dashed cursor-pointer text-base text-slate-500 flex items-center justify-center font-medium'>
            <input {...getInputProps()} />
            {isDragActive ? <p>Drag the image here</p> : <p> + {item?.color}  Image</p>}
        </div>
    )
}