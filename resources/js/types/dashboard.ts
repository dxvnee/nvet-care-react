export interface Pet {
    id: string;
    name: string;
    species: 'Kucing' | 'Anjing' | 'Kelinci' | 'Burung' | 'Lainnya';
    breed: string;
    age: string;
    weight: string;
    gender: 'Jantan' | 'Betina';
    photo: string;
    statusBadge?: {
        text: string;
        color: 'green' | 'amber' | 'blue';
    };
}

export interface Doctor {
    id: string;
    name: string;
    sip: string;
    specialization: string;
    experience: string;
    clinic: string;
    rating: number;
    reviewCount: number;
    fee: string;
    isOnline: boolean;
    photo: string;
    about: string;
}

export interface PrescriptionItem {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
    notes?: string;
}

export interface DischargeSummary {
    id: string;
    referenceNumber: string;
    date: string;
    time: string;
    doctorName: string;
    doctorSip: string;
    doctorPhoto: string;
    petName: string;
    petSpecies: string;
    petBreed: string;
    petAge: string;
    petWeight: string;
    petPhoto: string;
    chiefComplaint: string;
    clinicalFindings: string;
    diagnosis: string;
    severity: 'Ringan' | 'Sedang' | 'Perlu Perhatian Khusus';
    prognosis: string;
    prescriptions: PrescriptionItem[];
    dischargeInstructions: {
        diet: string;
        hydration: string;
        warningSigns: string;
        followUpDate: string;
    };
}

export interface ConsultationHistoryItem {
    id: string;
    date: string;
    pet: {
        id: string;
        name: string;
        breed: string;
        photo: string;
        species: string;
    };
    doctor: {
        id: string;
        name: string;
        photo: string;
        specialization: string;
    };
    suspectedIssue: string;
    status: 'Selesai' | 'Menunggu Resep' | 'Tindak Lanjut';
    prescriptionCount: number;
    dischargeSummary: DischargeSummary;
}

export interface AnamnesisSubmission {
    petId: string;
    doctorId: string;
    symptoms: string[];
    duration: string;
    notes: string;
    hasAttachedPhoto?: boolean;
    photoPreviewUrl?: string;
}
