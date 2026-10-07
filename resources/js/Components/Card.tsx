import { HTMLAttributes } from 'react';

export default function Card({
    children,
    className,
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            {...props}
            className={`overflow-hidden rounded-3xl border border-nvet-light/50 bg-white p-6 shadow-xl shadow-nvet-dark/5 sm:p-10 ${className}`}
        >
            {children}
        </div>
    );
}
