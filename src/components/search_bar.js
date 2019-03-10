import React from "react";
import TextSearchInput from './text_search';
import RadioContainer from './radio_container';
import TownSearch from './town_search'
import RegionSelect from './region_select'

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            townInput: '',
            townOptions: [],
            isLoading: false
        };
    }

    handleTownInput = (townInput) => {
        this.setState({townInput})
        const textInput = townInput.replace(/\W/g, '');
        if ( textInput.length > 2 ) {
            this.setState({isLoading: true})
            const geoUrl = 'http://api.air-aware.com/sites/town-geo';
            fetch(geoUrl)
                .then(response => response.json())
                .then(data => {
                    let townOptions = data.filter((dat) => {
                        return dat.name.toLowerCase().startsWith(textInput.toLowerCase());
                    });
                    this.setState({townOptions, isLoading: false});
                });
        } else this.setState({townOptions: []})
    };

    resetInput = (field) => {
        if (field === 'town') {
            this.setState({
                townInput: '',
                townOptions: []
            })
        } else if (field === 'text') {
            this.props.resetText();
        }
    };

    render() {
        return (<>
            <button onClick={this.props.onCalendarButtonClick.bind(this)} className='calendar-button'>
                {!this.props.showCalendar ? 'Show calendar heatmap' : 'Show recent charts'}</button>
            <RadioContainer
                radios={pm10_levels}
                selectedOption={this.props.highFilter}
                filterCriteria={'high_filter'}
                onCatFilterChange={this.props.onFilterChange}
                filterName={'PM10 levels'}
            />
            <RadioContainer
                radios={categories}
                selectedOption={this.props.siteCategory}
                filterCriteria={'category'}
                onCatFilterChange={this.props.onFilterChange}
                filterName={'site category'}
            />
            <TextSearchInput
                onFilterTextChange={this.props.onFilterChange}
                filterText={this.props.filterText}
                resetTextInput={this.resetInput.bind(this, 'text')}
            />
            <RegionSelect
                regions={regions}
                siteRegion={this.props.siteRegion}
                onRegionChange={this.props.onFilterChange}
            />
            <TownSearch
                townInput={this.state.townInput}
                townOptions={this.state.townOptions}
                isLoading={this.state.isLoading}
                onTownSearchChange={this.handleTownInput.bind(this)}
                resetTownInput={this.resetInput.bind(this, 'town')}
                resetRegion={this.props.resetRegion}
                handleGeoCoordinatesSearch={this.props.handleGeoCoordinatesSearch}
            />
            </>
        );
    }
}

const categories = [
    {val: '', label: 'All'}, {val: 'urban', label: 'Urban'},  {val: 'roadside', label: 'Traffic'},
    {val: 'rural', label: 'Rural'}, {val: 'industrial', label: 'Industrial'}
];

const pm10_levels = [
    {val: '', label: 'All'}, {val: 'high', label: 'High'},  {val: 'low', label: 'Low'},
];

const regions = [
    {val: 'central-scotland', label: 'Central Scotland'},
    {val: 'east-midlands', label: 'East Midlands'},
    {val: 'greater-london', label: 'Greater London'},
    {val: 'north-east', label: 'North East'},
    {val: 'north-west', label: 'North West'},
    {val: 'northern-ireland', label: 'Northern Ireland'},
    {val: 'south-east', label: 'South East'},
    {val: 'south-wales', label: 'South Wales'},
    {val: 'south-west', label: 'South West'},
    {val: 'west-midlands', label: 'West Midlands'},
    {val: 'yorkshire', label: 'Yorkshire'}
];

export default SearchBar;