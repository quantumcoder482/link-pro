<?php

namespace App\Jobs;

use App\Models\Folder;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class JobDowngradeExpiredSubs implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $data;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle(): void {
        foreach($this->data as $subscription) {

            $user      = User::findOrFail( $subscription->user_id );
            $userPages = $user->pages()->get();

            foreach ( $userPages as $userPage ) {

                if ( $userPage->is_protected ) {
                    $userPage->is_protected = false;
                    $userPage->password     = NULL;
                }

                if ( $userPage->default ) {

                    $folders = Folder::where( 'page_id', $userPage->id )->get();
                    if ( $folders->isNotEmpty() ) {
                        foreach ( $folders as $folder ) {
                            if ( $folder->active_status ) {
                                $folder->active_status = false;
                                $folder->save();
                            }
                        }
                    }

                } else {

                    $userPage->disabled = true;

                }

                $userPage->save();
            }

            $subscription->update( [
                'name' => 'free',
                'downgraded' => true,
            ] );

            Log::channel( 'cloudwatch' )->info( "--timestamp--" .
                                                Carbon::now() .
                                                "-- kind --"
                                                . "downgraded subscription" .
                                                "-- Sub ID -- " .
                                                $subscription->braintree_id
            );

        }
    }
}
