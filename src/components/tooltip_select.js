import React from "react";

export default (props) => {
    const width = props.tooltipChoice === 'count' ? 64 : 85;
    return (
        <select
            style={{'width': width}}
            className='tooltip_select'
            onChange={(e) => props.handleTooltipChoice(e.target.value)}
            value={props.tooltipChoice}>
            <option value='count'>Count</option>
            <option value='max'>Maximum</option>
        </select>
    )
}