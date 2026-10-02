import { LabelHTMLAttributes } from 'react';

export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}: LabelHTMLAttributes<HTMLLabelElement> & { value?: string }) {
    return (
        <label
            {...props}
            className={
                `block text-sm pb-1 font-heading font-black text-nvet-dark` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
