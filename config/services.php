<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'mailgun' => [
        'domain'    => env('MAILGUN_DOMAIN'),
        'secret'    => env('MAILGUN_SECRET'),
        'endpoint'  => env('MAILGUN_ENDPOINT', 'api.mailgun.net'),
        'scheme'    => 'https',
    ],

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key'       => env('AWS_ACCESS_KEY_ID'),
        'secret'    => env('AWS_SECRET_ACCESS_KEY'),
        'region'    => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],
    'mailchimp' => [
        'client_id'     => env('MAILCHIMP_CLIENT_ID'),
        'client_secret' => env('MAILCHIMP_CLIENT_SECRET'),
        'redirect'      => env('MAILCHIMP_REDIRECT_URI')
    ],
    'shopify' => [
        'client_id'     => env('SHOPIFY_CLIENT_ID'),
        'client_secret' => env('SHOPIFY_CLIENT_SECRET'),
        'redirect'      => env('SHOPIFY_REDIRECT_URI'),
        'scopes'        => env('SHOPIFY_APP_SCOPES'),
        'api_version'   => env('SHOPIFY_API_VERSION'),
    ],
    'stripe' => [
        'key'            => env('STRIPE_KEY'),
        'secret'         => env('STRIPE_SECRET'),
        'sandbox_key'    => env('STRIPE_SANDBOX_KEY'),
        'sandbox_secret' => env('STRIPE_SANDBOX_SECRET'),
        'webhook_secret'                => env('STRIPE_WEBHOOK_SECRET'),
        'product_webhook_secret'        => env('STRIPE_PRODUCT_WEBHOOK_SECRET'),
        'test_webhook_secret'           => env('STRIPE_TEST_WEBHOOK_SECRET'),
        'test_product_webhook_secret'   => env('STRIPE_TEST_PRODUCT_WEBHOOK_SECRET'),
        'connect_id'                    => env('STRIPE_CONNECT_ID'),
        'sandbox_connect_id'            => env('STRIPE_SANDBOX_CONNECT_ID')
    ]
];
