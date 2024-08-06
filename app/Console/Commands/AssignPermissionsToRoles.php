<?php

namespace App\Console\Commands;

use \Spatie\Permission\Models\Role;
use Illuminate\Console\Command;

class AssignPermissionsToRoles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'assign:permissions';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Assign Permissions To Roles';

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


        $roles = Role::all();

        foreach($roles as $role) {
            if ($role->name == "admin") {
                $role->givePermissionTo('view dashboard', 'view stats', 'view course manager', 'view courses', 'view subscription details');
            } else if ($role->name == 'lp.user') {
                $role->givePermissionTo('view dashboard', 'view stats', 'view course manager', 'view subscription details');
            } else if ($role->name == 'course.user') {
                $role->givePermissionTo('view courses');
            }
        }

        return 0;
    }
}
