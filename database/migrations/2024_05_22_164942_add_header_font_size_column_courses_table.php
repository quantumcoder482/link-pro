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
        Schema::table('courses', function (Blueprint $table) {
            $table->float('header_font_size', 3, 1)->default(1.6)->after('header_text_color');
            $table->bigInteger('user_id')->unsigned()->change();
            $table->bigInteger('landing_page_id')->unsigned()->change();
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('landing_page_id')->references('id')->on('landing_pages');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->dropColumn('header_font_size');
        });
    }
};
