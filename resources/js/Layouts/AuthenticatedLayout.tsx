import Navbar from '@/Components/Navbar';
import { PropsWithChildren, ReactNode } from 'react';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    return (
        <div className="min-h-screen bg-nvet-bg font-sans text-nvet-text antialiased selection:bg-nvet-primary selection:text-white">
            <Navbar />

            {header && (
                <header className="shadow-xs border-b border-nvet-light/20 bg-white">
                    <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
