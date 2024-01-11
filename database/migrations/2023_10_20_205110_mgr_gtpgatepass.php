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
        Schema::create('mgr_gtpgatepass', function (Blueprint $table) {
            $table->id('mgr_gtpgatepass_id');
            $table->string('mgr_gtpgatepass_name');
            $table->string('mgr_gtpgatepass_vehiclereg');
            $table->string('mgr_gtpgatepass_auxilarydoc');
            $table->string('mgr_gtpgatepass_destination');
            $table->string('mgr_gtpgatepass_purpose');
            $table->boolean('mgr_gtpgatepass_status')->default(3);
            $table->unsignedBigInteger('mgr_gtpgatepass_department');
            $table->foreign('mgr_gtpgatepass_department')->references('mgr_gtpdepartments_id')->on('mgr_gtpdepartments');
            $table->unsignedBigInteger('mgr_gtpgatepass_sourcelocation');
            $table->foreign('mgr_gtpgatepass_sourcelocation')->references('mgr_gtplocations_id')->on('mgr_gtplocations');
            $table->unsignedBigInteger('mgr_gtpgatepass_destinationlocation');
            $table->foreign('mgr_gtpgatepass_destinationlocation')->references('mgr_gtplocations_id')->on('mgr_gtplocations');
            $table->unsignedBigInteger('mgr_gtpgatepass_createdby');
            $table->foreign('mgr_gtpgatepass_createdby')->references('mgr_gtpusers_id')->on('mgr_gtpusers');
            $table->timestamps();
        });
        //
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mgr_gtpgatepass');
    }
};
