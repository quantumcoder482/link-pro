import React, {useState} from 'react';
import IOSSwitch from '../../../Utils/IOSSwitch';
import {updateOfferData} from '@/Services/OfferRequests.jsx';
import {Link} from '@inertiajs/react';

const SwitchOptions = ({offer}) => {

    const [currentOffer, setCurrentOffer] = useState(offer);
    const {id, title, price, active, public_offer, published, slug, course_id} = currentOffer

    const handleChange = (type) => {
        const value = !currentOffer[type];
        let key = type;

        if(type.includes("_")) {
            key = type.split("_")[0];
        }

        const packets = {
            [`${key}`]: value,
        };

        updateOfferData(packets, id).then((response) => {
            if(response.success) {
                setCurrentOffer((prev) => ({
                    ...prev,
                    [`${type}`]: value,
                }))
            }
        });
    }

    return (
        <tr key={id}>
            <td>
                <Link className="blue" href={`/creator-center/course/${course_id}`}> Edit</Link>
                <p>{title}</p>
            </td>
            <td>
                <IOSSwitch
                    onChange={() => handleChange('active')}
                    checked={Boolean(active)}
                    disabled={!Boolean(published)}
                />
            </td>
            <td>
                <IOSSwitch
                    onChange={() => handleChange('public_offer')}
                    checked={Boolean(public_offer)}
                    disabled={!Boolean(published)}
                />
            </td>
            <td>${price || '0.00'}</td>
            <td>${ (Math.round( (price * .80) * 100) / 100).toFixed(2) }</td>
            <td>${ (Math.round( (price * .40) * 100) / 100).toFixed(2) }</td>
        </tr>
    );
};

export default SwitchOptions;
