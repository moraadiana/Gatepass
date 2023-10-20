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
        //
        Schema::create('mgr_gtpuserroles', function (Blueprint $table) {
            $table->id('mgr_gtpuserroles_id');
            $table->string('mgr_gtpuserroles_name');
	        $table->string('mgr_gtpuserroles_createddate');
            $table->boolean('mgr_gtpuserroles_status')->default(1); 
            $table->unsignedBigInteger('mgr_gtpuserroles_createdby');
    	    $table->foreign('mgr_gtpuserroles_createdby')->references('mgr_gtpusers_id')->on('mgr_gtpusers');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::dropIfExists('mgr_gtpuserroles');
    }
};
