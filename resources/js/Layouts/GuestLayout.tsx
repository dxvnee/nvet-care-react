import ApplicationLogo from '@/Components/ApplicationLogo';
import Card from '@/Components/Card';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen w-full bg-nvet-bg font-sans text-nvet-text">
            <div className="flex min-h-screen items-center justify-center">

                {/* Main Form Container Card */}
                <div className="mx-auto w-full max-w-md sm:max-w-lg">
                    <Card>
                        <div className="mb-6 flex items-center justify-center gap-4">
                            <div className="flex h-28 w-28 items-center justify-center">
                                <ApplicationLogo className="h-full w-full" />
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="font-heading text-5xl font-bold tracking-tight text-nvet-dark">
                                    Nvet Care.
                                </span>
                                <p className="font-sans font-bold mt-1 text-sm text-black-600">
                                    Konsultasi Dokter Hewan Online Kapan Saja!
                                </p>
                            </div>
                        </div>

                        {children}
                    </Card>

                    {/* Footer */}
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
    );
}

