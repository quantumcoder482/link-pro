<?php

namespace App\Console\Commands;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Console\Command;
use App\Jobs\JobFreeTrialEmail;

class EmailFreeTrialCode extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'emails:EmailFreeTrialCode';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Email users a free trial promo code if they that have not upgraded after 7 days';

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
        $startDate = Carbon::now()->subDays(7)->startOfDay();
        $endDate = Carbon::now()->subDays(7)->endOfDay();
        $now = Carbon::now()->endOfDay();
        $users = User::whereBetween('created_at', [$startDate, $endDate])->get();

        if ($users->isNotEmpty()) {

            foreach ( $users as $user ) {

                if($user->getRoleNames()->contains('lp.user')) {
                    $created = Carbon::parse( $user->created_at )->startOfDay();
                    $diff    = $created->diffInDays( $now );

                    if ( $diff == 7 && ! $user->subscription ) {

                        if ( $user->email_subscription ) {
                            $userData = ( [
                                'username' => $user->username,
                                'userID'   => $user->id,
                            ] );

                            $details = ( [
                                "data"      => $userData,
                                "userEmail" => $user->email
                            ] );

                            retry( 20, function () use ( $details ) {
                                JobFreeTrialEmail::dispatch( $details );
                            }, 200 );
                        }
                    }
                }
            }
        }

        return 0;
    }
}
