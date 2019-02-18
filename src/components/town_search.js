import React from 'react';

const TownSearch = (props) => {

    const handleInputChange = (e) => {
        props.resetRegion();
        const lat = e.target.dataset.latitude;
        const long = e.target.dataset.longitude;
        props.onTownSearchChange(lat.concat('_', long));
    };

    const handleNameClick = (e) => {
        console.log('handle name click ' + e.target.value);
        props.handleGeoCoordinatesSearch(e.target.value)
    };

    const handleInputBlur = (e) => {
        if (e.relatedTarget.className !== 'town-option') {
            props.resetTownInput(e.target.value);
        }
    };

    return <>
        <div><label htmlFor="town-search">Order by closest proximity</label></div>
        <div><input
            placeholder="Enter a UK town"
            name="town-search"
            type='text'
            value={props.townInput}
            onChange={handleInputChange.bind(this)}
            onBlur={handleInputBlur.bind(this)}/>
        </div>
        <ul className='town-matches'>
            {props.townOptions.map(town => {
                return (
                    <li key={town.latitude}
                        className='town-option'
                        tabIndex="0"
                        onClick={handleNameClick.bind(this)}
                        data-latitude={town.latitude.toString()}
                        data-longitude={town.longitude.toString()}
                        value={town.latitude.toString().concat('_', town.longitude)}
                        >{town.name}
                    </li>
                );
            })}
        </ul>
        </>
};

export default TownSearch;