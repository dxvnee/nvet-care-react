import { CloseIcon } from '@/Components/Icons';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { Pet } from '@/types/dashboard';
import { ChangeEvent, FormEvent, useState } from 'react';

interface AddPetModalProps {
    show: boolean;
    onClose: () => void;
    onAddPet: (newPet: Pet) => void;
}

const DEFAULT_AVATARS: Record<Pet['species'], string> = {
    Kucing: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80',
    Anjing: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80',
    Kelinci:
        'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=400&q=80',
    Burung: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=400&q=80',
    Lainnya:
        'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=400&q=80',
};

export default function AddPetModal({
    show,
    onClose,
    onAddPet,
}: AddPetModalProps) {
    const [name, setName] = useState('');
    const [species, setSpecies] = useState<Pet['species']>('Kucing');
    const [breed, setBreed] = useState('');
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [gender, setGender] = useState<'Jantan' | 'Betina'>('Jantan');
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            setErrorMessage('Nama anabul wajib diisi.');
            return;
        }

        if (!breed.trim()) {
            setErrorMessage('Ras / jenis anabul wajib diisi.');
            return;
        }

        const newPet: Pet = {
            id: 'pet-' + Date.now(),
            name: name.trim(),
            species,
            breed: breed.trim(),
            age: age.trim() || '1 Tahun',
            weight: weight.trim() ? `${weight.trim()} kg` : '3.5 kg',
            gender,
            photo: photoPreview || DEFAULT_AVATARS[species],
            statusBadge: {
                text: 'Baru Didaftarkan',
                color: 'blue',
            },
        };

        onAddPet(newPet);

        // Reset state
        setName('');
        setBreed('');
        setAge('');
        setWeight('');
        setPhotoPreview(null);
        setErrorMessage(null);
        onClose();
    };

    return (
        <Modal show={show} onClose={onClose} maxWidth="lg">
            <div className="relative bg-white p-6 text-nvet-text sm:p-8">
                {/* Close Button Top Right */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-5 top-5 rounded-full p-2 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-600"
                >
                    <CloseIcon className="h-5 w-5" />
                </button>

                <div className="border-b border-stone-100 pb-4">
                    <h2 className="font-heading text-xl font-bold tracking-tight text-nvet-dark">
                        + Tambah Profil Anabul Baru
                    </h2>
                    <p className="mt-1 font-sans text-xs text-stone-500">
                        Lengkapi profil hewan peliharaanmu untuk memudahkan
                        pencatatan rekam medis dan resep.
                    </p>
                </div>

                {errorMessage && (
                    <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-semibold text-rose-700">
                        {errorMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                    {/* Spesies Selection */}
                    <div>
                        <InputLabel value="Spesies Hewan" />
                        <div className="mt-1.5 grid grid-cols-4 gap-2">
                            {(
                                [
                                    'Kucing',
                                    'Anjing',
                                    'Kelinci',
                                    'Lainnya',
                                ] as const
                            ).map((sp) => (
                                <button
                                    key={sp}
                                    type="button"
                                    onClick={() => setSpecies(sp)}
                                    className={`rounded-xl border px-2 py-2 text-xs font-semibold transition-all ${
                                        species === sp
                                            ? 'border-nvet-primary bg-nvet-cream/60 text-nvet-dark ring-2 ring-nvet-primary/20'
                                            : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                                    }`}
                                >
                                    {sp === 'Kucing' && '🐱 Kucing'}
                                    {sp === 'Anjing' && '🐶 Anjing'}
                                    {sp === 'Kelinci' && '🐰 Kelinci'}
                                    {sp === 'Lainnya' && '🐾 Lainnya'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Nama Anabul */}
                    <div>
                        <InputLabel htmlFor="pet-name" value="Nama Anabul *" />
                        <TextInput
                            id="pet-name"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                if (errorMessage) setErrorMessage(null);
                            }}
                            placeholder="Contoh: Milo, Luna, Oreo..."
                            className="mt-1"
                            required
                        />
                    </div>

                    {/* Ras & Gender */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div>
                            <InputLabel
                                htmlFor="pet-breed"
                                value="Ras / Jenis *"
                            />
                            <TextInput
                                id="pet-breed"
                                value={breed}
                                onChange={(e) => {
                                    setBreed(e.target.value);
                                    if (errorMessage) setErrorMessage(null);
                                }}
                                placeholder="Contoh: Persia, Golden, Domestik"
                                className="mt-1"
                                required
                            />
                        </div>

                        <div>
                            <InputLabel value="Jenis Kelamin" />
                            <div className="mt-1 grid grid-cols-2 gap-2">
                                {(['Jantan', 'Betina'] as const).map((g) => (
                                    <button
                                        key={g}
                                        type="button"
                                        onClick={() => setGender(g)}
                                        className={`rounded-xl border py-2 text-xs font-semibold transition-all ${
                                            gender === g
                                                ? 'border-nvet-primary bg-nvet-cream/60 text-nvet-dark ring-2 ring-nvet-primary/20'
                                                : 'border-stone-200 bg-white text-stone-600'
                                        }`}
                                    >
                                        {g === 'Jantan'
                                            ? '♂ Jantan'
                                            : '♀ Betina'}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Usia & Berat Badan */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div>
                            <InputLabel
                                htmlFor="pet-age"
                                value="Perkiraan Usia"
                            />
                            <TextInput
                                id="pet-age"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                placeholder="Contoh: 1 Thn 6 Bln"
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="pet-weight"
                                value="Berat Badan (kg)"
                            />
                            <TextInput
                                id="pet-weight"
                                type="number"
                                step="0.1"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                placeholder="Contoh: 4.2"
                                className="mt-1"
                            />
                        </div>
                    </div>

                    {/* Foto Anabul */}
                    <div>
                        <InputLabel value="Foto Anabul (Opsional)" />
                        <div className="mt-1.5 flex items-center gap-4">
                            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-stone-200 bg-stone-100">
                                <img
                                    src={
                                        photoPreview || DEFAULT_AVATARS[species]
                                    }
                                    alt="Preview"
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            <label className="cursor-pointer rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2 text-xs font-semibold text-stone-700 transition-colors hover:bg-stone-100">
                                <span>Pilih Foto dari Galeri</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhotoChange}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-end gap-3 border-t border-stone-100 pt-4">
                        <SecondaryButton onClick={onClose}>
                            Batal
                        </SecondaryButton>
                        <PrimaryButton type="submit">
                            Simpan Anabul
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
