import React from "react";

export default (props) => {
    const width = props.number === '1000' ? 60 : 52;
    return (
        <select
            style={{'width': width}}
            className='number_select'
            onChange={(e) => props.handleNumberChoice(e.target.value)}
            value={props.number}>
            {props.numChoices.map((num) => {
                return <option key={num} value={num}>{num}</option>})}
        </select>
    )
}