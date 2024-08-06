<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeFolderClicksToUuid extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('folder_clicks', function (Blueprint $table) {
            $table->uuid('folder_id')->nullable()->change();

        });

        Schema::table('folder_clicks', function (Blueprint $table) {
            $table->renameColumn('folder_id', 'folder_uuid');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('folder_clicks', function (Blueprint $table) {
            $table->integer('folder_uuid')->change();
        });

        Schema::table('folder_clicks', function (Blueprint $table) {
            $table->renameColumn('folder_uuid', 'folder_id');
        });
    }
}
