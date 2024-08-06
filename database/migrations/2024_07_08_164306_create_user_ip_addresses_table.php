<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_ip_addresses', function (Blueprint $table) {
            $table->id();
            $table->string('ip')->index();
            $table->string("countryName")->nullable(); // "United States",
            $table->string("countryCode")->nullable(); // "US",
            $table->string("regionCode")->nullable(); // "CA",
            $table->string("regionName")->nullable(); // "California",
            $table->string("cityName")->nullable(); // "Mountain View",
            $table->string("zipCode")->nullable(); // "94043",
            $table->string("isoCode")->nullable(); // null,
            $table->string("postalCode")->nullable(); // null,
            $table->string("latitude")->nullable(); // "37.422",
            $table->string("longitude")->nullable(); // "-122.084",
            $table->string("metroCode")->nullable(); // null,
            $table->string("areaCode")->nullable(); // "CA",
            $table->string("timezone")->nullable(); // "America/Los_Angeles",
            $table->char('user_id', 26)->index();
            $table->timestamps();
            $table->index(['ip', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_ip_addresses');
    }
};
