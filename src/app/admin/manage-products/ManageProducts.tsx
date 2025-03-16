'use client'
import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Product } from '@prisma/client';
import formatPrice from '@/src/utills/formatPrice';
import { MdDelete, MdEdit, MdSync } from 'react-icons/md';
import Actions from './Actions';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaRegEye } from 'react-icons/fa6';


interface ManageProductsProps {
    products: Product[];
}

const ManageProducts: React.FC<ManageProductsProps> = ({ products }) => {
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 8 });
    const router = useRouter();

    const handleStock = (id: string, inStock: boolean) => {
        axios.put('/api/product', { id, inStock: !inStock }).then((res) => {
            if (res.status === 200) {
                toast.success('product status changed');
                router.refresh();
            } else {
                toast.error('Some Error Occurred,Try again!')
            }

        }).catch((err: any) => {
            toast.error('Some Error Occurred,Try again!')
            throw new Error(err);
        })
    }
    const handleDelete = async (id: string) => {
        // step 1: delete the images from the store 
        const images = products.find((item) => item.id === id)?.images;
        if (images) {
            for (const item of images) {
                const response = await fetch(
                    `/api/product/upload?url=${item.image}`,
                    {
                        method: 'DELETE',
                        body: item.image,
                    },
                );
                const res = await response.json();
                if (res.status === 200) {
                    toast.success('image deleted')

                }
            }
        }
        // step 2: delete the data from the mongodb 
        axios.delete('/api/product', { data: { id } }).then((res) => {
            if (res.status === 200) {
                toast.success('product deleted');
                router.refresh();
            } else {
                toast.error('some error occurred')
            }
        }).catch((err: any) => {
            toast.error('some error occurred')
            throw new Error(err);
        })
    }
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'name', headerName: 'Name', width: 120 },
        { field: 'brand', headerName: 'Brand', width: 120 },
        {
            field: 'price',
            headerName: 'Price',
            width: 120,
            renderCell: (params) => (
                <span className="font-semibold text-red-500">{formatPrice(params.value)}</span>
            ),
        },
        { field: 'description', headerName: 'Description', width: 200 },
        { field: 'category', headerName: 'Category', width: 120 },
        {
            field: 'inStock',
            headerName: 'In Stock',
            width: 100,
            renderCell: (params) => (
                <span
                    className={`px-3 py-2 my-2 text-center  rounded-lg text-sm ${params.value ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                        }`}
                >
                    {params.value ? '✔️ Yes' : '❌ No'}
                </span>
            ),
        },
        {
            field: 'images',
            headerName: 'Preview',
            width: 200,
            sortable: false,
            renderCell: (params) => (
                <div className="flex justify-center items-center">
                    <Image width={500} height={500}
                        src={params.value || '/placeholder.jpg'}
                        alt="Product Preview"
                        className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                    />
                </div>
            ),
        },
        {
            field: 'actions',
            headerName: 'Action',
            sortable: false,
            width: 250,

            renderCell: (params) => (
                <div className="flex justify-between items-center gap-2 w-full">
                    <Actions Icon={MdSync} disabled={false} onClick={() => handleStock(params.row.id, params.row.inStock)} />
                    <Actions Icon={FaRegEye} disabled={false} onClick={() => router.push('http://localhost:3000/product/' + params.row.id)} />
                    <Actions Icon={MdEdit} disabled={true} onClick={() => { }} />
                    <Actions Icon={MdDelete} disabled={false} onClick={() => handleDelete(params.row.id)} />
                </div>
            ),
        },
    ];

    const rows = products?.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        brand: item.brand,
        category: item.category,
        inStock: item.inStock,
        images: item.images[0]?.image || null,
    })) || [];
    //function to change the stock option 

    return (
        <div className="flex w-full justify-center items-center py-5">
            <Paper

                className="w-full  shadow-md rounded-lg overflow-hidden border border-gray-200"
            >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    pageSizeOptions={[5, 8, 10]}
                    checkboxSelection
                    disableRowSelectionOnClick

                    sx={{
                        border: 0,
                        '& .MuiDataGrid-columnHeaders': {
                            fontSize: '17px',
                            fontWeight: 'bolder !important',
                        },
                        '& .MuiDataGrid-cell': {
                            display: 'flex',
                            height: '50px',
                            justifyContent: 'center'
                        },
                        '& .MuiDataGrid-footerContainer': {
                            backgroundColor: '#f9fafb',
                        }

                    }}
                />
            </Paper>
        </div>
    );
};

export default ManageProducts;
