<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLandingPageSectionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('landing_page_sections', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->integer('landing_page_id');
            $table->string('type');
            $table->text('text')->nullable();
            $table->string('bg_color')->nullable();
            $table->string('text_color')->nullable();
            $table->boolean('button')->default(false);
            $table->string('button_position')->default("above");
            $table->string('image')->nullable();
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
        Schema::dropIfExists('landing_page_sections');
    }
}
