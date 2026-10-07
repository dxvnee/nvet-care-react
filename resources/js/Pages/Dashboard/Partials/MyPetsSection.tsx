import { ChatBubbleIcon, PlusIcon } from '@/Components/Icons';
import { Pet } from '@/types/dashboard';

interface MyPetsSectionProps {
    pets: Pet[];
    onAddPet: () => void;
    onConsultPet: (pet: Pet) => void;
}

export default function MyPetsSection({
    pets,
    onAddPet,
    onConsultPet,
}: MyPetsSectionProps) {
    const getSpeciesEmoji = (species: Pet['species']) => {
        switch (species) {
            case 'Kucing':
                return '🐱';
            case 'Anjing':
                return '🐶';
            case 'Kelinci':
                return '🐰';
            case 'Burung':
                return '🦜';
            default:
                return '🐾';
        }
    };

    return (
        <div className="flex h-full flex-col rounded-3xl border border-nvet-light/40 bg-white p-5 shadow-sm shadow-nvet-dark/5 sm:p-6">
            {/* Section Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4">
                <div className="flex items-center gap-2.5">
                    <div className="shadow-xs flex h-9 w-9 items-center justify-center rounded-xl bg-nvet-cream/80 text-nvet-dark">
                        <span className="text-lg">🐾</span>
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="font-heading text-lg font-bold tracking-tight text-nvet-dark sm:text-xl">
                                Anabul Saya
                            </h2>
                            <span className="inline-flex items-center rounded-full border border-nvet-light/50 bg-nvet-cream/80 px-2.5 py-0.5 text-xs font-semibold text-nvet-primary">
                                {pets.length} Terdaftar
                            </span>
                        </div>
                        <p className="font-sans text-xs text-stone-500">
                            Pilih anabul untuk konsultasi cepat
                        </p>
                    </div>
                </div>

                {/* Quick Add Pet Button */}
                <button
                    type="button"
                    onClick={onAddPet}
                    id="btn-add-pet-header"
                    className="hover:shadow-xs inline-flex items-center gap-1.5 rounded-xl border border-nvet-primary/30 bg-nvet-cream/50 px-3.5 py-2 text-xs font-semibold text-nvet-dark transition-all duration-150 hover:border-nvet-primary hover:bg-nvet-cream focus:outline-none focus:ring-2 focus:ring-nvet-primary/30 active:scale-95 sm:text-sm"
                >
                    <PlusIcon className="h-4 w-4 text-nvet-primary" />
                    <span>+ Tambah Anabul</span>
                </button>
            </div>

            {/* Pets List / Cards */}
            <div className="mt-4 flex-1">
                {pets.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-nvet-light/60 bg-nvet-bg/50 p-8 text-center">
                        <span className="mb-2 text-4xl">🐶🐱</span>
                        <h3 className="font-heading text-base font-semibold text-nvet-dark">
                            Belum Ada Anabul Terdaftar
                        </h3>
                        <p className="mt-1 max-w-xs text-xs text-stone-500">
                            Daftarkan profil anabul kamu agar rekam medis dan
                            resep obat tersimpan rapi.
                        </p>
                        <button
                            type="button"
                            onClick={onAddPet}
                            className="mt-4 rounded-xl bg-nvet-primary px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-nvet-dark"
                        >
                            + Daftarkan Sekarang
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                        {pets.map((pet) => (
                            <div
                                key={pet.id}
                                className="group relative flex flex-col justify-between rounded-2xl border border-stone-200/80 bg-white p-4 transition-all duration-200 hover:border-nvet-primary/50 hover:shadow-md hover:shadow-nvet-dark/5"
                            >
                                <div className="flex items-start gap-3.5">
                                    {/* Pet Image / Avatar */}
                                    <div className="relative shrink-0">
                                        <div className="shadow-xs h-16 w-16 overflow-hidden rounded-2xl border border-nvet-light/40 bg-stone-100">
                                            <img
                                                src={pet.photo}
                                                alt={pet.name}
                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                onError={(e) => {
                                                    const target =
                                                        e.target as HTMLImageElement;
                                                    target.onerror = null;
                                                    target.src =
                                                        'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=200&q=80';
                                                }}
                                            />
                                        </div>
                                        {/* Species badge */}
                                        <span className="shadow-xs absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border border-stone-100 bg-white text-xs">
                                            {getSpeciesEmoji(pet.species)}
                                        </span>
                                    </div>

                                    {/* Pet Info */}
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center justify-between">
                                            <h3 className="truncate font-heading text-base font-bold text-nvet-dark transition-colors group-hover:text-nvet-primary">
                                                {pet.name}
                                            </h3>
                                            <span className="text-[11px] font-medium text-stone-400">
                                                {pet.gender === 'Jantan'
                                                    ? '♂ Jantan'
                                                    : '♀ Betina'}
                                            </span>
                                        </div>

                                        <p className="mt-0.5 truncate text-xs font-medium text-stone-600">
                                            {pet.breed}
                                        </p>

                                        {/* Stats: Age & Weight */}
                                        <div className="mt-2 flex items-center gap-2 font-sans text-[11px] text-stone-500">
                                            <span className="inline-flex items-center gap-1 rounded-md bg-stone-100 px-2 py-0.5">
                                                ⏳ {pet.age}
                                            </span>
                                            <span className="inline-flex items-center gap-1 rounded-md bg-stone-100 px-2 py-0.5">
                                                ⚖️ {pet.weight}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Status Tag & Consult Action */}
                                <div className="mt-3.5 flex items-center justify-between gap-2 border-t border-stone-100 pt-3">
                                    {pet.statusBadge ? (
                                        <span
                                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                                                pet.statusBadge.color ===
                                                'green'
                                                    ? 'bg-nvet-green-light text-nvet-green'
                                                    : pet.statusBadge.color ===
                                                        'amber'
                                                      ? 'bg-amber-50 text-amber-700'
                                                      : 'bg-blue-50 text-blue-700'
                                            }`}
                                        >
                                            <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
                                            {pet.statusBadge.text}
                                        </span>
                                    ) : (
                                        <span className="text-[10px] text-stone-400">
                                            Siap Konsultasi
                                        </span>
                                    )}

                                    {/* Action button */}
                                    <button
                                        type="button"
                                        onClick={() => onConsultPet(pet)}
                                        className="shadow-xs inline-flex items-center gap-1.5 rounded-xl bg-nvet-dark px-3 py-1.5 text-xs font-semibold text-white transition-all duration-150 hover:bg-nvet-primary focus:outline-none focus:ring-2 focus:ring-nvet-primary/30 active:scale-95"
                                    >
                                        <ChatBubbleIcon className="h-3.5 w-3.5" />
                                        <span>Konsultasikan</span>
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
