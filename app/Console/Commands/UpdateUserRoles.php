<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class UpdateUserRoles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update:userRoles';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update all User Roles for Spatie';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {

        $users = User::all();

        foreach ($users as $user) {
            if ($user->email == "mcirami@gmail.com" || $user->email == "jefftochtrop@hotmail.com") {
                $user->assignRole('admin');
            } elseif ($user->role_id == 3) {
                $user->assignRole('course.user');
            } else {
                $user->assignRole('lp.user');
            }
        }

        return 0;
    }
}
