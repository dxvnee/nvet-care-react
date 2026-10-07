import {
    ArrowRightIcon,
    CameraUploadIcon,
    CloseIcon,
    ExclamationCircleIcon,
} from '@/Components/Icons';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { AnamnesisSubmission, Doctor, Pet } from '@/types/dashboard';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

interface AnamnesisModalProps {
    show: boolean;
    onClose: () => void;
    pets: Pet[];
    doctors: Doctor[];
    initialSelectedPetId?: string;
    initialSelectedDoctorId?: string;
    onStartConsultationChat: (submission: AnamnesisSubmission) => void;
    onOpenAddPet: () => void;
}

const COMMON_SYMPTOMS = [
    { id: 'muntah', label: '🤢 Muntah' },
    { id: 'diare', label: '💩 Diare / Mencret' },
    { id: 'nafsu_makan', label: '🍽️ Hilang Nafsu Makan' },
    { id: 'gatal', label: '🐾 Gatal / Garuk Berlebih' },
    { id: 'lemas', label: '😴 Lemas & Tidak Aktif' },
    { id: 'bersin_batuk', label: '🤧 Bersin / Batuk / Flu' },
    { id: 'mata_berair', label: '👁️ Mata Merah / Berair' },
    { id: 'luka_fisik', label: '🩹 Luka / Pincang' },
    { id: 'kencing', label: '🚽 Masalah Buang Air' },
    { id: 'bau_mulut', label: '🦷 Bau Mulut / Liur Berlebih' },
    { id: 'lainnya', label: '❓ Keluhan Lain' },
];

const DURATION_OPTIONS = [
    { value: '< 24 Jam', label: '< 24 Jam (Baru mulai hari ini)' },
    { value: '1 - 3 Hari', label: '1 - 3 Hari' },
    { value: '4 - 7 Hari', label: '4 - 7 Hari' },
    { value: '> 1 Minggu', label: '> 1 Minggu (Kronis)' },
];

