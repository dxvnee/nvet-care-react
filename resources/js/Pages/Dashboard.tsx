import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    AnamnesisSubmission,
    ConsultationHistoryItem,
    DischargeSummary,
    Doctor,
    Pet,
} from '@/types/dashboard';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import ActiveConsultationRoomModal from './Dashboard/Partials/ActiveConsultationRoomModal';
import AddPetModal from './Dashboard/Partials/AddPetModal';
import AnamnesisModal from './Dashboard/Partials/AnamnesisModal';
import ConsultationHistorySection from './Dashboard/Partials/ConsultationHistorySection';
import DischargeSummaryModal from './Dashboard/Partials/DischargeSummaryModal';
import HeroActionBanner from './Dashboard/Partials/HeroActionBanner';
import MyPetsSection from './Dashboard/Partials/MyPetsSection';
import OnlineDoctorsSection from './Dashboard/Partials/OnlineDoctorsSection';

interface DashboardProps {
    initialPets?: Pet[];
    initialDoctors?: Doctor[];
    initialHistory?: ConsultationHistoryItem[];
}

export default function Dashboard({
    initialPets = [],
    initialDoctors = [],
    initialHistory = [],
}: DashboardProps) {
    const user = usePage().props.auth.user;

    const [pets, setPets] = useState<Pet[]>(initialPets);
    const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
    const [history, setHistory] =
        useState<ConsultationHistoryItem[]>(initialHistory);

    useEffect(() => {
        if (initialPets) setPets(initialPets);
    }, [initialPets]);

    useEffect(() => {
        if (initialDoctors) setDoctors(initialDoctors);
    }, [initialDoctors]);

    useEffect(() => {
        if (initialHistory) setHistory(initialHistory);
    }, [initialHistory]);

    const [showAnamnesisModal, setShowAnamnesisModal] = useState(false);
    const [selectedPetId, setSelectedPetId] = useState<string | undefined>(
        undefined,
    );
    const [selectedDoctorId, setSelectedDoctorId] = useState<
        string | undefined
    >(undefined);

    const [showDischargeModal, setShowDischargeModal] = useState(false);
    const [activeSummary, setActiveSummary] = useState<DischargeSummary | null>(
        null,
    );

    const [showAddPetModal, setShowAddPetModal] = useState(false);

    const [showChatModal, setShowChatModal] = useState(false);
    const [activeSubmission, setActiveSubmission] =
        useState<AnamnesisSubmission | null>(null);
    const [activeChatDoctor, setActiveChatDoctor] = useState<Doctor | null>(
        null,
    );
    const [activeChatPet, setActiveChatPet] = useState<Pet | null>(null);

    const handleStartConsultationFromHero = () => {
        setSelectedPetId(pets[0]?.id);
        setSelectedDoctorId(doctors[0]?.id);
        setShowAnamnesisModal(true);
    };

    const handleConsultSpecificPet = (pet: Pet) => {
        setSelectedPetId(pet.id);
        setSelectedDoctorId(doctors[0]?.id);
        setShowAnamnesisModal(true);
    };

    const handleConsultSpecificDoctor = (doctor: Doctor) => {
        setSelectedDoctorId(doctor.id);
        setSelectedPetId(pets[0]?.id);
        setShowAnamnesisModal(true);
    };

    const handleOpenDischargeSummary = (summary: DischargeSummary) => {
        setActiveSummary(summary);
        setShowDischargeModal(true);
    };

    const handleOpenAddPet = () => {
        setShowAddPetModal(true);
    };

    const handleAddPet = (newPet: Pet) => {
        setPets((prev) => [newPet, ...prev]);
        setSelectedPetId(newPet.id);

        router.post(
            route('pets.store'),
            {
                name: newPet.name,
                species: newPet.species,
                breed: newPet.breed,
                age: newPet.age,
                weight: newPet.weight,
                gender: newPet.gender,
                photo: newPet.photo,
                statusBadge: newPet.statusBadge,
            } as any,
            {
                preserveScroll: true,
            },
        );
    };

    const handleLaunchChat = (submission: AnamnesisSubmission) => {
        const doc =
            doctors.find((d) => d.id === submission.doctorId) || doctors[0];
        const pet = pets.find((p) => p.id === submission.petId) || pets[0];

        setActiveSubmission(submission);
        setActiveChatDoctor(doc);
        setActiveChatPet(pet);

        setShowAnamnesisModal(false);
        setShowChatModal(true);
    };

    const handleCompleteConsultation = (newSummary: DischargeSummary) => {
        const newHistoryItem: ConsultationHistoryItem = {
            id: 'hist-' + Date.now(),
            date: 'Hari ini • ' + newSummary.time,
            pet: {
                id: activeChatPet?.id || '',
                name: newSummary.petName,
                breed: newSummary.petBreed,
                species: newSummary.petSpecies,
                photo: newSummary.petPhoto,
            },
            doctor: {
                id: activeChatDoctor?.id || '',
                name: newSummary.doctorName,
                photo: newSummary.doctorPhoto,
                specialization:
                    activeChatDoctor?.specialization || 'Dokter Hewan Jaga',
            },
            suspectedIssue: newSummary.diagnosis,
            status: 'Selesai',
            prescriptionCount: newSummary.prescriptions.length,
            dischargeSummary: newSummary,
        };

        setHistory((prev) => [newHistoryItem, ...prev]);
        setShowChatModal(false);
        setActiveSummary(newSummary);
        setShowDischargeModal(true);

        if (activeChatPet?.id && activeChatDoctor?.id) {
            router.post(
                route('consultations.store'),
                {
                    petId: activeChatPet.id,
                    doctorId: activeChatDoctor.id,
                    date: 'Hari ini • ' + newSummary.time,
                    suspectedIssue: newSummary.diagnosis,
                    status: 'Selesai',
                    prescriptionCount: newSummary.prescriptions.length,
                    dischargeSummary: newSummary,
                } as any,
                {
                    preserveScroll: true,
                },
            );
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard Klien | NVet Care" />

            <div className="py-6 sm:py-8 lg:py-10">
                <div className="mx-auto max-w-7xl space-y-6 px-4 sm:space-y-8 sm:px-6 lg:px-8">

                    <section aria-label="Hero Konsultasi Cepat">
                        <HeroActionBanner
                            userName={user.name}
                            onStartConsultation={
                                handleStartConsultationFromHero
                            }
                            onlineDoctorCount={
                                doctors.filter((d) => d.isOnline).length
                            }
                            featuredDoctor={
                                doctors.find((d) => d.isOnline) || doctors[0] || null
                            }
                        />
                    </section>

                    <section
                        aria-label="Anabul Saya dan Dokter Jaga"
                        className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12"
                    >
                        <div className="flex flex-col lg:col-span-6">
                            <MyPetsSection
                                pets={pets}
                                onAddPet={handleOpenAddPet}
                                onConsultPet={handleConsultSpecificPet}
                            />
                        </div>

                        <div className="flex flex-col lg:col-span-6">
                            <OnlineDoctorsSection
                                doctors={doctors}
                                onConsultDoctor={handleConsultSpecificDoctor}
                            />
                        </div>
                    </section>

                    <section aria-label="Riwayat Konsultasi Terakhir">
                        <ConsultationHistorySection
                            history={history}
                            onViewSummary={handleOpenDischargeSummary}
                        />
                    </section>
                </div>
            </div>

            <AnamnesisModal
                show={showAnamnesisModal}
                onClose={() => setShowAnamnesisModal(false)}
                pets={pets}
                doctors={doctors}
                initialSelectedPetId={selectedPetId}
                initialSelectedDoctorId={selectedDoctorId}
                onStartConsultationChat={handleLaunchChat}
                onOpenAddPet={() => {
                    setShowAnamnesisModal(false);
                    setShowAddPetModal(true);
                }}
            />

            <DischargeSummaryModal
                show={showDischargeModal}
                onClose={() => setShowDischargeModal(false)}
                summary={activeSummary}
            />

            <AddPetModal
                show={showAddPetModal}
                onClose={() => setShowAddPetModal(false)}
                onAddPet={handleAddPet}
            />

            <ActiveConsultationRoomModal
                show={showChatModal}
                onClose={() => setShowChatModal(false)}
                submission={activeSubmission}
                doctor={activeChatDoctor}
                pet={activeChatPet}
                onCompleteConsultation={handleCompleteConsultation}
            />
        </AuthenticatedLayout>
    );
}
