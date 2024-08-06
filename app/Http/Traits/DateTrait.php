<?php

namespace App\Http\Traits;

use Carbon\Carbon;

trait DateTrait {

    /**
     * @param $value
     *
     * @return array
     */
    public function getDateRange($value): array {

        switch ($value) {

            case 1:
                $startDate = Carbon::now()->startOfDay();
                $endDate = Carbon::now();
                break;
            case 2:
                $startDate = Carbon::now()->subDays(1)->startOfDay();
                $endDate = Carbon::now()->subDays(1)->endOfDay();
                break;
            case 3:
                $startDate = Carbon::now()->startOfWeek()->startOfDay();
                $endDate = Carbon::now();
                break;
            case 4:
                $startDate = Carbon::now()->startOfMonth()->startOfDay();
                $endDate = Carbon::now();
                break;
            case 5:
                $startDate = Carbon::now()->startOfYear()->startOfDay();
                $endDate = Carbon::now();
                break;
            case 6:
                $startDate = Carbon::now()->startOfWeek()->subDays(7)->startOfDay();
                $endDate = Carbon::now()->startOfWeek()->subDays(1)->endOfDay();
                break;
            case 7:
                $startDate = Carbon::now()->startOfMonth()->subDays(1)->startOfMonth()->startOfDay();
                $endDate = Carbon::now()->startOfMonth()->subDays(1)->endOfMonth()->endOfDay();
                break;
            default:
                break;
        }

        return [
            'startDate' => $startDate,
            'endDate' => $endDate
        ];
    }

    /**
     * @return array
     */
    public function getMyDates(): array {

        if (isset($_GET['startDate']) && isset($_GET['endDate'])) {

            $startDate = Carbon::createFromTimestamp($_GET['startDate'])->startOfDay();
            $endDate = Carbon::createFromTimestamp($_GET['endDate'])->endOfDay();

        } else if (isset($_GET['dateValue'])) {

            $getData = $this->getDateRange($_GET['dateValue']);

            $startDate = $getData['startDate'];
            $endDate = $getData['endDate'];

        } else if (isset($_GET['clear'])) {

            $startDate = null;
            $endDate = null;

        } else {
            $getData = $this->getDateRange(1);

            $startDate = $getData['startDate'];
            $endDate = $getData['endDate'];
        }

        return [
            'startDate' => $startDate,
            'endDate' => $endDate
        ];
    }

    /**
     * @param $request
     *
     * @return array
     */
    public function getDateValues($request): array {

        if ( (is_array($request) && key_exists('currentDay', $request)) ||
             (is_object($request) && $request->currentDay)) {
            $startDate = Carbon::now()->startOfDay();
            $endDate = Carbon::now()->endOfDay();

        } else if ( (is_array($request) && key_exists('dateValue', $request)) ||
                    (is_object($request) && $request->dateValue) ) {

            $data = $this->getDateRange($request->dateValue);
            $startDate = $data['startDate'];
            $endDate = $data['endDate'];

        } else if ((is_array($request) && key_exists('clear', $request)) ||
                   (is_object($request) && $request->clear)) {

            $startDate = null;
            $endDate = null;

        } else {

            $startDate = Carbon::createFromTimestamp($request->startDate)->startOfDay();
            $endDate = Carbon::createFromTimestamp($request->endDate)->endOfDay();
        }

        return [
            "startDate" => $startDate,
            "endDate"   => $endDate
        ];
    }
}
