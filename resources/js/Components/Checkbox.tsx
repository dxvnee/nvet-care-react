import { InputHTMLAttributes } from 'react';

export default function Checkbox({
    className = '',
    ...props
}: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'h-4 w-4 rounded border-stone-300 bg-white text-nvet-primary shadow-sm transition duration-150 focus:ring-2 focus:ring-nvet-primary/30 focus:ring-offset-0 ' +
                className
            }
        />
    );
}

