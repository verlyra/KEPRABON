<?php

namespace App\Helper;

use Carbon\Carbon;

class Forecasting
{
    /**
     * Simple Exponential Smoothing (SES)
     *
     * @param array $data [{label: date, value: number}]
     * @param float $alpha
     * @param int $days
     * @return array
     */
    public static function SES(array $data, float $alpha = 0.3, int $days = 7): array
    {
        if (count($data) < 2) {
            return [
                'historical' => $data,
                'forecast' => [],
                'mape' => null,
                'alpha' => $alpha,
            ];
        }

        $values = array_map(fn($d) => (float)$d->value, $data);
        $labels = array_map(fn($d) => $d->label, $data);

        $forecast = [];
        $forecast[0] = $values[0];

        for ($i = 1; $i < count($values); $i++) {
            $forecast[$i] = ($alpha * $values[$i - 1]) + ((1 - $alpha) * $forecast[$i - 1]);
        }

        $totalError = 0;
        for ($i = 1; $i < count($values); $i++) {
            if ($values[$i] != 0) {
                $totalError += abs(($values[$i] - $forecast[$i]) / $values[$i]);
            }
        }

        $mape = ($totalError / (count($values) - 1)) * 100;

        $lastActual = end($values);
        $lastForecast = end($forecast);

        $nextForecast = ($alpha * $lastActual) + ((1 - $alpha) * $lastForecast);

        $lastDate = Carbon::parse(end($labels));

        $forecastDays = [];
        for ($i = 1; $i <= $days; $i++) {
            $forecastDays[] = [
                'label' => $lastDate->copy()->addDays($i)->format('Y-m-d'),
                'value' => round($nextForecast, 2)
            ];
        }

        return [
            'historical' => $data,
            'forecast' => $forecastDays,
            'mape' => round($mape, 2),
            'alpha' => $alpha
        ];
    }
}
