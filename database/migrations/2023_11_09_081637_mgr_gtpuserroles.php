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
            $table->unsignedBigInteger('mgr_gtpuserroles_role');
            $table->unsignedBigInteger('mgr_gtpuserroles_user');
            $table->foreign('mgr_gtpuserroles_role')->references('mgr_gtproles_id')->on('mgr_gtproles');
            $table->foreign('mgr_gtpuserroles_user')->references('mgr_gtpusers_id')->on('mgr_gtpusers');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
