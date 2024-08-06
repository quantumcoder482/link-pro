<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOfferClicksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('offer_clicks', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('ip_address');
            $table->integer('referral_id');
            $table->integer('offer_id');
            $table->boolean('is_unique');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('offer_clicks');
    }
}
