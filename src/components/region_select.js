import React from "react";

const RegionSelect = (props) => {

    const handleChange = (e) => {
        props.onRegionChange(e.target.value, 'region')
    };

    return <>
        <div><label>Filter by region</label></div>
        <div><select value={props.siteRegion} className='filter-element' onChange={handleChange.bind(this)}>
                <option value=""> </option>
                {props.regions.map(region => {
                    return (
                        <option
                            key={region.val}
                            value={region.val}>{region.label}</option>
                    );
                })}
            </select>
        </div>
    </>
};

export default RegionSelect;