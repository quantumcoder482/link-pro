<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\Purchase;

class PurchasedItem
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * The Purchase Instance
     * @var Purchase
     */
    public Purchase $purchase;

    /**
     * Create a new event instance.
     *
     * @param Purchase $purchase
     *
     * @return void
     */
    public function __construct(Purchase $purchase)
    {
        $this->purchase = $purchase;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel|PrivateChannel
     */
    public function broadcastOn(): Channel|PrivateChannel {
        return new PrivateChannel('channel-name');
    }
}
