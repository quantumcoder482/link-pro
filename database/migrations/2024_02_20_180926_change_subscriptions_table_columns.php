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
        Schema::table('subscriptions', function (Blueprint $table) {
            $table->foreignId('user_id')->change()->constrained();
            $table->renameColumn('braintree_id', 'sub_id');
            $table->renameColumn('braintree_status', 'status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('subscriptions', function (Blueprint $table) {
            $table->dropForeign('user_id');
            $table->renameColumn('id', 'braintree_id');
            $table->renameColumn('status', 'braintree_status');
        });
    }
};
