<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangePagesColumnsSettings extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('pages', function (Blueprint $table) {
            $table->string('header_img')->nullable()->change();
            $table->string('profile_img')->nullable()->change();
            $table->string('title', 30)->change();
            $table->string('bio', 55)->change();
            $table->boolean('is_protected');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('pages', function (Blueprint $table) {
            $table->string('header_img')->change();
            $table->string('profile_img')->change();
            $table->string('title')->change();
            $table->string('bio')->change();
            $table->dropColumn('is_protected');
        });
    }
}
