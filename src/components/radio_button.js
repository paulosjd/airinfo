import React from "react";

const RadioButton = ({val, selected, label, onChange}) => (
    <label className="radio-inline radio-group" key={val} htmlFor={val}>
        <input type="radio" checked={selected} value={val} onChange={onChange} />
        {label}
    </label>
);

export default RadioButton;