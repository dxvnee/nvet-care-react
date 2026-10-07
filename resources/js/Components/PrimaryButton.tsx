import { ButtonHTMLAttributes } from 'react';

export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center rounded-xl border border-transparent bg-gradient-to-r from-nvet-dark to-nvet-primary px-5 py-2.5 text-sm font-medium tracking-wide text-white shadow-md shadow-nvet-dark/20 transition-all duration-200 ease-in-out hover:from-[#3B1F0C] hover:to-[#784830] hover:shadow-lg hover:shadow-nvet-dark/30 focus:outline-none focus:ring-2 focus:ring-nvet-primary focus:ring-offset-2 active:scale-[0.99] ${
                    disabled ? 'cursor-not-allowed opacity-50' : ''
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
