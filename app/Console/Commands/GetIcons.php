<?php

namespace App\Console\Commands;

use App\Jobs\JobGetIcons;
use GuzzleHttp\Client;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use App\Http\Traits\IconTrait;
use Illuminate\Support\Facades\Storage;

class GetIcons extends Command
{

    use IconTrait;
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'request:GetIcons';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Get latest icons for apps from Apple and upload to S3';

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

        $icons = $this->iconArray();
        $count = 0;
        $addSeconds = 0;

        foreach($icons as $icon) {
            /*$term = $icon;
            $entity = "software";*/

            $object = [
                'term' => $icon,
                'entity' => 'software'
            ];

            ++$count;

            if ($count > 5) {

                if ($count == 6) {
                    $addSeconds = 30;
                }

                if ($count % 5 == 0) {
                    $addSeconds += 30;
                }
            }

            retry(20, function() use ($object, $addSeconds) {

                JobGetIcons::dispatch($object)->delay(now()->addSeconds($addSeconds));

            }, 200);
        }

        return Command::SUCCESS;
    }
}
