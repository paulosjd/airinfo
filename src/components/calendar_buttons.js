import React from "react";

export default (props) => {
    return (
    <div id='data_options' className="btn-group calendar-buttons">
        {['PM10', 'PM25', 'Ozone'].map(val =>
            <button
                key={val}
                value={val.toLowerCase()}
                className='calendar-option'
                onClick={props.handleClick}
            >{val}</button>
        )}
        <button value='no2' onClick={props.handleClick} className='calendar-option'>NO<sub>2</sub></button>
    </div> )
};