<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddMailchimpColsToUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->json('mailchimp_lists')->after('email')->nullable();
            $table->string('mailchimp_token')->after('email')->nullable();
            $table->string('mailchimp_server')->after('email')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('mailchimp_lists');
            $table->dropColumn('mailchimp_token');
            $table->dropColumn('mailchimp_server');
        });
    }
}
