import React from "react";

export default (props) => {
    return (
    <>
    <div id='data_options' className="btn-group calendar-buttons">
        {['PM10', 'PM25', 'Ozone'].map(val =>
            <button
                key={val}
                value={val.toLowerCase()}
                className={props.activeTab === val.toLowerCase() ? 'calendar-option-active' : 'calendar-option'}
                onClick={props.handleClick}
            >{val}</button>
        )}
        <button
            value='no2'
            onClick={props.handleClick}
            className={props.activeTab === 'no2' ? 'calendar-option-active' : 'calendar-option'}
        >NO<sub>2</sub></button>
        <label className='heatmap_info'>Highest 500 hourly measurements</label>
    </div>
    </>
    )
};