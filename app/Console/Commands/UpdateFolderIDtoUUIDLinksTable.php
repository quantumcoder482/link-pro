<?php

namespace App\Console\Commands;

use App\Models\Folder;
use App\Models\Link;
use Illuminate\Console\Command;

class UpdateFolderIDtoUUIDLinksTable extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update:linksFolderUUID';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update folder ID in links table to use folder UUID';

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
        $links = Link::get();

        foreach($links as $link) {

            if ($link->folder_id != NULL) {
                $folderID = $link->folder_id;
                $folder = Folder::where(['id' => $folderID ])->pluck('uuid');
                $link->folder_id = $folder[0];
                $link->save();
            }

        }

        return 0;
    }
}
