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
            $table->string('mgr_gtpapprovallevels_sequence');
            $table->boolean('mgr_gtpapprovallevels_status')->default(1);
            $table->unsignedBigInteger('mgr_gtpapprovallevels_company');
            $table->foreign('mgr_gtpapprovallevels_company')->references('mgr_gtpcompanies_id')->on('mgr_gtpcompanies');
            $table->unsignedBigInteger('mgr_gtpapprovallevels_approver');
            $table->foreign('mgr_gtpapprovallevels_approver')->references('mgr_gtproles_id')->on('mgr_gtproles');
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
