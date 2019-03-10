import React from 'react';

const TownSearch = (props) => {

    const handleInputChange = (e) => {
        props.resetRegion();
        props.onTownSearchChange(e.target.value);
    };

    const handleNameClick = (e) => {
        props.resetTownInput()
        const lat = e.target.dataset.latitude;
        const long = e.target.dataset.longitude;
        if (lat && long) {
            props.handleGeoCoordinatesSearch(
                lat.replace('.','_').concat('/', long.replace('.','_')))
        }
    };

    const handleInputBlur = (e) => {
        if (!e.relatedTarget || e.relatedTarget.className !== 'town-option') {
            props.resetTownInput();
        }
    };

    const townMatches = () => {
        if (props.townOptions.length > 0) {
            return props.townOptions.map(town => {
                return (<li key={town.latitude}
                            className='town-option'
                            tabIndex="0"
                            onClick={handleNameClick.bind(this)}
                            data-latitude={town.latitude.toString()}
                            data-longitude={town.longitude.toString()}
                        > {town.name}
                        </li>)
            })
        } else if (props.townInput.length > 2 && props.isLoading === false) {
            return <li className='no_match'>No matches found</li>
        }
    };

    return <>
        <div><label htmlFor="town-search">Order by proximity</label></div>
        <div><input
            placeholder="Enter a UK town"
            name="town-search"
            type='text'
            value={props.townInput}
            onChange={handleInputChange.bind(this)}
            onBlur={handleInputBlur.bind(this)}/>
        </div>
        <ul className='town-matches'>
            {townMatches()}
        </ul>
        </>
};

export default TownSearch;