<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePetRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'species' => ['required', 'string', 'in:Kucing,Anjing,Kelinci,Burung,Lainnya'],
            'breed' => ['required', 'string', 'max:255'],
            'age' => ['nullable', 'string', 'max:100'],
            'weight' => ['nullable', 'string', 'max:50'],
            'gender' => ['required', 'string', 'in:Jantan,Betina'],
            'photo' => ['nullable', 'string'],
            'statusBadge' => ['nullable', 'array'],
            'statusBadge.text' => ['nullable', 'string'],
            'statusBadge.color' => ['nullable', 'string', 'in:green,amber,blue'],
        ];
    }
}
