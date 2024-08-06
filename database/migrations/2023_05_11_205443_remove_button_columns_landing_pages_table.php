<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RemoveButtonColumnsLandingPagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('landing_pages', function (Blueprint $table) {
            $table->dropColumn('button_text');
            $table->dropColumn('button_text_color');
            $table->dropColumn('button_color');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('landing_pages', function (Blueprint $table) {
            $table->string('button_text')->default('Get Course');
            $table->string('button_text_color')->default("rgba(255,255,255,1)");
            $table->string('button_color')->default("rgba(0,0,0,1)");
        });
    }
}
