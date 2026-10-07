<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePetRequest;
use App\Models\Pet;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class PetController extends Controller
{
    public function store(StorePetRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $request->user()->pets()->create([
            'name' => $validated['name'],
            'species' => $validated['species'],
            'breed' => $validated['breed'],
            'age' => $validated['age'] ?? '1 Tahun',
            'weight' => $validated['weight'] ?? '3.5 kg',
            'gender' => $validated['gender'],
            'photo' => $validated['photo'] ?? null,
            'status_badge' => $validated['statusBadge'] ?? [
                'text' => 'Baru Didaftarkan',
                'color' => 'blue',
            ],
        ]);

        return redirect()->back()->with('success', 'Profil anabul berhasil ditambahkan.');
    }

    public function destroy(Request $request, Pet $pet): RedirectResponse
    {
        abort_if($pet->user_id !== $request->user()->id, 403, 'Anda tidak memiliki hak akses.');

        $pet->delete();

        return redirect()->back()->with('success', 'Profil anabul berhasil dihapus.');
    }
}
