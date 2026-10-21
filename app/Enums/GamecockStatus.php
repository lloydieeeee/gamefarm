<?php

namespace App\Enums;

enum GamecockStatus: string
{
    case AVAILABLE = 'available';
    case RESERVED = 'reserved';
    case SOLD = 'sold';

    public function label(): string
    {
        return match ($this) {
            self::AVAILABLE => 'Available',
            self::RESERVED => 'Reserved',
            self::SOLD => 'Sold',
        };
    }

    public static function options(): array
    {
        return array_map(fn($case) => [
            'value' => $case->value, 
            'label' => ucfirst($case->value)
        ], self::cases());
    }
}
