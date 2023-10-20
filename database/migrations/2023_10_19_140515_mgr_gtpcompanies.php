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
        Schema::create('mgr_gtpcompanies', function (Blueprint $table) {
            $table->id('mgr_gtpcompanies_id');
            $table->string('mgr_gtpcompanies_name');
            $table->boolean('mgr_gtpcompanies_status')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mgr_gtpcompanies');
    }
};
