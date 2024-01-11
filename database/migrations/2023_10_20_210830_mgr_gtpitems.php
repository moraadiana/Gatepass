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
        Schema::create('mgr_gtpitems', function (Blueprint $table) {
            $table->id('mgr_gtpitems_id');
            $table->string('mgr_gtpitems_description');
            $table->string('mgr_gtpitems_code');
            $table->string('mgr_gtpitems_quantity');
            $table->boolean('mgr_gtpgatepass_status')->default(1);
            $table->unsignedBigInteger('mgr_gtpitems_uom');
            $table->foreign('mgr_gtpitems_uom')->references('mgr_gtpuoms_id')->on('mgr_gtpuoms');
            $table->unsignedBigInteger('mgr_gtpitems_gatepass');
            $table->foreign('mgr_gtpitems_gatepass')->references('mgr_gtpgatepass_id')->on('mgr_gtpgatepass');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::dropIfExists('mgr_gtpitems');
    }
};
