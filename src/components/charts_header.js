import React from "react";

import TimeframeSelect from "../components/timeframe_select";

export default (props) => {
    return (
            <div className="chart_buttons">
                <h5 className='site_name' >{props.siteName}</h5>
                <label className='timeframe_label'>Timeframe: </label>
                <TimeframeSelect
                    timeframe={props.timeframe}
                    handleTimeframeChoice={props.handleTimeframeChoice}
                />
            </div>
    )
};