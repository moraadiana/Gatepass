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
        
   Schema::create('mgr_gtpdepartments', function (Blueprint $table) {
    $table->id('mgr_gtpdepartments_id');
    $table->string('mgr_gtpdepartments_name');
    $table->boolean('mgr_gtpdepartments_status')->default(1);
    $table->unsignedBigInteger('mgr_gtpdepartments_company');
    $table->foreign('mgr_gtpdepartments_company')->references('mgr_gtpcompanies_id')->on('mgr_gtpcompanies');
    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mgr_gtpdepartments');
    }
};