export default function AnamnesisModal({
    show,
    onClose,
    pets,
    doctors,
    initialSelectedPetId,
    initialSelectedDoctorId,
    onStartConsultationChat,
    onOpenAddPet,
}: AnamnesisModalProps) {
    const [selectedPetId, setSelectedPetId] = useState<string>('');
    const [selectedDoctorId, setSelectedDoctorId] = useState<string>('');
    const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
    const [duration, setDuration] = useState<string>('1 - 3 Hari');
    const [notes, setNotes] = useState<string>('');
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Sync initial selection when opened
    useEffect(() => {
        if (show) {
            setSelectedPetId(initialSelectedPetId || (pets[0]?.id ?? ''));
            setSelectedDoctorId(
                initialSelectedDoctorId || (doctors[0]?.id ?? ''),
            );
            setErrorMessage(null);
        }
    }, [show, initialSelectedPetId, initialSelectedDoctorId, pets, doctors]);

    const handleToggleSymptom = (label: string) => {
        setSelectedSymptoms((prev) =>
            prev.includes(label)
                ? prev.filter((item) => item !== label)
                : [...prev, label],
        );
        if (errorMessage) setErrorMessage(null);
    };

    const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemovePhoto = () => {
        setPhotoPreview(null);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!selectedPetId) {
            setErrorMessage('Silakan pilih anabul yang akan dikonsultasikan.');
            return;
        }

        if (selectedSymptoms.length === 0 && !notes.trim()) {
            setErrorMessage(
                'Pilih minimal satu gejala atau tulis deskripsi keluhan anabul.',
            );
            return;
        }

        const submission: AnamnesisSubmission = {
            petId: selectedPetId,
            doctorId: selectedDoctorId || (doctors[0]?.id ?? ''),
            symptoms: selectedSymptoms,
            duration,
            notes,
            hasAttachedPhoto: !!photoPreview,
            photoPreviewUrl: photoPreview || undefined,
        };

        onStartConsultationChat(submission);
    };

    const selectedDoctor =
        doctors.find((d) => d.id === selectedDoctorId) || doctors[0];

    return (
        <Modal show={show} onClose={onClose} maxWidth="3xl">
            <div className="relative max-h-[90vh] overflow-y-auto bg-white p-6 text-nvet-text sm:p-8">
                {/* Close Button Top Right */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-5 top-5 rounded-full p-2 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-600"
                >
                    <CloseIcon className="h-5 w-5" />
                </button>

                {/* Modal Header */}
                <div className="border-b border-stone-100 pb-5">
                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center rounded-md border border-nvet-green/20 bg-nvet-green-light px-2.5 py-0.5 text-xs font-semibold text-nvet-green">
                            Langkah 1 dari 2
                        </span>
                        <span className="text-xs text-stone-400">
                            • Form Anamnesis Pra-Konsultasi
                        </span>
                    </div>

                    <h2 className="mt-1 font-heading text-xl font-bold tracking-tight text-nvet-dark sm:text-2xl">
                        Formulir Gejala Awal Anabul
                    </h2>
                    <p className="mt-1 font-sans text-xs text-stone-500 sm:text-sm">
                        Bantu dokter memahami kondisi hewan kesayanganmu lebih
                        cepat dan akurat sebelum ruang obrolan dimulai.
                    </p>
                </div>

                {errorMessage && (
                    <div className="mt-4 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-semibold text-rose-700">
                        <ExclamationCircleIcon className="h-4 w-4 shrink-0 text-rose-500" />
                        <span>{errorMessage}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                    {/* SECTION 1: PILIH ANABUL */}
                    <div>
                        <div className="mb-3 flex items-center justify-between">
                            <label className="block text-sm font-bold text-nvet-dark">
                                1. Pilih Anabul yang Diperiksa{' '}
                                <span className="text-rose-500">*</span>
                            </label>
                            <button
                                type="button"
                                onClick={onOpenAddPet}
                                className="text-xs font-semibold text-nvet-primary transition-colors hover:text-nvet-dark"
                            >
                                + Daftarkan Anabul Baru
                            </button>
                        </div>

                        {pets.length === 0 ? (
                            <div className="rounded-2xl border border-dashed border-stone-300 p-4 text-center">
                                <p className="text-xs text-stone-500">
                                    Belum ada anabul terdaftar.
                                </p>
                                <button
                                    type="button"
                                    onClick={onOpenAddPet}
                                    className="mt-2 text-xs font-bold text-nvet-primary underline"
                                >
                                    + Tambah Anabul Sekarang
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                {pets.map((pet) => {
                                    const isSelected = selectedPetId === pet.id;
                                    return (
                                        <button
                                            key={pet.id}
                                            type="button"
                                            onClick={() => {
                                                setSelectedPetId(pet.id);
                                                if (errorMessage)
                                                    setErrorMessage(null);
                                            }}
                                            className={`flex items-center gap-3 rounded-2xl border p-3 text-left transition-all ${
                                                isSelected
                                                    ? 'shadow-xs border-nvet-primary bg-nvet-cream/40 ring-2 ring-nvet-primary/30'
                                                    : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50'
                                            }`}
                                        >
                                            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-stone-200">
                                                <img
                                                    src={pet.photo}
                                                    alt={pet.name}
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

                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center justify-between">
                                                    <span className="truncate font-heading text-sm font-bold text-nvet-dark">
                                                        {pet.name}
                                                    </span>
                                                    {isSelected && (
                                                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-nvet-primary text-[10px] text-white">
                                                            ✓
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="truncate text-xs text-stone-500">
                                                    {pet.breed}
                                                </p>
                                                <p className="text-[11px] text-stone-400">
                                                    {pet.age} • {pet.weight}
                                                </p>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* SECTION 2: DOKTER JAGA YANG AKAN MENANGANI */}
                    <div>
                        <label className="mb-2 block text-sm font-bold text-nvet-dark">
                            2. Dokter yang Menangani
                        </label>
                        <div className="flex items-center justify-between gap-3 rounded-2xl border border-nvet-light/50 bg-nvet-bg/40 p-3.5">
                            <div className="flex min-w-0 items-center gap-3">
                                <div className="relative shrink-0">
                                    <div className="h-11 w-11 overflow-hidden rounded-xl border border-stone-200">
                                        <img
                                            src={selectedDoctor?.photo}
                                            alt={selectedDoctor?.name}
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
                                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white"></span>
                                </div>
                                <div className="min-w-0">
                                    <p className="truncate font-heading text-sm font-bold text-nvet-dark">
                                        {selectedDoctor?.name}
                                    </p>
                                    <p className="truncate text-xs text-stone-500">
                                        {selectedDoctor?.specialization} •{' '}
                                        {selectedDoctor?.clinic}
                                    </p>
                                </div>
                            </div>
                            <span className="shrink-0 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                                🟢 Siaga Menjawab
                            </span>
                        </div>
                    </div>

                    {/* SECTION 3: PILIHAN GEJALA UTAMA */}
                    <div>
                        <div className="mb-2 flex items-center justify-between">
                            <label className="block text-sm font-bold text-nvet-dark">
                                3. Gejala Utama yang Terlihat{' '}
                                <span className="text-rose-500">*</span>
                            </label>
                            <span className="text-xs text-stone-400">
                                Pilih satu atau lebih
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {COMMON_SYMPTOMS.map((symptom) => {
                                const isChecked = selectedSymptoms.includes(
                                    symptom.label,
                                );
                                return (
                                    <button
                                        key={symptom.id}
                                        type="button"
                                        onClick={() =>
                                            handleToggleSymptom(symptom.label)
                                        }
                                        className={`rounded-xl border px-3 py-2 text-xs font-semibold transition-all duration-150 ${
                                            isChecked
                                                ? 'shadow-xs scale-102 border-nvet-primary bg-nvet-primary text-white'
                                                : 'border-stone-200 bg-white text-stone-700 hover:border-nvet-primary/50 hover:bg-stone-50'
                                        }`}
                                    >
                                        {symptom.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* SECTION 4: DURASI GEJALA */}
                    <div>
                        <label className="mb-2 block text-sm font-bold text-nvet-dark">
                            4. Berapa Lama Gejala Berlangsung?
                        </label>
                        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                            {DURATION_OPTIONS.map((opt) => (
                                <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => setDuration(opt.value)}
                                    className={`rounded-xl border p-2.5 text-center text-xs font-semibold transition-all ${
                                        duration === opt.value
                                            ? 'border-nvet-primary bg-nvet-cream/60 text-nvet-dark ring-2 ring-nvet-primary/20'
                                            : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                                    }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* SECTION 5: DESKRIPSI RINCI KELUHAN */}
                    <div>
                        <label className="mb-1 block text-sm font-bold text-nvet-dark">
                            5. Penjelasan Lebih Rinci Mengenai Keluhan
                            (Opsional)
                        </label>
                        <p className="mb-2 font-sans text-xs text-stone-500">
                            Sebutkan makanan terakhir, perubahan perilaku,
                            frekuensi buang air, atau obat yang sudah diberikan.
                        </p>
                        <textarea
                            rows={3}
                            value={notes}
                            onChange={(e) => {
                                setNotes(e.target.value);
                                if (errorMessage) setErrorMessage(null);
                            }}
                            placeholder="Contoh: Milo sudah diare cair 3x sejak pagi, lemas dan tidak mau makan wet food favoritnya..."
                            className="block w-full rounded-2xl border-stone-200 bg-white px-3.5 py-2.5 text-sm text-nvet-text placeholder:text-stone-400 focus:border-nvet-primary focus:ring-2 focus:ring-nvet-primary/20"
                        />
                    </div>

                    {/* SECTION 6: UNGGAH FOTO GEJALA / KONDISI */}
                    <div>
                        <label className="mb-1 block text-sm font-bold text-nvet-dark">
                            6. Unggah Foto Kondisi Anabul (Opsional)
                        </label>
                        <p className="mb-2 text-xs text-stone-500">
                            Foto mata, luka, feses, atau kondisi fisik membantu
                            dokter mendiagnosa lebih tepat.
                        </p>

                        {photoPreview ? (
                            <div className="relative inline-block overflow-hidden rounded-2xl border border-stone-200">
                                <img
                                    src={photoPreview}
                                    alt="Preview Gejala"
                                    className="h-32 w-48 object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={handleRemovePhoto}
                                    className="absolute right-2 top-2 rounded-full bg-black/60 p-1 text-white transition-colors hover:bg-black"
                                >
                                    <CloseIcon className="h-4 w-4" />
                                </button>
                            </div>
                        ) : (
                            <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-stone-300 p-5 text-center transition-all hover:border-nvet-primary hover:bg-nvet-cream/20">
                                <CameraUploadIcon className="h-8 w-8 text-stone-400" />
                                <span className="mt-2 text-xs font-semibold text-nvet-dark">
                                    Klik untuk unggah foto gejala
                                </span>
                                <span className="text-[11px] text-stone-400">
                                    Format JPG, PNG, atau WEBP (maks. 5MB)
                                </span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhotoUpload}
                                    className="hidden"
                                />
                            </label>
                        )}
                    </div>

                    {/* MODAL ACTIONS FOOTER */}
                    <div className="flex flex-col items-center justify-between gap-3 border-t border-stone-100 pt-5 sm:flex-row">
                        <SecondaryButton
                            onClick={onClose}
                            className="w-full justify-center sm:w-auto"
                        >
                            Batal
                        </SecondaryButton>

                        <PrimaryButton
                            type="submit"
                            id="btn-submit-anamnesis"
                            className="flex w-full items-center justify-center gap-2 px-6 py-3 text-sm font-bold sm:w-auto"
                        >
                            <span>Lanjut ke Ruang Konsultasi</span>
                            <ArrowRightIcon className="h-4 w-4" />
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
