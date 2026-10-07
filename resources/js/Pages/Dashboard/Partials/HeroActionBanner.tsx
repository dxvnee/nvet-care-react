import {
    ArrowRightIcon,
    ClockIcon,
    PawWatermark,
    StethoscopeIcon,
} from '@/Components/Icons';
import { Doctor } from '@/types/dashboard';

interface HeroActionBannerProps {
    userName: string;
    onStartConsultation: () => void;
    onlineDoctorCount?: number;
    featuredDoctor?: Doctor | null;
}

export default function HeroActionBanner({
    userName,
    onStartConsultation,
    onlineDoctorCount = 0,
    featuredDoctor,
}: HeroActionBannerProps) {
    return (
        <div className="relative overflow-hidden rounded-3xl border border-nvet-light/20 bg-gradient-to-br from-nvet-dark via-[#5E3416] to-nvet-primary text-white shadow-xl shadow-nvet-dark/15">
            {/* Background Decorative Elements */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-nvet-light/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 right-1/4 h-64 w-64 rounded-full bg-nvet-cream/10 blur-2xl" />
            <div className="pointer-events-none absolute left-1/3 top-0 h-40 w-40 rounded-full bg-amber-500/10 blur-2xl" />

            {/* Subtle Pet Paw Watermark */}
            <PawWatermark className="pointer-events-none absolute -bottom-6 right-6 h-56 w-56 rotate-12 transform select-none text-white/5" />

            <div className="relative z-10 p-6 sm:p-8 lg:p-10">
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                    {/* Left: Text & Action CTA */}
                    <div className="space-y-5 lg:col-span-8">
                        {/* Status Pills */}
                        <div className="flex flex-wrap items-center gap-2.5">
                            <span className="shadow-xs inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3.5 py-1 text-xs font-semibold text-nvet-cream backdrop-blur-md">
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
                                </span>
                                Dokter Jaga Siaga 24 Jam
                            </span>

                            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/15 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-md">
                                <ClockIcon className="h-3.5 w-3.5 text-amber-300" />
                                Respon Cepat &lt; 2 Menit
                            </span>
                        </div>

                        {/* Personalized Greeting & Title */}
                        <div className="space-y-2">
                            <h1 className="font-heading text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
                                Halo,{' '}
                                <span className="text-amber-200">
                                    {userName}
                                </span>
                                ! 🐾
                            </h1>
                            <p className="font-heading text-lg font-medium text-nvet-cream/90 sm:text-xl">
                                Ada keluhan kesehatan anabul hari ini?
                            </p>
                            <p className="max-w-2xl pt-1 font-sans text-sm leading-relaxed text-white/80 sm:text-base">
                                Konsultasikan kondisi hewan kesayanganmu
                                langsung dengan dokter hewan terpercaya.
                                Dapatkan penanganan cepat, analisa gejala
                                klinis, resep digital, dan panduan perawatan
                                tanpa perlu keluar rumah.
                            </p>
                        </div>

                        {/* Quick Perks Bar */}
                        <div className="grid grid-cols-1 gap-2.5 pt-1 text-xs text-nvet-cream/95 sm:grid-cols-3 sm:text-sm">
                            <div className="backdrop-blur-xs flex items-center gap-2 rounded-xl border border-white/5 bg-white/10 px-3 py-2">
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-400/20 text-amber-300">
                                    ✓
                                </span>
                                <span className="font-medium">
                                    100% Dokter Ber-SIP
                                </span>
                            </div>
                            <div className="backdrop-blur-xs flex items-center gap-2 rounded-xl border border-white/5 bg-white/10 px-3 py-2">
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-400/20 text-amber-300">
                                    ✓
                                </span>
                                <span className="font-medium">
                                    Resep & Obat Digital
                                </span>
                            </div>
                            <div className="backdrop-blur-xs flex items-center gap-2 rounded-xl border border-white/5 bg-white/10 px-3 py-2">
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-400/20 text-amber-300">
                                    ✓
                                </span>
                                <span className="font-medium">
                                    Discharge Summary Resmi
                                </span>
                            </div>
                        </div>

                        {/* Large Primary Action Button */}
                        <div className="flex flex-col items-stretch gap-3 pt-2 sm:flex-row sm:items-center">
                            <button
                                type="button"
                                onClick={onStartConsultation}
                                id="btn-hero-start-consultation"
                                className="group relative inline-flex items-center justify-center gap-3.5 rounded-2xl bg-white px-7 py-4 text-base font-bold text-nvet-dark shadow-xl shadow-black/20 transition-all duration-200 hover:scale-[1.02] hover:bg-nvet-cream hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-amber-300/40 active:scale-[0.98] sm:text-lg"
                            >
                                {/* Stethoscope Icon */}
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-nvet-primary/15 text-nvet-primary transition-transform group-hover:scale-110">
                                    <StethoscopeIcon className="h-5 w-5 text-nvet-dark" />
                                </div>

                                <span className="tracking-tight">
                                    Mulai Konsultasi Online
                                </span>

                                <ArrowRightIcon className="h-5 w-5 text-nvet-primary transition-transform duration-200 group-hover:translate-x-1" />
                            </button>

                            <span className="text-center text-xs text-nvet-cream/80 sm:text-left">
                                Mulai dalam 3 langkah mudah: Pilih Anabul •
                                Catat Gejala • Terhubung dengan Dokter
                            </span>
                        </div>
                    </div>

                    {/* Right: Modern Telehealth Highlights Card */}
                    <div className="hidden lg:col-span-4 lg:block">
                        <div className="relative space-y-4 rounded-2xl border border-white/20 bg-white/10 p-5 shadow-lg backdrop-blur-md">
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                <div className="flex items-center gap-2">
                                    <div className="relative flex h-3 w-3">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400"></span>
                                    </div>
                                    <span className="text-xs font-semibold uppercase tracking-wider text-white">
                                        Siaga Online
                                    </span>
                                </div>
                                <span className="rounded-md bg-white/10 px-2 py-0.5 text-xs font-medium text-amber-200">
                                    {onlineDoctorCount} Dokter Aktif
                                </span>
                            </div>

                            {/* Live doctor preview card */}
                            {featuredDoctor ? (
                                <div className="flex items-center gap-3.5 rounded-xl border border-white/10 bg-black/20 p-3">
                                    <img
                                        src={featuredDoctor.photo}
                                        alt={featuredDoctor.name}
                                        className="h-12 w-12 rounded-xl object-cover shadow-sm ring-2 ring-emerald-400/50"
                                        onError={(e) => {
                                            (
                                                e.target as HTMLElement
                                            ).style.display = 'none';
                                        }}
                                    />
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-xs font-bold text-white">
                                            {featuredDoctor.name}
                                        </p>
                                        <p className="truncate text-[11px] text-nvet-cream/80">
                                            {featuredDoctor.specialization}
                                        </p>
                                        <div className="mt-1 flex items-center gap-1.5">
                                            <span className="rounded border border-emerald-500/20 bg-emerald-950/40 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-300">
                                                Online Sekarang
                                            </span>
                                            <span className="text-[10px] font-medium text-amber-300">
                                                ★ {featuredDoctor.rating.toFixed(1)} ({featuredDoctor.reviewCount} ulasan)
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="rounded-xl border border-white/10 bg-black/20 p-3 text-center text-xs text-white/80">
                                    Dokter jaga siap siaga melayani telekonsultasi anabul Anda.
                                </div>
                            )}

                            {/* Trust badges */}
                            <div className="flex items-center justify-between pt-1 text-[11px] text-white/70">
                                <span>🔒 Rekam Medis Terenkripsi</span>
                                <span>💊 Kirim Obat ke Rumah</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
