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
        Schema::create('doctors', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('sip')->unique();
            $table->string('specialization');
            $table->string('experience');
            $table->string('clinic');
            $table->decimal('rating', 3, 1)->default(5.0);
            $table->unsignedInteger('review_count')->default(0);
            $table->string('fee');
            $table->boolean('is_online')->default(true)->index();
            $table->text('photo')->nullable();
            $table->text('about')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('doctors');
    }
};
