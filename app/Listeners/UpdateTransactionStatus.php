<?php

namespace App\Listeners;

use App\Events\PurchasedItem;
use App\Models\Purchase;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Http\Traits\BillingTrait;
use Illuminate\Support\Facades\Log;

class UpdateTransactionStatus implements ShouldQueue
{

    use BillingTrait;

    /**
     * The time (seconds) before the job should be processed.
     *
     * @var int
     */
    public int $delay = 600;

    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param PurchasedItem $event
     *
     * @return Purchase
     */
    public function handle(PurchasedItem $event) : Purchase
    {
        $transactionId = $event->purchase->transaction_id;

        try {
            $gateway = $this->createStripeGateway();
            $result = $gateway->transaction()->find($transactionId);

            $purchase = Purchase::where('transaction_id', $transactionId)->first();
            $purchase->update([
                'status' =>  $result->status
            ]);

            Log::channel( 'cloudwatch' )->info( "--transaction id--" .
                                                $transactionId .
                                                "--Transaction Status--" .
                                                $result->status
            );

            return $purchase;

        } catch(\Throwable $e) {
            Log::channel( 'cloudwatch' )->info( "--transaction id--" .
                                                $transactionId .
                                                "--error getting transaction status in Event Listener--" .
                                                $e->getMessage()
            );
        }
    }
}
