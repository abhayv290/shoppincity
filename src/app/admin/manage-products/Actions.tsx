import React from "react";
import { IconType } from "react-icons/lib";
import { MdSync } from "react-icons/md";

interface actionProps {
    Icon: IconType;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
    disabled?: boolean
}
const Actions: React.FC<actionProps> = ({ Icon, onClick, disabled }) => {
    return (
        <button onClick={onClick} type="button" disabled={disabled} className={`flex justify-center items-center py-1 px-2   text-slate-800 border border-slate-500 ${disabled && 'text-slate-500 cursor-not-allowed'}`}>
            <Icon className={Icon === MdSync ? 'active:animate-spin' : 'active:animate-ping'} size={25} />
        </button>
    )
}

export default Actions