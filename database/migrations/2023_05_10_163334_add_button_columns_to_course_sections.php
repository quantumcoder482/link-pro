<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddButtonColumnsToCourseSections extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('course_sections', function (Blueprint $table) {
            $table->string('button_position')->after('button')->change();
            $table->string('button_text')->after('button')->default('Get Course');
            $table->string('button_text_color')->after('button_text')->default("rgba(255,255,255,1)");
            $table->integer('button_text_size')->after('button_text_color')->default(1);
            $table->string('button_color')->after('button_text_size')->default("rgba(0,0,0,1)");
            $table->integer('button_size')->after('button_color')->default(55);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('course_sections', function (Blueprint $table) {
            $table->dropColumn('button_text');
            $table->dropColumn('button_text_color');
            $table->dropColumn('button_text_size');
            $table->dropColumn('button_color');
            $table->dropColumn('button_size');
        });
    }
}
