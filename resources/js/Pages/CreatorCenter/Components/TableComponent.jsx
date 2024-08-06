import React, {useRef} from 'react';
import ToolTipIcon from '@/Utils/ToolTips/ToolTipIcon';
import SwitchOptions from './SwitchOptions';
import InfoText from '@/Utils/ToolTips/InfoText';

const TableComponent = ({offers}) => {

    const table_wrap = useRef(null);

    return (
        <div className="my_row">
            <div className="table_wrap my_row table-responsive" ref={table_wrap}>
                <table className="table table-borderless" role="table">
                    <thead>
                    <tr>
                        <th scope="col">
                            <h5>
                                <span>Courses</span>
                            </h5>
                        </th>
                        <th scope="col">
                            <h5>
                                <span>Active</span>
                                <ToolTipIcon section="creator_active" />
                            </h5>
                        </th>
                        <th scope="col">
                            <h5>
                                <span>Public</span>
                                <ToolTipIcon section="creator_public" />
                            </h5>

                        </th>
                        <th scope="col">
                            <h5>
                                <span>Price</span>
                            </h5>
                        </th>
                        <th scope="col">
                            <h5>
                                <span>PRP</span>
                                <ToolTipIcon section="creator_prp" />
                            </h5>

                        </th>
                        <th scope="col">
                            <h5>
                                <span>ARP</span>
                                <ToolTipIcon section="creator_arp" />
                            </h5>

                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {offers?.map((offer) => {
                        return (
                            <SwitchOptions
                                key={offer.id}
                                offer={offer}
                            />
                        )
                    })}
                    </tbody>
                </table>
            </div>
            <InfoText
                divRef={table_wrap}
            />
        </div>
    );
};

export default TableComponent;
