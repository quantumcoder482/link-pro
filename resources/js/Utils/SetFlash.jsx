import React, {useEffect, useState} from 'react';
import EventBus from '@/Utils/Bus.jsx';
import {Flash} from '@/Utils/Flash.jsx';

const SetFlash = () => {

    const [flash, setFlash] = useState({
        show: false,
        type: '',
        msg: ''
    });

    useEffect(() => {

        EventBus.on('success', (data) => {
            if(data.message) {
                showFlash(true, 'success', data.message.replace(/"/g, ""))
            }
        });

        return () => EventBus.remove("success");

    }, []);

    useEffect(() => {
        EventBus.on('error', (data) => {
            if(data.message) {
                showFlash(true, 'error', data.message.replace(/"/g, ""))
            }
        });

        return () => EventBus.remove("error");

    }, []);

    const showFlash = (show = false, type='', msg='') => {
        setFlash({show, type, msg})
    }

    return (
        <>
            {flash.show &&
                <Flash
                    {...flash}
                    removeFlash={showFlash}
                />
            }
        </>
    );
};

export default SetFlash;
