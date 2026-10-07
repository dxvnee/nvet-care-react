<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreConsultationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'petId' => ['required'],
            'doctorId' => ['required'],
            'date' => ['nullable', 'string', 'max:100'],
            'suspectedIssue' => ['nullable', 'string'],
            'status' => ['nullable', 'string', 'in:Selesai,Menunggu Resep,Tindak Lanjut'],
            'prescriptionCount' => ['nullable', 'integer'],
            'dischargeSummary' => ['required', 'array'],
        ];
    }
}
