import {Link} from '@inertiajs/react';

const DowngradeAlert = () => {

    return (
        <div className="icon_message">
            <p>Your plan has been downgraded to Free. Your link will only display up to 8 icons max, any custom icons you used will have to be changed to use our standard icons and any folders you added will not be shown.</p>
            <Link className="button blue" href={route('plans.get')}>Upgrade</Link>
        </div>
    )
}

export default DowngradeAlert;
