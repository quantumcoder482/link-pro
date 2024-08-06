<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserIpAddress extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function parseData($data): array {
        $payload = [];

        $payload["countryName"] = $data["countryName"] ?? false;
        $payload["countryCode"] = $data["countryCode"] ?? false;
        $payload["regionCode"] = $data["regionCode"] ?? false;
        $payload["regionName"] = $data["regionName"] ?? false;
        $payload["cityName"] = $data["cityName"] ?? false;
        $payload["zipCode"] = $data["zipCode"] ?? false;
        $payload["isoCode"] = $data["isoCode"] ?? false;
        $payload["postalCode"] = $data["postalCode"] ?? false;
        $payload["latitude"] = $data["latitude"] ?? false;
        $payload["longitude"] = $data["longitude"] ?? false;
        $payload["metroCode"] = $data["metroCode"] ?? false;
        $payload["areaCode"] = $data["areaCode"] ?? false;
        $payload["timezone"] = $data["timezone"] ?? false;

        return $payload;
    }

    public function Users() {
        return $this->hasMany(User::class);
    }
}
