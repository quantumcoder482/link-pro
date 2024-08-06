import React, {useContext, useRef, useState} from 'react';
import {updateProfileLayout} from '@/Services/PageRequests.jsx';
import {PageContext} from '../../Dashboard.jsx';
import ToolTipIcon from '@/Utils/ToolTips/ToolTipIcon';

function PageHeaderLayout({pageHeaderRef}) {

    const {pageSettings} = useContext(PageContext);
    const [layout, setLayout] = useState(pageSettings['profile_layout']);

    const setRadioValue = (value) => {

        const packets = {
            profileLayout: value
        }

        updateProfileLayout(packets, pageSettings['id'])
        .then((response) => {
            console.log(response.message);
            setLayout(value);
        })

        pageHeaderRef.current.id = value;
    }

    return (
        <div className="edit_form">
            <form className="layouts">
                <div className="radio_wrap">
                    <label htmlFor="layout_one">
                        <input type="radio" value="layout_one" name="layout"
                               checked={layout === 'layout_one'}
                               onChange={(e) => {setRadioValue(e.target.value) }}
                        />
                        Layout 1
                    </label>
                    <img src={Vapor.asset('images/layout-1.png')} alt=""/>
                </div>
                <div className="radio_wrap">
                    <label htmlFor="layout_two">
                        <input type="radio" value="layout_two" name="layout"
                               checked={layout === 'layout_two'}
                               onChange={(e) => {setRadioValue(e.target.value) }}
                        />
                        Layout 2
                    </label>
                    <img src={Vapor.asset('images/layout-2.png')} alt=""/>
                </div>
                <div className="radio_wrap">
                    <label htmlFor="layout_three">
                        <input type="radio" value="layout_three" name="layout"
                               checked={layout === 'layout_three'}
                               onChange={(e) => {setRadioValue(e.target.value) }}
                        />
                        Layout 3
                    </label>
                    <img src={Vapor.asset('images/layout-3.png')} alt=""/>
                </div>
            </form>

            <ToolTipIcon section="layout" />

        </div>
    );
}

export default PageHeaderLayout;
