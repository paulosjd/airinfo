import React from "react";

import TimeframeSelect from "../components/timeframe_select";

export default (props) => {
    return (
            <div className="chart_buttons">
                <h5 className='site_name' >{props.siteName}</h5>
                <TimeframeSelect
                    timeframe={props.timeframe}
                    handleTimeframeChoice={props.handleTimeframeChoice}
                />
                <div className='pollutant_buttons'>
                {['PM10', 'PM25', 'Ozone'].map(val =>
                    <button
                        key={val}
                        value={val.toLowerCase()}
                        className={props.activeTab === val.toLowerCase() ? 'calendar-option-active' : 'calendar-option'}
                        onClick={props.handleClick}
                    >{val}</button>)}
                <button
                    value='no2'
                    onClick={props.handleClick}
                    className={props.activeTab === 'no2' ? 'calendar-option-active' : 'calendar-option'}
                >NO<sub>2</sub></button>
                </div>
            </div>
    )
};