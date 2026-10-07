<?php

namespace Database\Seeders;

use App\Models\Consultation;
use App\Models\Doctor;
use App\Models\Pet;
use App\Models\User;
use Illuminate\Database\Seeder;

class DashboardDataSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Doctors Data
        $doctorsData = [
            [
                'name' => 'drh. Amanda Wijaya, M.Si',
                'sip' => '503/SIP-VET/2023/0412',
                'specialization' => 'Spesialis Kucing & Hewan Kecil',
                'experience' => '7 thn pengalaman',
                'clinic' => 'RS NVet Care Pusat',
                'rating' => 4.9,
                'review_count' => 184,
                'fee' => 'Rp35.000',
                'is_online' => true,
                'photo' => 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
                'about' => 'Berpengalaman menangani gangguan pencernaan, penyakit infeksius, dan konsultasi nutrisi anabul.',
            ],
            [
                'name' => 'drh. Reza Pratama, Sp.KGH',
                'sip' => '503/SIP-VET/2021/0188',
                'specialization' => 'Spesialis Anjing & Bedah Umum',
                'experience' => '9 thn pengalaman',
                'clinic' => 'NVet Care Veterinary Clinic',
                'rating' => 4.9,
                'review_count' => 210,
                'fee' => 'Rp45.000',
                'is_online' => true,
                'photo' => 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
                'about' => 'Fokus pada kesehatan anjing ras besar, ortopedi, luka trauma, dan dermatologi akut.',
            ],
            [
                'name' => 'drh. Sarah Amelia',
                'sip' => '503/SIP-VET/2024/0731',
                'specialization' => 'Praktisi Dermatologi & Alergi Hewan',
                'experience' => '5 thn pengalaman',
                'clinic' => 'NVet Care Digital Tele-Vet',
                'rating' => 4.8,
                'review_count' => 126,
                'fee' => 'Rp35.000',
                'is_online' => true,
                'photo' => 'https://images.unsplash.com/photo-1594824813568-125026937666?auto=format&fit=crop&w=400&q=80',
                'about' => 'Ahli dalam mengatasi jamur kulit (ringworm), kutu, kerontokan bulu, dan ruam alergi makanan.',
            ],
            [
                'name' => 'drh. Dimas Nugroho',
                'sip' => '503/SIP-VET/2022/0564',
                'specialization' => 'Spesialis Nutrisi & Penyakit Dalam',
                'experience' => '6 thn pengalaman',
                'clinic' => 'NVet Care Animal Health',
                'rating' => 4.9,
                'review_count' => 95,
                'fee' => 'Rp40.000',
                'is_online' => true,
                'photo' => 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
                'about' => 'Membimbing program diet anabul obesitas, penyakit ginjal, dan pemulihan pasca sakit berat.',
            ],
        ];

        $doctors = [];
        foreach ($doctorsData as $doc) {
            $doctors[$doc['sip']] = Doctor::updateOrCreate(
                ['sip' => $doc['sip']],
                $doc
            );
        }

        // 2. Ensure at least one user exists
        $users = User::all();
        if ($users->isEmpty()) {
            $users = collect([
                User::create([
                    'name' => 'Test User',
                    'email' => 'test@example.com',
                    'password' => bcrypt('password'),
                ]),
            ]);
        }

        // 3. Pets Data Definition
        $petsTemplate = [
            [
                'name' => 'Milo',
                'species' => 'Kucing',
                'breed' => 'Persia Longhair',
                'age' => '2 Tahun 4 Bulan',
                'weight' => '4.2 kg',
                'gender' => 'Jantan',
                'photo' => 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80',
                'status_badge' => [
                    'text' => 'Vaksin Lengkap',
                    'color' => 'green',
                ],
            ],
            [
                'name' => 'Luna',
                'species' => 'Anjing',
                'breed' => 'Golden Retriever',
                'age' => '1 Tahun 8 Bulan',
                'weight' => '24.5 kg',
                'gender' => 'Betina',
                'photo' => 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80',
                'status_badge' => [
                    'text' => 'Jadwal Obat Cacing',
                    'color' => 'amber',
                ],
            ],
            [
                'name' => 'Chiko',
                'species' => 'Kucing',
                'breed' => 'British Shorthair',
                'age' => '10 Bulan',
                'weight' => '3.8 kg',
                'gender' => 'Jantan',
                'photo' => 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=400&q=80',
                'status_badge' => [
                    'text' => 'Sehat & Aktif',
                    'color' => 'blue',
                ],
            ],
        ];

        // Seed Pets and Consultations for each user
        foreach ($users as $user) {
            $userPets = [];
            foreach ($petsTemplate as $p) {
                $userPets[$p['name']] = Pet::updateOrCreate(
                    [
                        'user_id' => $user->id,
                        'name' => $p['name'],
                    ],
                    $p
                );
            }

            // Consultations Data
            $docAmanda = $doctors['503/SIP-VET/2023/0412'] ?? Doctor::first();
            $docSarah = $doctors['503/SIP-VET/2024/0731'] ?? Doctor::skip(2)->first();

            $petMilo = $userPets['Milo'] ?? null;
            $petLuna = $userPets['Luna'] ?? null;

            if ($petMilo && $docAmanda) {
                Consultation::updateOrCreate(
                    [
                        'user_id' => $user->id,
                        'date' => '04 Okt 2026 • 14:30 WIB',
                    ],
                    [
                        'pet_id' => $petMilo->id,
                        'doctor_id' => $docAmanda->id,
                        'suspected_issue' => 'Diare akut berlendir & nafsu makan turun 2 hari',
                        'status' => 'Selesai',
                        'prescription_count' => 3,
                        'discharge_summary' => [
                            'id' => 'ds-1',
                            'referenceNumber' => 'NVET-DS-20261004-098',
                            'date' => '04 Okt 2026',
                            'time' => '14:30 WIB',
                            'doctorName' => $docAmanda->name,
                            'doctorSip' => $docAmanda->sip,
                            'doctorPhoto' => $docAmanda->photo,
                            'petName' => $petMilo->name,
                            'petSpecies' => $petMilo->species,
                            'petBreed' => $petMilo->breed,
                            'petAge' => $petMilo->age,
                            'petWeight' => $petMilo->weight,
                            'petPhoto' => $petMilo->photo,
                            'chiefComplaint' => 'Diare cair berlendir 3x dalam 24 jam terakhir, lesu dan menolak pakan kering.',
                            'clinicalFindings' => 'Borborygmi meningkat saat palpasi abdomen, membran mukosa merah muda normal, turgor kulit kembali < 2 detik (hidrasi masih cukup).',
                            'diagnosis' => 'Gastroenteritis Akut ec Dietary Indiscretion',
                            'severity' => 'Sedang',
                            'prognosis' => 'Fausta (Sangat Baik jika diet dan medikasi dipatuhi)',
                            'prescriptions' => [
                                [
                                    'name' => 'Kaolin Pectin Suspensi 60ml',
                                    'dosage' => '1.5 ml (Oral)',
                                    'frequency' => '2x sehari (Tiap 12 jam)',
                                    'duration' => '3 hari',
                                    'instructions' => 'Berikan sesudah makan menggunakan spuit tanpa jarum',
                                    'notes' => 'Kocok botol terlebih dahulu',
                                ],
                                [
                                    'name' => 'Probiotik Vet Plus Powder',
                                    'dosage' => '1 sachet / hari',
                                    'frequency' => '1x sehari',
                                    'duration' => '5 hari',
                                    'instructions' => 'Campur merata ke makanan basah gastrointestinal',
                                    'notes' => 'Memulihkan mikrobioma usus baik',
                                ],
                                [
                                    'name' => 'Oralit Rehidrasi Hewan 200ml',
                                    'dosage' => '50 ml / hari',
                                    'frequency' => 'Minum bertahap',
                                    'duration' => '3 hari',
                                    'instructions' => 'Larutkan dalam mangkuk air minum matang',
                                    'notes' => 'Mencegah dehidrasi',
                                ],
                            ],
                            'dischargeInstructions' => [
                                'diet' => 'Berikan diet lunak Royal Canin Gastrointestinal wet food / daging ayam rebus tanpa bumbu porsi kecil (3-4 kali sehari). Hindari susu atau snack berkadar lemak tinggi.',
                                'hydration' => 'Pastikan mangkuk air minum matang bersih selalu tersedia di tempat yang mudah dijangkau.',
                                'warningSigns' => 'Segera bawa ke IGD NVet Care jika muntah berulang >3 kali dalam 12 jam, feses berdarah segar/hitam, atau gusi terlihat pucat.',
                                'followUpDate' => '07 Oktober 2026 (Hubungi kembali via chat jika feses belum padat)',
                            ],
                        ],
                    ]
                );
            }

            if ($petLuna && $docSarah) {
                Consultation::updateOrCreate(
                    [
                        'user_id' => $user->id,
                        'date' => '28 Sep 2026 • 10:15 WIB',
                    ],
                    [
                        'pet_id' => $petLuna->id,
                        'doctor_id' => $docSarah->id,
                        'suspected_issue' => 'Garuk telinga intensif & kemerahan pada lipatan kulit',
                        'status' => 'Selesai',
                        'prescription_count' => 2,
                        'discharge_summary' => [
                            'id' => 'ds-2',
                            'referenceNumber' => 'NVET-DS-20260928-044',
                            'date' => '28 Sep 2026',
                            'time' => '10:15 WIB',
                            'doctorName' => $docSarah->name,
                            'doctorSip' => $docSarah->sip,
                            'doctorPhoto' => $docSarah->photo,
                            'petName' => $petLuna->name,
                            'petSpecies' => $petLuna->species,
                            'petBreed' => $petLuna->breed,
                            'petAge' => $petLuna->age,
                            'petWeight' => $petLuna->weight,
                            'petPhoto' => $petLuna->photo,
                            'chiefComplaint' => 'Menggaruk telinga kanan dan menjilat pangkal paha hingga kemerahan.',
                            'clinicalFindings' => 'Eritema ringan pada pinna telinga kanan, bau khas serumen berlebih, tidak ditemukan lesi terbuka pada abdomen.',
                            'diagnosis' => 'Otitis Eksterna Alergika Unilateral ec Flea Allergy Dermatitis',
                            'severity' => 'Ringan',
                            'prognosis' => 'Fausta (Baik)',
                            'prescriptions' => [
                                [
                                    'name' => 'Tetes Telinga Otic Solution 15ml',
                                    'dosage' => '3 tetes telinga kanan',
                                    'frequency' => '2x sehari',
                                    'duration' => '7 hari',
                                    'instructions' => 'Teteskan ke liang telinga lalu pijat lembut pangkal telinga',
                                    'notes' => 'Bersihkan kotoran luar dengan kapas sebelum ditetes',
                                ],
                                [
                                    'name' => 'Tablet Antihistamin Vet 10mg',
                                    'dosage' => '1 tablet (Oral)',
                                    'frequency' => '1x sehari malam hari',
                                    'duration' => '5 hari',
                                    'instructions' => 'Berikan bersama sepotong kecil makanan',
                                    'notes' => 'Meredakan rasa gatal dan kemerahan',
                                ],
                            ],
                            'dischargeInstructions' => [
                                'diet' => 'Pertahankan makanan hypoallergenic saat ini, hindari pergantian treat baru.',
                                'hydration' => 'Pastikan anabul tidak dehidrasi saat beraktivitas di luar ruangan.',
                                'warningSigns' => 'Kepala miring terus menerus atau keluar cairan berbau menyengat dari telinga.',
                                'followUpDate' => '05 Oktober 2026',
                            ],
                        ],
                    ]
                );
            }
        }
    }
}
