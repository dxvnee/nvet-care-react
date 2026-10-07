import ApplicationLogo from '@/Components/ApplicationLogo';
import { CloseIcon, PrinterIcon } from '@/Components/Icons';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import { DischargeSummary } from '@/types/dashboard';
import { useState } from 'react';

interface DischargeSummaryModalProps {
    show: boolean;
    onClose: () => void;
    summary: DischargeSummary | null;
}

export default function DischargeSummaryModal({
    show,
    onClose,
    summary,
}: DischargeSummaryModalProps) {
    const [isCopied, setIsCopied] = useState(false);
    const [showPharmacyAlert, setShowPharmacyAlert] = useState(false);

    if (!summary) return null;

    const handleCopyRef = () => {
        navigator.clipboard?.writeText(summary.referenceNumber);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const handleOrderPharmacy = () => {
        setShowPharmacyAlert(true);
        setTimeout(() => setShowPharmacyAlert(false), 4000);
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <Modal show={show} onClose={onClose} maxWidth="4xl">
            <div className="relative max-h-[90vh] overflow-y-auto bg-white p-6 text-nvet-text sm:p-8">
                {/* Close Button Top Right */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-5 top-5 rounded-full p-2 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-600"
                >
                    <CloseIcon className="h-5 w-5" />
                </button>

                {/* CLINICAL DOCUMENT HEADER */}
                <div className="border-b border-stone-200 pb-5">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div className="flex items-center gap-3">
                            <div className="shadow-xs flex h-12 w-12 items-center justify-center rounded-2xl border border-nvet-light/50 bg-nvet-cream p-2">
                                <ApplicationLogo className="h-full w-full object-contain" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h2 className="font-heading text-xl font-bold tracking-tight text-nvet-dark sm:text-2xl">
                                        NVet Care Telemedicine
                                    </h2>
                                    <span className="rounded-md border border-nvet-green/20 bg-nvet-green-light px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-nvet-green">
                                        Dokumen Resmi
                                    </span>
                                </div>
                                <p className="font-sans text-xs text-stone-500">
                                    Discharge Summary & Resep Obat Elektronik
                                    (e-Prescription)
                                </p>
                            </div>
                        </div>

                        {/* Document Reference Info */}
                        <div className="text-left font-sans sm:text-right">
                            <div className="flex items-center gap-1.5 text-xs text-stone-500 sm:justify-end">
                                <span>No. Rekam:</span>
                                <span className="font-mono font-bold text-nvet-dark">
                                    #{summary.referenceNumber}
                                </span>
                                <button
                                    type="button"
                                    onClick={handleCopyRef}
                                    title="Salin Nomor Rekam"
                                    className="text-stone-400 transition-colors hover:text-nvet-primary"
                                >
                                    {isCopied ? '✓' : '📋'}
                                </button>
                            </div>
                            <p className="mt-0.5 text-xs text-stone-500">
                                Tanggal:{' '}
                                <strong className="text-stone-700">
                                    {summary.date} • {summary.time}
                                </strong>
                            </p>
                        </div>
                    </div>
                </div>

                {/* PHARMACY ALERT NOTIFICATION */}
                {showPharmacyAlert && (
                    <div className="animate-fadeIn mt-4 flex items-center justify-between gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-medium text-emerald-900">
                        <div className="flex items-center gap-2.5">
                            <span className="text-lg">💊</span>
                            <div>
                                <p className="font-bold">
                                    Permintaan Tebus Resep Berhasil Dikirim!
                                </p>
                                <p className="text-emerald-700">
                                    Apotek NVet Care Pusat sedang menyiapkan
                                    paket obat anabul untuk dikirim ke alamatmu.
                                </p>
                            </div>
                        </div>
                        <span className="font-mono text-[11px] text-emerald-600">
                            Estimasi 1-2 Jam
                        </span>
                    </div>
                )}

                {/* PATIENT & ATTENDING VET CARDS */}
                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Patient Info Card */}
                    <div className="space-y-3 rounded-2xl border border-nvet-light/50 bg-nvet-bg/40 p-4">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-nvet-primary">
                                Data Pasien Anabul
                            </span>
                            <span className="text-xs font-semibold text-stone-500">
                                {summary.petSpecies}
                            </span>
                        </div>

                        <div className="flex items-center gap-3.5">
                            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-stone-200">
                                <img
                                    src={summary.petPhoto}
                                    alt={summary.petName}
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
                                <h3 className="truncate font-heading text-lg font-bold text-nvet-dark">
                                    {summary.petName}
                                </h3>
                                <p className="text-xs text-stone-600">
                                    Ras: {summary.petBreed}
                                </p>
                                <div className="mt-1 flex items-center gap-2 text-[11px] text-stone-500">
                                    <span>Usia: {summary.petAge}</span>
                                    <span>•</span>
                                    <span>Berat: {summary.petWeight}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Attending Vet Info Card */}
                    <div className="space-y-3 rounded-2xl border border-stone-200 bg-stone-50/60 p-4">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-600">
                                Dokter Hewan Penanggung Jawab
                            </span>
                            <span className="rounded-md bg-emerald-100/60 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                                SIP Terverifikasi
                            </span>
                        </div>

                        <div className="flex items-center gap-3.5">
                            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-stone-200">
                                <img
                                    src={summary.doctorPhoto}
                                    alt={summary.doctorName}
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                        const target =
                                            e.target as HTMLImageElement;
                                        target.onerror = null;
                                        target.src =
                                            'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80';
                                    }}
                                />
                            </div>
                            <div className="min-w-0">
                                <h3 className="truncate font-heading text-base font-bold text-nvet-dark">
                                    {summary.doctorName}
                                </h3>
                                <p className="mt-0.5 font-mono text-xs text-stone-500">
                                    No. SIP: {summary.doctorSip}
                                </p>
                                <p className="mt-0.5 text-[11px] text-stone-400">
                                    Departemen Medis & Farmasi NVet Care
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CLINICAL SUMMARY & DIAGNOSIS */}
                <div className="mt-6 space-y-4 rounded-2xl border border-stone-200 bg-white p-5">
                    <h3 className="flex items-center gap-2 font-heading text-sm font-bold text-nvet-dark sm:text-base">
                        <span>🩺</span>
                        <span>Hasil Anamnesis & Diagnosa Klinis</span>
                    </h3>

                    <div className="grid grid-cols-1 gap-4 font-sans text-xs md:grid-cols-2">
                        <div>
                            <span className="mb-1 block font-semibold text-stone-500">
                                Keluhan Utama (Chief Complaint):
                            </span>
                            <p className="border-stone-150 rounded-xl border bg-stone-50 p-3 leading-relaxed text-stone-800">
                                {summary.chiefComplaint}
                            </p>
                        </div>

                        <div>
                            <span className="mb-1 block font-semibold text-stone-500">
                                Temuan Klinis & Observasi:
                            </span>
                            <p className="border-stone-150 rounded-xl border bg-stone-50 p-3 leading-relaxed text-stone-800">
                                {summary.clinicalFindings}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 pt-2">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-stone-500">
                                Diagnosa Kerja:
                            </span>
                            <span className="rounded-lg border border-nvet-light/40 bg-nvet-cream/60 px-2.5 py-1 font-heading text-sm font-bold text-nvet-dark">
                                {summary.diagnosis}
                            </span>
                        </div>

                        <div className="flex items-center gap-3 text-xs">
                            <span className="text-stone-500">
                                Tingkat Keparahan:{' '}
                                <strong className="text-amber-700">
                                    {summary.severity}
                                </strong>
                            </span>
                            <span className="text-stone-300">•</span>
                            <span className="text-stone-500">
                                Prognosis:{' '}
                                <strong className="text-emerald-700">
                                    {summary.prognosis}
                                </strong>
                            </span>
                        </div>
                    </div>
                </div>

                {/* DIGITAL PRESCRIPTION (E-PRESCRIPTION) */}
                <div className="mt-6 space-y-4 rounded-2xl border border-nvet-light/50 bg-white p-5">
                    <div className="flex items-center justify-between">
                        <h3 className="flex items-center gap-2 font-heading text-sm font-bold text-nvet-dark sm:text-base">
                            <span>💊</span>
                            <span>
                                Rangkuman Resep Obat Digital (
                                {summary.prescriptions.length} Item)
                            </span>
                        </h3>
                        <span className="font-sans text-xs text-stone-400">
                            Resmi NVet Pharmacy
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left font-sans text-xs">
                            <thead>
                                <tr className="border-b border-stone-200 bg-stone-50 text-[11px] uppercase tracking-wider text-stone-500">
                                    <th className="px-3 py-2.5 font-bold">
                                        Nama Obat & Sediaan
                                    </th>
                                    <th className="px-3 py-2.5 font-bold">
                                        Dosis
                                    </th>
                                    <th className="px-3 py-2.5 font-bold">
                                        Frekuensi
                                    </th>
                                    <th className="px-3 py-2.5 font-bold">
                                        Durasi
                                    </th>
                                    <th className="px-3 py-2.5 font-bold">
                                        Instruksi & Indikasi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-100">
                                {summary.prescriptions.map((item, index) => (
                                    <tr
                                        key={index}
                                        className="transition-colors hover:bg-nvet-bg/30"
                                    >
                                        <td className="px-3 py-3 font-bold text-nvet-dark">
                                            {item.name}
                                        </td>
                                        <td className="px-3 py-3 font-medium text-stone-700">
                                            {item.dosage}
                                        </td>
                                        <td className="px-3 py-3 font-medium text-stone-700">
                                            {item.frequency}
                                        </td>
                                        <td className="px-3 py-3 text-stone-600">
                                            {item.duration}
                                        </td>
                                        <td className="px-3 py-3 text-stone-600">
                                            <div>{item.instructions}</div>
                                            {item.notes && (
                                                <span className="mt-0.5 block text-[10px] font-medium text-nvet-primary">
                                                    Catatan: {item.notes}
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* DISCHARGE INSTRUCTIONS & CARE GUIDELINES */}
                <div className="mt-6 space-y-4 rounded-2xl border border-stone-200 bg-stone-50/60 p-5">
                    <h3 className="flex items-center gap-2 font-heading text-sm font-bold text-nvet-dark sm:text-base">
                        <span>📋</span>
                        <span>
                            Anjuran & Instruksi Perawatan Dokter (Discharge
                            Instructions)
                        </span>
                    </h3>

                    <div className="grid grid-cols-1 gap-4 font-sans text-xs sm:grid-cols-2">
                        {/* Diet / Nutrisi */}
                        <div className="shadow-xs rounded-xl border border-stone-200/80 bg-white p-3.5">
                            <div className="mb-1 flex items-center gap-1.5 font-bold text-nvet-dark">
                                <span>🥣</span>
                                <span>Manajemen Pakan & Diet:</span>
                            </div>
                            <p className="leading-relaxed text-stone-600">
                                {summary.dischargeInstructions.diet}
                            </p>
                        </div>

                        {/* Hidrasi */}
                        <div className="shadow-xs rounded-xl border border-stone-200/80 bg-white p-3.5">
                            <div className="mb-1 flex items-center gap-1.5 font-bold text-nvet-dark">
                                <span>💧</span>
                                <span>Hidrasi & Asupan Cairan:</span>
                            </div>
                            <p className="leading-relaxed text-stone-600">
                                {summary.dischargeInstructions.hydration}
                            </p>
                        </div>

                        {/* Red Flags / Tanda Bahaya */}
                        <div className="shadow-xs rounded-xl border border-rose-200/80 bg-rose-50/70 p-3.5 sm:col-span-2">
                            <div className="mb-1 flex items-center gap-1.5 font-bold text-rose-800">
                                <span>⚠️</span>
                                <span>
                                    Tanda Bahaya (Segera Hubungi IGD / Bawa ke
                                    Klinik):
                                </span>
                            </div>
                            <p className="leading-relaxed text-rose-700">
                                {summary.dischargeInstructions.warningSigns}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-stone-200 pt-2 text-xs">
                        <span className="text-stone-500">
                            Jadwal Kontrol Ulang:
                        </span>
                        <span className="rounded-lg bg-nvet-cream/60 px-3 py-1 font-bold text-nvet-primary">
                            📅 {summary.dischargeInstructions.followUpDate}
                        </span>
                    </div>
                </div>

                {/* MODAL ACTIONS FOOTER */}
                <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-stone-200 pt-5 sm:flex-row">
                    <div className="flex w-full items-center gap-2 sm:w-auto">
                        <SecondaryButton
                            onClick={handlePrint}
                            className="w-full justify-center gap-1.5 sm:w-auto"
                        >
                            <PrinterIcon className="h-4 w-4 text-stone-600" />
                            <span>Unduh / Cetak Summary (PDF)</span>
                        </SecondaryButton>
                    </div>

                    <div className="flex w-full items-center gap-2.5 sm:w-auto">
                        <button
                            type="button"
                            onClick={handleOrderPharmacy}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-nvet-green px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all duration-150 hover:bg-nvet-green-hover focus:outline-none focus:ring-2 focus:ring-nvet-green/30 active:scale-95 sm:w-auto sm:text-sm"
                        >
                            <span>💊 Tebus Resep ke Apotek NVet</span>
                        </button>

                        <SecondaryButton
                            onClick={onClose}
                            className="w-full justify-center sm:w-auto"
                        >
                            Tutup
                        </SecondaryButton>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
