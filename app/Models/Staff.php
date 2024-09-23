<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Staff extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'salary',
        'payout_date'
    ];

    protected $casts = [
        'payout_date' => 'date',
    ];

    public function advanceSalaries(): HasMany
    {
        return $this->hasMany(AdvanceSalary::class);
    }
}
