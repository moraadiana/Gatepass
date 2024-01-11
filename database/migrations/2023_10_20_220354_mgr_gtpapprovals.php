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
        Schema::create('mgr_gtpapprovals', function (Blueprint $table) {
            $table->id('mgr_gtpapprovals_id');
            $table->string('mgr_gtpapprovals_approvedby')->nullable();
            $table->string('mgr_gtpapprovals_comment')->nullable();
            $table->boolean('mgr_gtpapprovals_status')->default(1);
            $table->unsignedBigInteger('mgr_gtpapprovals_approvallevel');
            $table->foreign('mgr_gtpapprovals_approvallevel')->references('mgr_gtpapprovallevels_id')->on('mgr_gtpapprovallevels');
            $table->unsignedBigInteger('mgr_gtpapprovals_gatepass');
            $table->foreign('mgr_gtpapprovals_gatepass')->references('mgr_gtpgatepass_id')->on('mgr_gtpgatepass');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::dropIfExists('mgr_gtpapprovals');
    }
};
