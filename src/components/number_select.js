import React from "react";

export default (props) => {
    return (
        <select
            className='number_select'
            onChange={(e) => props.handleNumberChoice(e.target.value)}
            value={props.number}>
            {props.numChoices.map((num) => {
                return <option key={num} value={num}>{num}</option>})}
        </select>
    )
}