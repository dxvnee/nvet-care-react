<?php

namespace App\Http\Controllers;

use App\Models\Consultation;
use App\Models\Doctor;
use App\Models\Pet;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        $pets = $user->pets()
            ->latest()
            ->get()
            ->map(fn (Pet $pet) => [
                'id' => (string) $pet->id,
                'name' => $pet->name,
                'species' => $pet->species,
                'breed' => $pet->breed,
                'age' => $pet->age,
                'weight' => $pet->weight,
                'gender' => $pet->gender,
                'photo' => $pet->photo,
                'statusBadge' => $pet->status_badge,
            ]);

        $doctors = Doctor::where('is_online', true)
            ->get()
            ->map(fn (Doctor $doc) => [
                'id' => (string) $doc->id,
                'name' => $doc->name,
                'sip' => $doc->sip,
                'specialization' => $doc->specialization,
                'experience' => $doc->experience,
                'clinic' => $doc->clinic,
                'rating' => (float) $doc->rating,
                'reviewCount' => (int) $doc->review_count,
                'fee' => $doc->fee,
                'isOnline' => (bool) $doc->is_online,
                'photo' => $doc->photo,
                'about' => $doc->about,
            ]);

        $history = $user->consultations()
            ->with(['pet', 'doctor'])
            ->latest()
            ->get()
            ->map(function (Consultation $hist) {
                return [
                    'id' => (string) $hist->id,
                    'date' => $hist->date,
                    'pet' => [
                        'id' => (string) ($hist->pet?->id ?? ''),
                        'name' => $hist->pet?->name ?? 'Anabul',
                        'breed' => $hist->pet?->breed ?? '',
                        'photo' => $hist->pet?->photo ?? '',
                        'species' => $hist->pet?->species ?? 'Hewan',
                    ],
                    'doctor' => [
                        'id' => (string) ($hist->doctor?->id ?? ''),
                        'name' => $hist->doctor?->name ?? 'Dokter Hewan',
                        'photo' => $hist->doctor?->photo ?? '',
                        'specialization' => $hist->doctor?->specialization ?? '',
                    ],
                    'suspectedIssue' => $hist->suspected_issue,
                    'status' => $hist->status,
                    'prescriptionCount' => $hist->prescription_count,
                    'dischargeSummary' => $hist->discharge_summary,
                ];
            });

        return Inertia::render('Dashboard', [
            'initialPets' => $pets,
            'initialDoctors' => $doctors,
            'initialHistory' => $history,
        ]);
    }
}
