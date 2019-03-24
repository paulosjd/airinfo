import React from "react";

export default (props) => {
    const width = props.pollutant === 'no2' ? 60 : 70;
    return (
        <select
            style={{'width': width}}
            className='pollutant_select'
            onChange={(e) => props.handlePollutantChoice(e.target.value)}
            value={props.pollutant}
        >
            <option value='pm10' title="Particulate matter 10">PM10</option>
            <option value='pm25' title="Particulate matter 25">PM25</option>
            <option value='no2' title="Nitrogen dioxide">NO₂</option>
            <option value='ozone' title="Ozone">Ozone</option>
        </select>
    )
}