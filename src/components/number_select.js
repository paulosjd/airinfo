import React from "react";

export default (props) => {
    return (
        <>
        <select className='number_select' onChange={props.handleNumberChoice} value={props.number}>
            <option value={100}>100</option>
            <option value={500}>500</option>
            <option value={1000}>1000</option>
        </select>
        </>
    )
}