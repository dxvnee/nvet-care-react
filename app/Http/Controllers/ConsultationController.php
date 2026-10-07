<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreConsultationRequest;
use App\Models\Doctor;
use App\Models\Pet;
use Illuminate\Http\RedirectResponse;

class ConsultationController extends Controller
{
    public function store(StoreConsultationRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $user = $request->user();

        $petIdRaw = $validated['petId'];
        $cleanPetId = is_numeric($petIdRaw) ? (int) $petIdRaw : (int) str_replace('pet-', '', (string) $petIdRaw);
        $pet = $user->pets()->find($cleanPetId) ?? $user->pets()->first();

        $doctorIdRaw = $validated['doctorId'];
        $cleanDocId = is_numeric($doctorIdRaw) ? (int) $doctorIdRaw : (int) str_replace('doc-', '', (string) $doctorIdRaw);
        $doctor = Doctor::find($cleanDocId) ?? Doctor::first();

        if (! $pet || ! $doctor) {
            return redirect()->back()->with('error', 'Data hewan atau dokter tidak valid.');
        }

        $dischargeSummary = $validated['dischargeSummary'];

        $user->consultations()->create([
            'pet_id' => $pet->id,
            'doctor_id' => $doctor->id,
            'date' => $validated['date'] ?? ('Hari ini • '.($dischargeSummary['time'] ?? now()->format('H:i').' WIB')),
            'suspected_issue' => $validated['suspectedIssue'] ?? ($dischargeSummary['diagnosis'] ?? 'Konsultasi Umum'),
            'status' => $validated['status'] ?? 'Selesai',
            'prescription_count' => $validated['prescriptionCount'] ?? count($dischargeSummary['prescriptions'] ?? []),
            'discharge_summary' => $dischargeSummary,
        ]);

        return redirect()->back()->with('success', 'Konsultasi berhasil diselesaikan dan dicatat dalam rekam medis.');
    }
}
