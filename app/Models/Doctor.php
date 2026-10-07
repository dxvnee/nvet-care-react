<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Doctor extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'sip',
        'specialization',
        'experience',
        'clinic',
        'rating',
        'review_count',
        'fee',
        'is_online',
        'photo',
        'about',
    ];

    protected $casts = [
        'rating' => 'float',
        'review_count' => 'integer',
        'is_online' => 'boolean',
    ];

    public function consultations(): HasMany
    {
        return $this->hasMany(Consultation::class);
    }
}
