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
        Schema::table('users', function (Blueprint $table) {
            //
            $table->string('phone_number')->nullable();
            $table->text('address')->nullable();
            $table->string('status')->default('active');
            $table->timestamp('last_login_at')->nullable();
            $table->string('gender')->nullable();
            $table->string('country')->nullable();
            $table->integer('reviews_count')->default(0);
            $table->integer('books_read_count')->default(0);

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            //
            $table->dropColumn([
                'phone_number',
                'address',
                'status',
                'gender',
                'last_login_at',
                'country',
                'reviews_count',
                'books_read_count',
            ]);
        });
    }
};
