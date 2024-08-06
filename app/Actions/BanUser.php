<?php

namespace App\Actions;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use TCG\Voyager\Actions\AbstractAction;

class BanUser extends AbstractAction {

    private $isBanned = false;

    public function __construct( $dataType, $data ) {
        parent::__construct( $dataType, $data );
        $user = User::where('id', $this->data->{$this->data->getKeyName()})->first();
        if ($user) {
            $banned = $user->isBanned();
            if ( $banned ) {
                $this->isBanned = true;
            } else {
                $userIP   = $user->UserIpAddress()->latest()->pluck( 'ip' )->first();
                $ipBanned = DB::table( 'bans' )->where( 'ip', $userIP )->where( 'bannable_type',
                    null )->where( 'deleted_at', null )->first();
                if ( $ipBanned ) {
                    $this->isBanned = true;
                }
            }
        }
    }

    public function getTitle() {
        $text = "Ban User";
        if($this->isBanned) {
            $text = 'Unban User';
        }

        return $text;
    }

    public function getIcon() {
        return 'voyager-skull';
    }

    public function getPolicy() {
        return 'edit';
    }

    public function getAttributes() {

        $userClass = "user_".$this->data->{$this->data->getKeyName()};
        $classes = 'btn btn-sm btn-danger pull-right ban_user ' . $userClass;
        if($this->isBanned) {
            $classes = 'btn btn-sm btn-dark pull-right un_ban_user ' . $userClass;
        }

        return [
            'class' => $classes,
            'data-id' => $this->data->{$this->data->getKeyName()},
            'id'      => 'ban-'.$this->data->{$this->data->getKeyName()},
        ];
    }

    public function getDefaultRoute() {
        return 'javascript:;';
    }

    public function shouldActionDisplayOnDataType()
    {
        return $this->dataType->slug == 'users';
    }
}
