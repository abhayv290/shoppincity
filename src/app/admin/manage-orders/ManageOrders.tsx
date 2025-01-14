'use client';
import { Order } from '@prisma/client';
import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { MdCheckCircle, MdCancel, MdOutlineLocalShipping } from 'react-icons/md';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import formatPrice from '@/src/utills/formatPrice';
import Link from 'next/link';

interface orderProps {
    orders: Order[];
}

const ManageOrders: React.FC<orderProps> = ({ orders }) => {
    const columns: GridColDef[] = [
        {
            field: 'id', headerName: 'Order ID', width: 80, renderCell: (params) => (
                <Link href={'orders/' + params.value}>{params.value}</Link>
            )
        },
        { field: 'userId', headerName: 'User ID', width: 100 },
        { field: 'paymentId', headerName: 'Payment ID', width: 120 },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
            renderCell: (params) => {
                const status = params.value;
                const statusStyles: any = {
                    succeeded: <MdCheckCircle className="text-green-500" />,
                    FAILED: <MdCancel className="text-red-500" />,
                    pending: <AiOutlineExclamationCircle className="text-yellow-500" />,
                };
                return (
                    <div className="flex items-center justify-center gap-2">
                        {statusStyles[status] || <AiOutlineExclamationCircle className="text-gray-500" />}
                        <span className="capitalize text-sm">{status.toLowerCase()}</span>
                    </div>
                );
            },
        },
        { field: 'currency', headerName: 'Currency', width: 100 },
        {
            field: 'amount',
            headerName: 'Amount',
            width: 150,
            renderCell: (params) => (
                <span className="font-semibold text-blue-600">{formatPrice(params.value / 100)}</span>
            ),
        },
        {
            field: 'deliveryStatus',
            headerName: 'Delivery Status',
            width: 180,
            renderCell: (params) => {
                const deliveryStatus: any = params.value;
                const deliveryIcons: any = {
                    succeeded: <MdCheckCircle className="text-green-500" />,
                    processing: <MdOutlineLocalShipping className="text-yellow-500" />,
                    canceled: <MdCancel className="text-red-500" />,
                };
                return (
                    <div className="flex items-center gap-2">
                        {deliveryIcons[deliveryStatus] || <AiOutlineExclamationCircle className="text-gray-500" />}
                        <span className="capitalize text-sm">{deliveryStatus.toLowerCase()}</span>
                    </div>
                );
            },
        },
        {
            field: 'product',
            headerName: 'Products',
            width: 250,
            renderCell: (params) => (
                <span className="truncate block max-w-full text-gray-600">{params.value}</span>
            ),
        },
    ];

    const rows = orders?.map((item) => ({
        id: item.id,
        userId: item.userId,
        paymentId: item.paymentId,
        amount: item.amount,
        status: item.status,
        currency: item.currency,
        deliveryStatus: item.deliveryStatus,
        product: item.products?.map((product) => product.name).join(', '),
    }));

    const paginationModel = { page: 0, pageSize: 5 };

    return (
        <div className="flex justify-center  pt-5  min-h-screen">
            <Paper
                sx={{
                    height: 500,
                    width: '90%',
                    backgroundColor: '#ffffff',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                }}
            >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    sx={{
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#f3f4f6',
                            fontWeight: 'bolder !important',
                            color: '#374151',
                        },
                        '& .MuiDataGrid-cell': {
                            color: '#1f2937',
                        },
                        '& .MuiDataGrid-row:hover': {
                            backgroundColor: '#f9fafb',
                        },
                        '& .MuiDataGrid-row': {
                            fontSize: '0.875rem',
                        },
                        border: 0,
                    }}
                />
            </Paper>
        </div>
    );
};

export default ManageOrders;
