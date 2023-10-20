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
        Schema::create('mgr_gtplocations', function (Blueprint $table) {
            $table->id('mgr_gtplocations_id');
            $table->string('mgr_gtplocations_name');
            $table->boolean('mgr_gtplocations_status')->default(1);
            $table->unsignedBigInteger('mgr_gtplocations_company');
            $table->foreign('mgr_gtplocations_company')->references('mgr_gtpcompanies_id')->on('mgr_gtpcompanies');
            $table->timestamps();

    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mgr_gtplocations');
    }
};
