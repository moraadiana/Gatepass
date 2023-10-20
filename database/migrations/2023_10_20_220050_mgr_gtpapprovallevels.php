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
        Schema::create('mgr_gtpapprovallevels', function (Blueprint $table) {
            $table->id('mgr_gtpapprovallevels_id');
            $table->string('mgr_gtpapprovallevels_label');
	        $table->string('mgr_gtpapprovallevels_sequenceid');
            $table->boolean('mgr_gtpapprovallevels_status')->default(1); 
	        $table->string('mgr_gtpapprovallevels_createddate');
            $table->unsignedBigInteger('mgr_gtpapprovallevels_appover');
    	    $table->foreign('mgr_gtpapprovallevels_appover')->references	('mgr_gtpusers_id')->on('mgr_gtpusers');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::dropIfExists('mgr_gtpapprovallevels');
    }
};
