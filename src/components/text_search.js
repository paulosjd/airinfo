import React from "react";

const TextSearchInput = (props) => {

    const handleFilterTextChange = (e) => {
        props.onFilterTextChange(e.target.value, 'text_filter')
    };

    const handleInputBlur = () => {
        props.resetTextInput()
    };

    return <>
        <div><label htmlFor="text-search">Filter by site name </label></div>
        <div><input name='text-search' type="text" placeholder="Enter name..."
                    className='filter-element'
                    value={props.filterText}
                    onChange={handleFilterTextChange.bind(this)}
                    onBlur={handleInputBlur.bind(this)}/>
        </div>
        </>
};

export default TextSearchInput;