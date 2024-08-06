<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RemoveButtonColumnsCoursesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('courses', function (Blueprint $table) {
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
        Schema::table('courses', function (Blueprint $table) {
            $table->string('button_text')->after('intro_text_color')->nullable();
            $table->string('button_text_color')->after('intro_text_color')->nullable();
            $table->string('button_color')->after('intro_text_color')->nullable();
        });
    }
}
