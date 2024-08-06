<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLandingPagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('landing_pages', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->boolean('published')->default(false);
            $table->string('logo')->nullable();
            $table->string('slogan')->nullable();
            $table->string('hero')->nullable();
            $table->string('header_color')->default("rgba(255,255,255,1)");
            $table->string('button_text')->default('Get Course');
            $table->string('button_text_color')->default("rgba(255,255,255,1)");
            $table->string('button_color')->default("rgba(0,0,0,1)");
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
        Schema::dropIfExists('landing_pages');
    }
}
