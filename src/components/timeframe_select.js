import React from "react";

export default (props) => {
    const width = props.timeframe === 'weekly' ? 62 : props.timeframe === 'trimonthly' ? 78 : 71;
    return (
        <select
            style={{'width': width}}
            className='timeframe_select'
            onChange={(e) => props.handleTimeframeChoice(e.target.value)}
            value={props.timeframe}
        >
            <option value='weekly'>Weekly</option>
            <option value='monthly'>4 Weeks</option>
            <option value='bimonthly'>8 Weeks</option>
            <option value='trimonthly'>12 Weeks</option>
        </select>
    )
}