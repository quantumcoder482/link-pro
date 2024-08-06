<?php

namespace App\Console\Commands;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Console\Command;
use App\Jobs\JobEmailInactiveUsers;

class EmailInactiveUsers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'emails:EmailInactiveUsers';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Email inactive users';

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
        $startDate = Carbon::now()->subDays(30)->startOfDay();
        $endDate = Carbon::now()->subDays(3)->endOfDay();

        $users = User::whereBetween('created_at', [$startDate, $endDate])->get();
        $now = Carbon::now()->endOfDay();

        if ($users->isNotEmpty()) {

            foreach ( $users as $user ) {

                if($user->getRoleNames()->contains('lp.user')) {
                    $userLinks = $user->links()->get();
                    $linkCount = $userLinks->count();
                    $created   = Carbon::parse( $user->created_at );
                    $diff      = $created->diffInDays( $now );
                    $page      = $user->pages()->where( 'default', true )->get();

                    if ( $linkCount == 0 && count( $page ) > 0 && ( $diff == 3 || $diff == 7 || $diff == 30 ) ) {

                        if ( $user->email_subscription ) {
                            $userData = ( [
                                'username' => $user->username,
                                'link'     => $page[0]->name,
                                'userID'   => $user->id,
                            ] );

                            $details = ( [
                                "data"      => $userData,
                                "userEmail" => $user->email
                            ] );

                            retry( 20, function () use ( $details ) {
                                JobEmailInactiveUsers::dispatch( $details );
                            }, 200 );

                        }
                    }
                }
            }
        }

        return 0;

    }
}
