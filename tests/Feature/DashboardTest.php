<?php

use App\Models\Consultation;
use App\Models\Doctor;
use App\Models\Pet;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('guests are redirected to the login page when visiting dashboard', function () {
    $response = $this->get('/dashboard');

    $response->assertRedirect('/login');
});

test('authenticated and verified users can render the client dashboard with database data', function () {
    $user = User::factory()->create();

    $doctor = Doctor::create([
        'name' => 'drh. Amanda Wijaya, M.Si',
        'sip' => '503/SIP-VET/2023/0412',
        'specialization' => 'Spesialis Kucing & Hewan Kecil',
        'experience' => '7 thn pengalaman',
        'clinic' => 'RS NVet Care Pusat',
        'rating' => 4.9,
        'review_count' => 184,
        'fee' => 'Rp35.000',
        'is_online' => true,
    ]);

    $pet = Pet::create([
        'user_id' => $user->id,
        'name' => 'Milo',
        'species' => 'Kucing',
        'breed' => 'Persia Longhair',
        'age' => '2 Tahun',
        'weight' => '4.2 kg',
        'gender' => 'Jantan',
    ]);

    Consultation::create([
        'user_id' => $user->id,
        'pet_id' => $pet->id,
        'doctor_id' => $doctor->id,
        'date' => '04 Okt 2026 • 14:30 WIB',
        'suspected_issue' => 'Diare akut',
        'status' => 'Selesai',
        'prescription_count' => 1,
        'discharge_summary' => [
            'diagnosis' => 'Gastroenteritis',
            'severity' => 'Sedang',
        ],
    ]);

    $response = $this
        ->actingAs($user)
        ->get('/dashboard');

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Dashboard')
        ->has('initialPets', 1)
        ->has('initialDoctors')
        ->has('initialHistory', 1)
        ->where('initialPets.0.name', 'Milo')
        ->where('initialHistory.0.suspectedIssue', 'Diare akut')
    );
});

test('authenticated user can store a new pet in the database', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->post('/pets', [
            'name' => 'Bowie',
            'species' => 'Kucing',
            'breed' => 'British Shorthair',
            'age' => '1 Tahun',
            'weight' => '4.0 kg',
            'gender' => 'Jantan',
            'statusBadge' => [
                'text' => 'Baru Didaftarkan',
                'color' => 'blue',
            ],
        ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('pets', [
        'user_id' => $user->id,
        'name' => 'Bowie',
        'breed' => 'British Shorthair',
    ]);
});

test('storing pet fails validation when required fields are missing', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->post('/pets', [
            'name' => '',
            'species' => 'InvalidSpecies',
        ]);

    $response->assertSessionHasErrors(['name', 'species', 'breed', 'gender']);
});

test('user cannot delete pet belonging to another user', function () {
    $userA = User::factory()->create();
    $userB = User::factory()->create();

    $petB = Pet::create([
        'user_id' => $userB->id,
        'name' => 'Chiko',
        'species' => 'Kucing',
        'breed' => 'Siam',
        'age' => '1 Tahun',
        'weight' => '3 kg',
        'gender' => 'Jantan',
    ]);

    $response = $this
        ->actingAs($userA)
        ->delete("/pets/{$petB->id}");

    $response->assertForbidden();
    $this->assertDatabaseHas('pets', ['id' => $petB->id]);
});

test('authenticated user can store consultation in database', function () {
    $user = User::factory()->create();

    $doctor = Doctor::create([
        'name' => 'drh. Reza Pratama',
        'sip' => '503/SIP-VET/2021/0188',
        'specialization' => 'Spesialis Bedah Umum',
        'experience' => '9 thn',
        'clinic' => 'NVet Care Clinic',
        'rating' => 4.9,
        'review_count' => 200,
        'fee' => 'Rp45.000',
        'is_online' => true,
    ]);

    $pet = Pet::create([
        'user_id' => $user->id,
        'name' => 'Luna',
        'species' => 'Anjing',
        'breed' => 'Golden Retriever',
        'age' => '2 Tahun',
        'weight' => '20 kg',
        'gender' => 'Betina',
    ]);

    $response = $this
        ->actingAs($user)
        ->post('/consultations', [
            'petId' => $pet->id,
            'doctorId' => $doctor->id,
            'date' => 'Hari ini • 15:00 WIB',
            'suspectedIssue' => 'Alergi pakan',
            'status' => 'Selesai',
            'prescriptionCount' => 2,
            'dischargeSummary' => [
                'diagnosis' => 'Dermatitis Alergi',
                'prescriptions' => [
                    ['name' => 'Antihistamin'],
                    ['name' => 'Salep Kulit'],
                ],
            ],
        ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('consultations', [
        'user_id' => $user->id,
        'pet_id' => $pet->id,
        'doctor_id' => $doctor->id,
        'suspected_issue' => 'Alergi pakan',
    ]);
});
