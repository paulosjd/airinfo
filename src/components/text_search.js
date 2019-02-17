import React from "react";

const TextSearchInput = (props) => {
    const handleFilterTextChange = (e) => {
        props.onFilterTextChange(e.target.value, 'text_filter')
    };
    return <>
        <p><div><label for="text-search">Filter by site name </label></div>
        <div><input name='text-search' type="text" placeholder="Enter name..."
                    value={props.filterText}
                    onChange={handleFilterTextChange.bind(this)} /></div></p>
        </>
};

export default TextSearchInput;