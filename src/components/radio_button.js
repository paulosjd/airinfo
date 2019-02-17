import React from "react";

const RadioButton = ({key, selected, label, onChange}) => (
    <label className="radio-inline radio-group" key={key} htmlFor={key}>
        <input id={key} type="radio" checked={selected} value={key} onChange={onChange} />
        {label}
    </label>
);

export default RadioButton;