<?php


namespace App\Services;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;
use App\Http\Traits\IconTrait;


class IconService {

    use IconTrait;

    public function getIcons() {

        $iconArray = [];
        $endpoint = 'http://itunes.apple.com/search';
        $client = new Client();

        $term = "onlyfans";
        $entity = "software";

        try {
            $response = $client->request('GET', $endpoint, ['query' => [
                'term' => $term,
                'entity' => $entity
            ]]);
        } catch(\Exception $e) {
            Log::error($e);

            throw $e;
        }

        return json_decode($response->getBody(), true);
    }
}
