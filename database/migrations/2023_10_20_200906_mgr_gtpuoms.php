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
        Schema::create('mgr_gtpuoms', function (Blueprint $table) {
            $table->id('mgr_gtpuoms_id');
            $table->string('mgr_gtpuoms_name');
            $table->boolean('mgr_gtpuoms_status')->default(1); 
            $table->unsignedBigInteger('mgr_gtpuoms_createdby');
    	    $table->foreign('mgr_gtpuoms_createdby')->references	('mgr_gtpusers_id')->on('mgr_gtpusers');
            $table->timestamps(); 
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::dropIfExists('mgr_gtpuoms');
    }
};
