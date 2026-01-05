<?php

namespace App\Helper;

use Carbon\Carbon;

class Forecasting
{
    /**
     * SES + Trend Adjustment
     *
     * @param array $data [{label, value}]
     * @param float $alpha
     * @param int $days
     * @return array
     */
    public static function SES(array $data, float $alpha = 0.3, int $days = 7): array
    {
        if (count($data) < 3) {
            return [
                'historical' => $data,
                'forecast' => [],
                'mape' => null,
                'alpha' => $alpha,
            ];
        }

        // --- Extract values & labels ---
        $values = array_map(fn($d) => (float) $d->value, $data);
        $labels = array_map(fn($d) => $d->label, $data);

        // --- SES Calculation ---
        $ses = [];
        $ses[0] = $values[0];

        for ($i = 1; $i < count($values); $i++) {
            $ses[$i] = ($alpha * $values[$i - 1]) + ((1 - $alpha) * $ses[$i - 1]);
        }

        // --- MAPE Calculation ---
        $totalError = 0;
        $n = 0;

        for ($i = 1; $i < count($values); $i++) {
            if ($values[$i] != 0) {
                $totalError += abs(($values[$i] - $ses[$i]) / $values[$i]);
                $n++;
            }
        }

        $mape = $n > 0 ? ($totalError / $n) * 100 : null;

        // --- Trend Calculation (linear average change) ---
        $trendSum = 0;
        for ($i = 1; $i < count($values); $i++) {
            $trendSum += ($values[$i] - $values[$i - 1]);
        }
        $trend = $trendSum / (count($values) - 1);

        // --- Forecast with Trend Adjustment ---
        $lastSES = end($ses);
        $lastDate = Carbon::parse(end($labels));

        $forecastDays = [];
        for ($i = 1; $i <= $days; $i++) {
            $forecastDays[] = [
                'label' => $lastDate->copy()->addDays($i)->format('Y-m-d'),
                'value' => round($lastSES + ($trend * $i), 2)
            ];
        }

        return [
            'historical' => $data,
            'forecast' => $forecastDays,
            'mape' => $mape !== null ? round($mape, 2) : null,
            'alpha' => $alpha
        ];
    }

    public static function Holt(
        array $data,
        float $alpha = 0.3,
        float $beta = 0.2,
        int $days = 7
    ): array {
        if (count($data) < 3) {
            return [
                'historical' => $data,
                'forecast' => [],
                'mape' => null,
                'alpha' => $alpha,
                'beta' => $beta
            ];
        }

        $values = array_map(fn($d) => (float) $d->value, $data);
        $labels = array_map(fn($d) => $d->label, $data);

        $level = [];
        $trend = [];

        $level[0] = $values[0];
        $trend[0] = $values[1] - $values[0];

        for ($i = 1; $i < count($values); $i++) {
            $level[$i] = ($alpha * $values[$i])
                + ((1 - $alpha) * ($level[$i - 1] + $trend[$i - 1]));

            $trend[$i] = ($beta * ($level[$i] - $level[$i - 1]))
                + ((1 - $beta) * $trend[$i - 1]);
        }

        $totalError = 0;
        $n = 0;

        for ($i = 1; $i < count($values); $i++) {
            $forecast = $level[$i - 1] + $trend[$i - 1];
            if ($values[$i] != 0) {
                $totalError += abs(($values[$i] - $forecast) / $values[$i]);
                $n++;
            }
        }

        $mape = $n > 0 ? ($totalError / $n) * 100 : null;

        $lastLevel = end($level);
        $lastTrend = end($trend);
        $lastDate = Carbon::parse(end($labels));

        $forecastDays = [];
        for ($i = 1; $i <= $days; $i++) {
            $forecastDays[] = [
                'label' => $lastDate->copy()->addDays($i)->format('Y-m-d'),
                'value' => (string) round($lastLevel + ($i * $lastTrend), 2)
            ];
        }

        return [
            'historical' => collect($data)->reverse()->values(),
            'forecast' => $forecastDays,
            'mape' => $mape !== null ? round($mape, 2) : null,
            'alpha' => $alpha,
            'beta' => $beta
        ];
    }
}
