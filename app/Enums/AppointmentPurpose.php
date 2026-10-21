<?php

namespace App\Enums;

enum AppointmentPurpose: string
{
    case PREVIEW = 'preview';
    case PICKUP = 'pickup';

    public function label(): string
    {
        return match ($this) {
            self::PREVIEW => 'Preview',
            self::PICKUP => 'Pickup',
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
