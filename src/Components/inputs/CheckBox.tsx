'use client'
import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form';
interface checkProps {
    id: string;
    label: string;
    disabled?: boolean;
    register: UseFormRegister<FieldValues>;

}
const CheckBox: React.FC<checkProps> = ({ register, id, label, disabled }) => {
    return (
        <div className='w-full font-semibold   flex flex-wrap flex-row gap-3'>
            <input type="checkbox" id={id} disabled={disabled} {...register(id)} className='cursor-pointer' />
            <label htmlFor={id}>{label}</label>
        </div>
    )
}

export default CheckBox