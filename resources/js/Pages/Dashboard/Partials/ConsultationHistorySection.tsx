import {
    CalendarIcon,
    DocumentEmptyIcon,
    DocumentTextIcon,
} from '@/Components/Icons';
import { ConsultationHistoryItem, DischargeSummary } from '@/types/dashboard';
import { useState } from 'react';

interface ConsultationHistorySectionProps {
    history: ConsultationHistoryItem[];
    onViewSummary: (summary: DischargeSummary) => void;
}

export default function ConsultationHistorySection({
    history,
    onViewSummary,
}: ConsultationHistorySectionProps) {
    const [filter, setFilter] = useState<'Semua' | 'Selesai' | 'Tindak Lanjut'>(
        'Semua',
    );

    const filteredHistory = history.filter((item) => {
        if (filter === 'Semua') return true;
        return item.status === filter;
    });

    return (
        <div className="rounded-3xl border border-nvet-light/40 bg-white p-5 shadow-sm shadow-nvet-dark/5 sm:p-7 lg:p-8">
            {/* Header with Title and Filter Tabs */}
            <div className="flex flex-col justify-between gap-4 border-b border-stone-100 pb-5 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                    <div className="shadow-xs flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-nvet-cream text-nvet-dark">
                        <DocumentTextIcon className="h-5 w-5 text-nvet-primary" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="font-heading text-lg font-bold tracking-tight text-nvet-dark sm:text-xl">
                                Riwayat Konsultasi Terakhir
                            </h2>
                            <span className="inline-flex items-center rounded-full border border-nvet-light/40 bg-nvet-cream/80 px-2.5 py-0.5 text-xs font-semibold text-nvet-primary">
                                {history.length} Sesi
                            </span>
                        </div>
                        <p className="mt-0.5 font-sans text-xs text-stone-500">
                            Daftar sesi pemeriksaan, diagnosa klinis, resep
                            obat, dan anjuran dokter (Discharge Summary)
                        </p>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="inline-flex self-start rounded-xl bg-stone-100 p-1 sm:self-center">
                    {(['Semua', 'Selesai', 'Tindak Lanjut'] as const).map(
                        (tab) => (
                            <button
                                key={tab}
                                type="button"
                                onClick={() => setFilter(tab)}
                                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                                    filter === tab
                                        ? 'shadow-xs bg-white text-nvet-dark'
                                        : 'text-stone-500 hover:text-nvet-dark'
                                }`}
                            >
                                {tab}
                            </button>
                        ),
                    )}
                </div>
            </div>

            {/* Content List */}
            <div className="mt-5">
                {filteredHistory.length === 0 ? (
                    <div className="py-12 text-center text-stone-400">
                        <DocumentEmptyIcon className="mx-auto h-12 w-12 text-stone-300" />
                        <p className="mt-2 text-sm font-medium">
                            Tidak ada riwayat dengan filter ini
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3.5">
                        {filteredHistory.map((session) => (
                            <div
                                key={session.id}
                                className="group flex flex-col justify-between gap-4 rounded-2xl border border-stone-200/80 bg-nvet-bg/30 p-4 transition-all duration-200 hover:border-nvet-primary/40 hover:bg-white hover:shadow-md hover:shadow-nvet-dark/5 sm:p-5 lg:flex-row lg:items-center"
                            >
                                {/* Left: Date, Pet, and Doctor info */}
                                <div className="grid flex-1 grid-cols-1 items-center gap-4 md:grid-cols-12">
                                    {/* Date & Time */}
                                    <div className="md:col-span-3">
                                        <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-500">
                                            <CalendarIcon className="h-3.5 w-3.5 text-nvet-primary" />
                                            <span>{session.date}</span>
                                        </div>
                                        <span className="mt-0.5 block font-mono text-[10px] text-stone-400">
                                            ID: #
                                            {
                                                session.dischargeSummary
                                                    .referenceNumber
                                            }
                                        </span>
                                    </div>

                                    {/* Patient Pet */}
                                    <div className="flex items-center gap-3 md:col-span-4">
                                        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-nvet-light/40 bg-stone-100">
                                            <img
                                                src={session.pet.photo}
                                                alt={session.pet.name}
                                                className="h-full w-full object-cover"
                                                onError={(e) => {
                                                    const target =
                                                        e.target as HTMLImageElement;
                                                    target.onerror = null;
                                                    target.src =
                                                        'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=200&q=80';
                                                }}
                                            />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-xs text-stone-400">
                                                    Pasien:
                                                </span>
                                                <span className="truncate font-heading text-sm font-bold text-nvet-dark">
                                                    {session.pet.name}
                                                </span>
                                            </div>
                                            <p className="truncate text-xs text-stone-500">
                                                {session.pet.breed}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Attending Doctor & Suspected Issue */}
                                    <div className="min-w-0 md:col-span-5">
                                        <div className="flex items-center gap-1.5 text-xs text-stone-600">
                                            <span className="text-stone-400">
                                                Dokter:
                                            </span>
                                            <span className="truncate font-semibold text-nvet-dark">
                                                {session.doctor.name}
                                            </span>
                                        </div>
                                        <div className="mt-1 flex items-start gap-1.5">
                                            <span className="py-0.2 shrink-0 rounded bg-nvet-cream/60 px-1.5 text-[10px] font-bold uppercase text-nvet-primary">
                                                Keluhan
                                            </span>
                                            <p
                                                className="truncate text-xs font-medium text-stone-700"
                                                title={session.suspectedIssue}
                                            >
                                                {session.suspectedIssue}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Status Badges & Open Discharge Summary Button */}
                                <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-stone-100 pt-3 sm:flex-nowrap lg:justify-end lg:border-t-0 lg:pt-0">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                                session.status === 'Selesai'
                                                    ? 'border border-nvet-green/20 bg-nvet-green-light text-nvet-green'
                                                    : 'border border-amber-200 bg-amber-50 text-amber-800'
                                            }`}
                                        >
                                            <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
                                            {session.status}
                                        </span>

                                        <span className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-2 py-0.5 text-[11px] font-medium text-stone-600">
                                            💊 {session.prescriptionCount} Obat
                                        </span>
                                    </div>

                                    {/* Discharge Summary Modal Trigger Button */}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            onViewSummary(
                                                session.dischargeSummary,
                                            )
                                        }
                                        className="shadow-xs inline-flex items-center gap-2 rounded-xl border border-nvet-primary/30 bg-white px-3.5 py-2 text-xs font-bold text-nvet-dark transition-all duration-150 hover:border-nvet-primary hover:bg-nvet-cream hover:text-nvet-dark hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-nvet-primary/30 active:scale-95"
                                    >
                                        <DocumentTextIcon className="h-4 w-4 text-nvet-primary" />
                                        <span>Discharge Summary</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
