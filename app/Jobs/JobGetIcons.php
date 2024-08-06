<?php

namespace App\Jobs;

use GuzzleHttp\Client;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class JobGetIcons implements ShouldQueue
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
    public function handle()
    {
        $endpoint = 'http://itunes.apple.com/search';
        $client = new Client();

        $term = $this->data['term'];
        $entity = $this->data['entity'];

        try {
            $response = $client->request('GET', $endpoint, ['query' => [
                'term' => $term,
                'entity' => $entity
            ]]);
        } catch(\Exception $e) {

            Log::error( "<-- GET ICON REQUEST ERROR--> " . $e->__toString() );
            throw $e;
        }

        $content = json_decode($response->getBody(), true);
        $iconURL = $content['results'][0]['artworkUrl512'];

        Log::info("<-- GET ICON REQUEST SUCCESS  --> " . $iconURL);

        $iconName = str_replace(" ", '-', $term);
        $path = 'icons/' . $iconName . ".png";

        try {
            Storage::disk('s3')->delete($path);
        } catch (\Exception $e) {

            Log::error( "<-- DELETE STORAGE ICON ERROR --> " . $e->__toString() );
            throw $e;
        }

        $image = file_get_contents($iconURL);

        try {
            Storage::disk('s3')->put(
                $path,
                $image,
                'public'
            );
        } catch (\Exception $e) {
            Log::error( "<--UPLOAD ICON ERROR--> " . $e->__toString() );
            throw $e;
        }

    }
}
