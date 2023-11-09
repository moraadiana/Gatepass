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
        Schema::create('mgr_gtpusers', function (Blueprint $table) {
            $table->id('mgr_gtpusers_id');
            $table->string('mgr_gtpusers_fname');
            $table->string('mgr_gtpusers_lname');
            $table->string('mgr_gtpusers_sname');
            $table->string('mgr_gtpusers_email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('mgr_gtpusers_password');
            // $table->foreignId('mgr_gtpusers_role')->constrained(
            //     table: 'mgr_gtpuserroles',
            //     column: 'mgr_gtpuserroles_id',
            // )
                // ->onUpdate('cascade');
            $table->boolean('mgr_gtpusers_status')->default(1);
            $table->string('mgr_gtpusers_createdby')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mgr_gtpusers');
    }
};
