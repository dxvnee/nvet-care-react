import logo from '../../images/logo.png';
import { ImgHTMLAttributes } from 'react';

export default function ApplicationLogo({
    className = '',
    alt = 'Nvet Care Logo',
    ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            src={logo}
            alt={alt}
            className={`object-contain ${className}`}
            {...props}
        />
    );
}

