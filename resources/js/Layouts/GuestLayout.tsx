import ApplicationLogo from '@/Components/ApplicationLogo';
import Card from '@/Components/Card';
import { ShieldCheckIcon } from '@/Components/Icons';
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
                                <p className="text-black-600 mt-1 font-sans text-sm font-bold">
                                    Konsultasi Dokter Hewan Online Kapan Saja!
                                </p>
                            </div>
                        </div>

                        {children}
                    </Card>

                    {/* Footer */}
                    <div className="mt-6 flex flex-col items-center justify-center gap-1.5 text-center text-xs text-stone-500">
                        <div className="inline-flex items-center gap-1.5 font-medium text-stone-600">
                            <ShieldCheckIcon className="h-3.5 w-3.5 text-nvet-green" />
                            <span>
                                Privasi Terjaga • Rekam Medis Terenkripsi Aman
                            </span>
                        </div>
                        <p className="text-[11px] text-stone-400">
                            Butuh bantuan darurat? Hubungi klinik fisik hewan
                            terdekat bila anabul dalam kondisi kritis.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
