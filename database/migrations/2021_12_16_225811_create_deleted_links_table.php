<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDeletedLinksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('deleted_links', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->integer('page_id');
            $table->integer('link_id');
            $table->integer('folder_id')->nullable();
            $table->string('name')->nullable();
            $table->text('url')->nullable();
            $table->string('icon')->nullable();
            $table->integer('position');
            $table->boolean('active_status')->default(true);
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
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
        Schema::dropIfExists('deleted_links');
    }
}
