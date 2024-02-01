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
        Schema::table('mgr_gtpapprovallevels', function (Blueprint $table) {
            //
            $table->unsignedBigInteger('mgr_gtpapprovallevels_department')->nullable();
            $table->foreign('mgr_gtpapprovallevels_department')->references('mgr_gtpdepartments_id')->on('mgr_gtpdepartments');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mgr_gtpapprovallevels', function (Blueprint $table) {
            //
        });
    }
};
