import { CloseIcon, PaperAirplaneIcon } from '@/Components/Icons';
import Modal from '@/Components/Modal';
import {
    AnamnesisSubmission,
    DischargeSummary,
    Doctor,
    Pet,
} from '@/types/dashboard';
import { FormEvent, useEffect, useRef, useState } from 'react';

interface ActiveConsultationRoomModalProps {
    show: boolean;
    onClose: () => void;
    submission: AnamnesisSubmission | null;
    doctor: Doctor | null;
    pet: Pet | null;
    onCompleteConsultation: (dischargeSummary: DischargeSummary) => void;
}

interface ChatMessage {
    id: string;
    sender: 'system' | 'doctor' | 'user';
    text: string;
    timestamp: string;
    photoUrl?: string;
}

export default function ActiveConsultationRoomModal({
    show,
    onClose,
    submission,
    doctor,
    pet,
    onCompleteConsultation,
}: ActiveConsultationRoomModalProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initial chat populate on open
    useEffect(() => {
        if (show && submission && doctor && pet) {
            const now = new Date();
            const timeStr = now.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
            });

            const initialMsgs: ChatMessage[] = [
                {
                    id: 'msg-sys-1',
                    sender: 'system',
                    text: `Sesi Tele-konsultasi NVet Care aktif. Dokter ${doctor.name} telah menerima data gejala awal untuk pasien ${pet.name}.`,
                    timestamp: timeStr,
                },
                {
                    id: 'msg-user-anamnesis',
                    sender: 'user',
                    text: `Halo Dokter, saya ingin mengonsultasikan ${pet.name} (${pet.breed}, ${pet.weight}).\n\n• Gejala: ${submission.symptoms.join(', ') || 'Pemeriksaan rutin'}\n• Durasi: ${submission.duration}\n• Catatan: ${submission.notes || 'Tidak ada catatan tambahan.'}`,
                    timestamp: timeStr,
                    photoUrl: submission.photoPreviewUrl,
                },
            ];

            setMessages(initialMsgs);
            setIsTyping(true);

            // Simulate doctor typing response after 1.5 seconds
            const timer = setTimeout(() => {
                setIsTyping(false);
                setMessages((prev) => [
                    ...prev,
                    {
                        id: 'msg-doc-1',
                        sender: 'doctor',
                        text: `Halo kak! Salam kenal, saya ${doctor.name} dari tim dokter jaga NVet Care. Saya sudah membaca ringkasan keluhan ${pet.name}. Terima kasih sudah mengisi anamnesis dengan detail.\n\nBerdasarkan gejala ${submission.symptoms.slice(0, 2).join(' dan ')}, mohon pastikan apakah ${pet.name} saat ini masih mau minum air matang secara mandiri, dan apakah ada muntah berbusa?`,
                        timestamp: new Date().toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                        }),
                    },
                ]);
            }, 1400);

            return () => clearTimeout(timer);
        }
    }, [show, submission, doctor, pet]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleSendMessage = (e: FormEvent) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const timeStr = new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        });
        const userMsg: ChatMessage = {
            id: 'msg-' + Date.now(),
            sender: 'user',
            text: inputText.trim(),
            timestamp: timeStr,
        };

        setMessages((prev) => [...prev, userMsg]);
        setInputText('');
        setIsTyping(true);

        // Auto vet reply simulation
        setTimeout(() => {
            setIsTyping(false);
            setMessages((prev) => [
                ...prev,
                {
                    id: 'msg-doc-reply-' + Date.now(),
                    sender: 'doctor',
                    text: `Baik kak, informasi tersebut sangat membantu. Kondisi ini umumnya merupakan gangguan pencernaan awal yang bisa kita tangani dengan medikasi oral dan diet gastrointestinal. Saya sedang menyusun resep obat digital serta anjuran perawatannya ya kak.`,
                    timestamp: new Date().toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                    }),
                },
            ]);
        }, 1600);
    };

    const handleFinishAndCreateSummary = () => {
        if (!doctor || !pet || !submission) return;

        const now = new Date();
        const generatedSummary: DischargeSummary = {
            id: 'summary-' + Date.now(),
            referenceNumber:
                'NVET-DS-' + Math.floor(100000 + Math.random() * 900000),
            date: now.toLocaleDateString('id-ID', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
            }),
            time:
                now.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                }) + ' WIB',
            doctorName: doctor.name,
            doctorSip: doctor.sip || '-',
            doctorPhoto: doctor.photo,
            petName: pet.name,
            petSpecies: pet.species,
            petBreed: pet.breed,
            petAge: pet.age,
            petWeight: pet.weight,
            petPhoto: pet.photo,
            chiefComplaint: `${submission.symptoms.join(', ')} selama ${submission.duration}. ${submission.notes}`,
            clinicalFindings:
                'Borborygmi meningkat, suhu afebris (38.5°C), reflek aktif, turgor kulit hidrasi ringan.',
            diagnosis: 'Gastroenteritis Akut ec Dietary Indiscretion',
            severity: 'Sedang',
            prognosis: 'Fausta (Baik)',
            prescriptions: [
                {
                    name: 'Kaolin Pectin Suspensi 60ml',
                    dosage: '1.5 ml (Oral)',
                    frequency: '2x sehari (tiap 12 jam)',
                    duration: '3 hari',
                    instructions: 'Berikan sesudah makan menggunakan spuit',
                    notes: 'Kocok terlebih dahulu sebelum diminumkan',
                },
                {
                    name: 'Probiotik Vet Plus Powder',
                    dosage: '1 sachet / hari',
                    frequency: '1x sehari',
                    duration: '5 hari',
                    instructions:
                        'Campur merata ke makanan basah gastrointestinal',
                    notes: 'Membantu menstabilkan flora bakteri usus baik',
                },
                {
                    name: 'Larutan Elektrolit Rehidrasi Hewan',
                    dosage: '50 ml / hari',
                    frequency: 'Diberikan bertahap',
                    duration: '3 hari',
                    instructions: 'Dilarutkan dalam 200ml air minum matang',
                    notes: 'Cegah dehidrasi akibat diare/muntah',
                },
            ],
            dischargeInstructions: {
                diet: 'Puasa makanan padat 4-6 jam, lanjutkan dengan wet food Gastrointestinal porsi kecil sering (4x sehari). Hindari susu atau makanan manusia berminyak.',
                hydration:
                    'Pastikan mangkuk air minum matang bersih selalu tersedia di tempat sejuk.',
                warningSigns:
                    'Segera bawa ke IGD NVet Care jika muntah berulang >3x dalam 12 jam, feses bercampur darah, atau anabul lemas ekstrem tidak dapat berdiri.',
                followUpDate: '3 Hari Mendatang (Jika diare belum membaik)',
            },
        };

        onCompleteConsultation(generatedSummary);
    };

    if (!doctor || !pet) return null;

    return (
        <Modal show={show} onClose={onClose} maxWidth="4xl">
            <div className="flex h-[85vh] flex-col overflow-hidden bg-stone-50 text-nvet-text">
                {/* CHAT HEADER */}
                <div className="flex shrink-0 items-center justify-between border-b border-stone-200 bg-white px-5 py-4">
                    <div className="flex min-w-0 items-center gap-3">
                        <div className="relative shrink-0">
                            <div className="h-11 w-11 overflow-hidden rounded-2xl border border-stone-200">
                                <img
                                    src={doctor.photo}
                                    alt={doctor.name}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-emerald-500 ring-2 ring-white"></span>
                        </div>

                        <div className="min-w-0">
                            <div className="flex items-center gap-2">
                                <h3 className="truncate font-heading text-sm font-bold text-nvet-dark sm:text-base">
                                    {doctor.name}
                                </h3>
                                <span className="xs:inline-flex hidden rounded-md border border-nvet-green/20 bg-nvet-green-light px-1.5 py-0.5 text-[10px] font-bold text-nvet-green">
                                    Online
                                </span>
                            </div>
                            <p className="truncate text-xs text-stone-500">
                                Pasien:{' '}
                                <strong className="text-nvet-primary">
                                    {pet.name}
                                </strong>{' '}
                                ({pet.breed}) • {doctor.specialization}
                            </p>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex shrink-0 items-center gap-2">
                        <button
                            type="button"
                            onClick={handleFinishAndCreateSummary}
                            className="shadow-xs inline-flex items-center gap-1.5 rounded-xl bg-nvet-primary px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-nvet-dark"
                        >
                            <span>Akhiri & Buat Summary</span>
                        </button>

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-full p-2 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-600"
                        >
                            <CloseIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* CHAT MESSAGES BODY */}
                <div className="flex-1 space-y-4 overflow-y-auto p-4 font-sans text-xs sm:p-6 sm:text-sm">
                    {messages.map((msg) => {
                        if (msg.sender === 'system') {
                            return (
                                <div
                                    key={msg.id}
                                    className="my-2 flex justify-center"
                                >
                                    <span className="shadow-xs inline-block rounded-full bg-stone-200/80 px-4 py-1.5 text-center text-[11px] font-medium text-stone-600">
                                        🔒 {msg.text}
                                    </span>
                                </div>
                            );
                        }

                        const isUser = msg.sender === 'user';

                        return (
                            <div
                                key={msg.id}
                                className={`flex items-end gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                            >
                                {!isUser && (
                                    <div className="h-8 w-8 shrink-0 overflow-hidden rounded-xl border border-stone-200">
                                        <img
                                            src={doctor.photo}
                                            alt={doctor.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                )}

                                <div
                                    className={`shadow-xs max-w-[85%] space-y-2 rounded-2xl p-4 sm:max-w-[70%] ${isUser
                                        ? 'rounded-br-none bg-nvet-dark text-white'
                                        : 'rounded-bl-none border border-stone-200 bg-white text-nvet-text'
                                        }`}
                                >
                                    <p className="whitespace-pre-line leading-relaxed">
                                        {msg.text}
                                    </p>

                                    {msg.photoUrl && (
                                        <div className="pt-2">
                                            <p className="mb-1 text-[10px] font-medium text-amber-200">
                                                Foto Gejala Terlampir:
                                            </p>
                                            <img
                                                src={msg.photoUrl}
                                                alt="Lampiran"
                                                className="h-32 rounded-xl border border-white/20 object-cover"
                                            />
                                        </div>
                                    )}

                                    <div
                                        className={`text-right text-[10px] ${isUser
                                            ? 'text-white/60'
                                            : 'text-stone-400'
                                            }`}
                                    >
                                        {msg.timestamp}
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {isTyping && (
                        <div className="flex items-center gap-2 text-xs text-stone-500">
                            <div className="h-7 w-7 overflow-hidden rounded-lg border border-stone-200">
                                <img
                                    src={doctor.photo}
                                    alt={doctor.name}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <span className="shadow-xs flex items-center gap-1.5 rounded-2xl border border-stone-200 bg-white px-3 py-1.5">
                                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-nvet-primary"></span>
                                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-nvet-primary delay-150"></span>
                                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-nvet-primary delay-300"></span>
                                <span className="ml-1 text-[11px] text-stone-500">
                                    {doctor.name} sedang mengetik...
                                </span>
                            </span>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* CHAT INPUT FORM */}
                <form
                    onSubmit={handleSendMessage}
                    className="flex shrink-0 items-center gap-2.5 border-t border-stone-200 bg-white p-3 sm:p-4"
                >
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder={`Ketik pesan atau pertanyaan untuk ${doctor.name}...`}
                        className="flex-1 rounded-2xl border-stone-200 bg-stone-50 px-4 py-3 text-xs text-nvet-text placeholder:text-stone-400 focus:border-nvet-primary focus:bg-white focus:ring-2 focus:ring-nvet-primary/20 sm:text-sm"
                    />

                    <button
                        type="submit"
                        disabled={!inputText.trim()}
                        className="rounded-2xl bg-nvet-primary p-3 text-white shadow-md transition-all hover:bg-nvet-dark disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <PaperAirplaneIcon className="h-5 w-5 rotate-90 transform" />
                    </button>
                </form>
            </div>
        </Modal>
    );
}
