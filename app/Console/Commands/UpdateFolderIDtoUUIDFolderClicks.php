<?php

namespace App\Console\Commands;

use App\Models\Folder;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class UpdateFolderIDtoUUIDFolderClicks extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update:folderClicksUUID';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update folder ID in folder clicks table to use folder UUID';

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
        $deletedLinks = DB::table( 'folder_clicks' )->get();

        foreach($deletedLinks as $link) {

            $folderID = $link->folder_uuid;
            $folder = Folder::where(['id' => $folderID ])->pluck('uuid');
            if ( $folder->isEmpty() ) {
                DB::table( 'folder_clicks' )
                  ->where('folder_uuid' , $folderID)
                  ->update(['folder_uuid' => NULL]);
            } else {
                DB::table( 'folder_clicks' )
                  ->where('folder_uuid' , $folderID)
                  ->update([ 'folder_uuid' => $folder[0] ]);
            }
        }

        return 0;
    }
}
