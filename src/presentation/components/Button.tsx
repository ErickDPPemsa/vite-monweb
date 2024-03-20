import React from "react";
import { Spinner } from "../icons/icons";

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    full?: boolean;
    loading?: boolean;
}

export const Button = ({ children, className, full = true, loading = false, ...props }: Props) => {
    return (
        <button
            className={`h-11 bg-slate-700 dark:bg-slate-500 text-slate-200 rounded-xl text-lg font-semibold hover:bg-slate-800 hover:shadow-md hover:text-slate-50 transition-all duration-100 px-4 ${full ? "w-auto" : "w-max min-w-24"} ${className}`}
            {...props}
            disabled={loading}
        >
            {loading ? <Spinner classname="animate-spin mx-auto" /> : children}
        </button>
    )
}
