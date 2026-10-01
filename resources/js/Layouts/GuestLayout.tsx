import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen w-full bg-nvet-bg font-sans text-nvet-text antialiased">
            <div className="flex min-h-screen flex-col lg:grid lg:grid-cols-12">
                <div className="relative flex flex-1 flex-col justify-center px-4 py-8 sm:px-8 sm:py-12 lg:col-span-7 xl:col-span-7 xl:px-16">
                    {/* Top Mobile Branding (< lg) */}
                    <div className="mb-6 flex flex-col items-center text-center lg:hidden">
                        <Link href="/" className="flex flex-col items-center gap-2">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-2.5 shadow-md ring-2 ring-nvet-light/50">
                                <ApplicationLogo className="h-full w-full" />
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-nvet-dark">Nvet Care</span>
                        </Link>
                        <p className="mt-1 text-xs text-stone-600">
                            Konsultasi Dokter Hewan Online Kapan Saja
                        </p>

                        {/* Subtle Green Status Badge for Mobile */}
                        <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-nvet-green/30 bg-nvet-green-light px-2.5 py-0.5 text-[11px] font-medium text-nvet-green">
                            <span className="h-1.5 w-1.5 rounded-full bg-nvet-green"></span>
                            <span>Dokter Hewan Siaga 24 Jam</span>
                        </div>
                    </div>

                    {/* Main Form Container Card */}
                    <div className="mx-auto w-full max-w-md sm:max-w-lg">
                        <div className="overflow-hidden rounded-3xl border border-nvet-light/50 bg-white p-6 shadow-xl shadow-nvet-dark/5 sm:p-10">
                            {children}
                        </div>

                        {/* Security & Trust Footer */}
                        <div className="mt-6 flex flex-col items-center justify-center gap-1.5 text-center text-xs text-stone-500">
                            <div className="inline-flex items-center gap-1.5 font-medium text-stone-600">
                                <svg className="h-3.5 w-3.5 text-nvet-green" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Privasi Terjaga • Rekam Medis Terenkripsi Aman</span>
                            </div>
                            <p className="text-[11px] text-stone-400">
                                Butuh bantuan darurat? Hubungi klinik fisik hewan terdekat bila anabul dalam kondisi kritis.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

