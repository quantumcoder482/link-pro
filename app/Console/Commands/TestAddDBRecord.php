<?php

namespace App\Console\Commands;

use App\Models\Page;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Console\Command;
use App\Jobs\JobFreeTrialEmail;

class TestAddDBRecord extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:TestAddDBRecord';

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

        $user = User::find(1);
        $page = Page::find(1);

        $highestPosition = $page->links()->max('position');
        if ($highestPosition === null) {
            $position = 0;
        } else {
            $position = $highestPosition + 1;
        }

        $user->links()->create([
            'name' => "Test",
            'url' => null,
            'icon' => null,
            'page_id' => 1,
            'position' => $position,
            'active_status' => 1
        ]);

        return 0;
    }
}
