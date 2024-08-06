<?php

namespace App\Console\Commands;

use App\Models\Folder;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class CreateUUIDForFolders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'create:uuid';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create and update UUID for all folders missing value';

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

        $folders = Folder::get();

        foreach($folders as $folder) {

            $folder->uuid = Str::uuid();
            $folder->save();
        }

        return 0;
    }
}
