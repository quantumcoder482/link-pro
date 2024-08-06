<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeFolderIdStartingPoint extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('folders', function (Blueprint $table) {
            $table->id()->from(1000)->change();

            \Illuminate\Support\Facades\DB::statement("ALTER TABLE folders AUTO_INCREMENT = 1000;");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('folders', function (Blueprint $table) {
            $table->id()->change();
            \Illuminate\Support\Facades\DB::statement("ALTER TABLE folders AUTO_INCREMENT = 1;");
        });
    }
}
