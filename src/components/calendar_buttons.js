import React from "react";
import NumberSelect from './number_select'
import TooltipSelect from './tooltip_select'

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
        <label className='heatmap_info'>Highest hourly measurements</label>
        <NumberSelect
            id='num_select'
            number={props.number}
            handleNumberChoice={props.handleNumberChoice}
            numChoices={props.numChoices}
        />
        <label className='heatmap_info'>on hover</label>
        <TooltipSelect
            handleTooltipChoice={props.handleTooltipChoice}
            tooltipChoice={props.tooltipChoice}
        />
    </div>
    </>
    )
};