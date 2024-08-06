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
        Schema::table('course_sections', function (Blueprint $table) {
            $table->json('section_text')->after('lock_video')->nullable();
            $table->bigInteger('user_id')->unsigned()->change();
            $table->bigInteger('course_id')->unsigned()->change();
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('course_id')->references('id')->on('courses');
            $table->float('title_size', 3, 1)->default(1.3)->after('video_title');
            $table->renameColumn('text_color', 'title_color');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('course_sections', function (Blueprint $table) {
            $table->dropColumn('section_text');
            $table->integer('user_id')->unsigned()->change();
            $table->integer('course_id')->unsigned()->change();
            $table->dropForeign('course_sections_user_id_foreign');
            $table->dropForeign('course_sections_course_id_foreign');
            $table->dropColumn('title_size');
            $table->renameColumn('title_color', 'text_color');
        });
    }
};
