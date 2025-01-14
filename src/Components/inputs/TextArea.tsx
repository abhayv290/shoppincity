import React from 'react'
import type { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
interface InputProps {
    disabled?: boolean;
    id: string;
    label: string;

    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
}
const TextArea: React.FC<InputProps> = ({ id, label, errors, register, required }) => {
    return (
        <div className='w-full sm:min-w-96 min-w-80 relative text-slate-800'>
            <textarea style={{ resize: 'none', height: '100px' }} autoComplete='off' placeholder='' {...register(id, { required })} className={`peer w-full px-4   py-4 outline-none bg-gray-100 font-light border-2 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed ${errors[id] ? 'border-rose-400 focus:border-rose-400' : 'focus:border-slate-400 border-slate-300'} `} id={id} />
            <label className={`absolute cursor-text text-md duration-150 transform -translate-y-4 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-4 ${errors[id] ? 'border-rose-400 text-rose-500  focus:border-rose-400' : 'focus:border-slate-400 border-slate-300'}`} htmlFor={id} >{label}</label>

        </div>
    )
}

export default TextArea