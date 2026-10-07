import { ChatBubbleLeftRightIcon, PlusIcon } from '@/Components/Icons';
import { Doctor } from '@/types/dashboard';

interface OnlineDoctorsSectionProps {
    doctors: Doctor[];
    onConsultDoctor: (doctor: Doctor) => void;
}

export default function OnlineDoctorsSection({
    doctors,
    onConsultDoctor,
}: OnlineDoctorsSectionProps) {
    return (
        <div className="flex h-full flex-col rounded-3xl border border-nvet-light/40 bg-white p-5 shadow-sm shadow-nvet-dark/5 sm:p-6">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4">
                <div className="flex items-center gap-2.5">
                    <div className="shadow-xs flex h-9 w-9 items-center justify-center rounded-xl bg-nvet-green-light text-nvet-green">
                        <PlusIcon className="h-5 w-5" strokeWidth="2" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="font-heading text-lg font-bold tracking-tight text-nvet-dark sm:text-xl">
                                Dokter Jaga Online
                            </h2>
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-nvet-green/20 bg-nvet-green-light px-2.5 py-0.5 text-xs font-semibold text-nvet-green">
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-nvet-green opacity-75"></span>
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-nvet-green"></span>
                                </span>
                                Tersedia Sekarang
                            </span>
                        </div>
                        <p className="font-sans text-xs text-stone-500">
                            Dokter hewan berizin resmi (SIP) siap respon cepat
                        </p>
                    </div>
                </div>

                <span className="rounded-lg bg-nvet-cream/60 px-2.5 py-1 text-xs font-semibold text-nvet-primary">
                    {doctors.filter((d) => d.isOnline).length} Dokter Aktif
                </span>
            </div>

            {/* Doctors Cards List */}
            <div className="mt-4 flex-1 space-y-3">
                {doctors.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-stone-200 bg-stone-50/50 p-8 text-center">
                        <span className="mb-2 text-3xl">👨‍⚕️🩺</span>
                        <h3 className="font-heading text-sm font-semibold text-nvet-dark">
                            Belum Ada Dokter Tersedia
                        </h3>
                        <p className="mt-1 max-w-xs text-xs text-stone-500">
                            Saat ini belum ada dokter jaga yang terdaftar di sistem.
                        </p>
                    </div>
                ) : (
                    doctors.map((doctor) => (
                        <div
                            key={doctor.id}
                            className="group flex flex-col justify-between gap-3.5 rounded-2xl border border-stone-200/80 bg-white p-4 transition-all duration-200 hover:border-nvet-primary/50 hover:shadow-md hover:shadow-nvet-dark/5 sm:flex-row sm:items-center"
                        >
                        {/* Doctor Photo & Info */}
                        <div className="flex min-w-0 items-start gap-3.5">
                            <div className="relative shrink-0">
                                <div className="shadow-xs h-14 w-14 overflow-hidden rounded-2xl border border-stone-200 bg-stone-100">
                                    <img
                                        src={doctor.photo}
                                        alt={doctor.name}
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        onError={(e) => {
                                            const target =
                                                e.target as HTMLImageElement;
                                            target.onerror = null;
                                            target.src =
                                                'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80';
                                        }}
                                    />
                                </div>
                                {doctor.isOnline && (
                                    <span
                                        title="Online Sekarang"
                                        className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white"
                                    ></span>
                                )}
                            </div>

                            <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-1.5">
                                    <h3 className="truncate font-heading text-sm font-bold text-nvet-dark transition-colors group-hover:text-nvet-primary sm:text-base">
                                        {doctor.name}
                                    </h3>
                                </div>

                                <p className="mt-0.5 truncate text-xs font-medium text-stone-600">
                                    {doctor.specialization}
                                </p>

                                <div className="mt-1.5 flex flex-wrap items-center gap-2 font-sans text-[11px] text-stone-500">
                                    <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 font-semibold text-amber-600">
                                        ★ {doctor.rating.toFixed(1)} (
                                        {doctor.reviewCount}+ ulasan)
                                    </span>
                                    <span className="text-stone-300">•</span>
                                    <span>{doctor.experience}</span>
                                </div>
                            </div>
                        </div>

                        {/* Fee & Action Button */}
                        <div className="flex shrink-0 items-center justify-between gap-2 border-t border-stone-100 pt-2 sm:flex-col sm:items-end sm:justify-center sm:border-t-0 sm:pt-0">
                            <div className="text-left sm:text-right">
                                <span className="block font-sans text-[10px] text-stone-400">
                                    Biaya Konsultasi
                                </span>
                                <span className="font-heading text-sm font-bold text-nvet-dark">
                                    {doctor.fee}
                                </span>
                            </div>

                            <button
                                type="button"
                                onClick={() => onConsultDoctor(doctor)}
                                className="shadow-xs inline-flex items-center gap-1.5 rounded-xl bg-nvet-green px-3.5 py-2 text-xs font-semibold text-white transition-all duration-150 hover:bg-nvet-green-hover focus:outline-none focus:ring-2 focus:ring-nvet-green/30 active:scale-95"
                            >
                                <ChatBubbleLeftRightIcon className="h-3.5 w-3.5" />
                                <span>Konsultasi Sekarang</span>
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
        </div>
    );
}
