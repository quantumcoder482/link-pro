<?php

namespace App\Console;

use App\Console\Commands\CopyTextToJsonCol;
use App\Console\Commands\EmailInactiveUsers;
use App\Console\Commands\EmailSocialShare;
use App\Console\Commands\EmailFreeTrialCode;
use App\Console\Commands\GetIcons;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        EmailInactiveUsers::class,
        EmailSocialShare::class,
        EmailFreeTrialCode::class,
        GetIcons::class,
        CopyTextToJsonCol::class
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {

        $schedule->command('emails:EmailInactiveUsers')
                 ->withoutOverlapping()
                 ->timezone('America/New_York')
                 ->dailyAt('7:00');

        $schedule->command('emails:EmailSocialShare')
                 ->withoutOverlapping()
                 ->timezone('America/New_York')
                 ->dailyAt('7:15');

        $schedule->command('emails:EmailFreeTrialCode')
                 ->withoutOverlapping()
                 ->timezone('America/New_York')
                 ->dailyAt('7:30');

        $schedule->command('request:GetIcons')
                 ->withoutOverlapping()
                 ->timezone('America/New_York')
                 ->weeklyOn(7, '3:00');

        /*$schedule->command('update:downgradeExpiredSubs')
                 ->timezone('America/New_York')
                 ->dailyAt('2:00');*/
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
