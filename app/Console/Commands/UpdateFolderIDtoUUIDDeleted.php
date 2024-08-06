<?php

namespace App\Console\Commands;

use App\Models\Folder;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class UpdateFolderIDtoUUIDDeleted extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update:deletedLinksUUID';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update folder ID in deleted links table to use folder UUID';

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

        $deletedLinks = DB::table( 'deleted_links' )->where( 'folder_id', '!=', null )->get();

        foreach ( $deletedLinks as $link ) {

            $folderID = $link->folder_id;
            $folder   = Folder::where( [ 'id' => $folderID ] )->pluck( 'uuid' );
            if ( $folder->isEmpty() ) {
                DB::table( 'deleted_links' )
                  ->where('folder_id' , $folderID)
                  ->update(['folder_id'=> NULL]);
            } else {
                DB::table( 'deleted_links' )
                  ->where('folder_id' , $folderID)
                  ->update([ 'folder_id' => $folder[0] ]);
            }

        }

        return 0;
    }
}
