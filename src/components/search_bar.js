import React from "react";
import TextSearchInput from './text_search';
import RadioContainer from './radio_container';
import TownSearch from './town_search'

const categories = [
    {val: 'roadside', label: 'Roadside'}, {val: 'urban', label: 'Urban'},
    {val: '', label: 'All'},  {val: 'industrial', label: 'Industrial'}, {val: 'rural', label: 'Rural'}
];

const pm10_levels = [
    {val: 'high', label: 'High PM10'}, {val: '', label: 'All'},
    {val: 'low', label: 'Low PM10'},
];

class SearchBar extends React.Component {
    state = {townOptions: []};

    handleInputChange = (newValue) => {
        const textInput = newValue.replace(/\W/g, '');
        if ( textInput.length > 2 ) {
            console.log(textInput);
            const geoUrl = 'http://api.air-aware.com/sites/town-geo'
            fetch(geoUrl)
                .then(response => response.json())
                .then(data => {
                    let townsOptions = data.filter((dat) => {
                        return dat.name.toLowerCase().startsWith(textInput.toLowerCase());
                    });
                    this.setState({townsOptions});
                    console.log(townsOptions)
                });
        }
    };

    handletownSearch() {
        let towns = [];
        const textInput = this.textInput.value;
        console.log(textInput);
        const geoUrl = 'http://api.air-aware.com/sites/town-geo';
        fetch(geoUrl)
            .then(response => response.json())
            .then(data => {
                towns = data.filter((datum) => {
                    return datum.name.toLowerCase().startsWith(textInput.toLowerCase());
                });
            });
    }
    render() {
        console.log('props highFilter ' + this.props.highFilter)
        console.log('props siteCat ' + this.props.siteCategory)

        return (<>
                <TextSearchInput onFilterTextChange={this.props.onFilterChange}
                                 filterText={this.props.filterText} />
                <RadioContainer radios={pm10_levels}
                                selectedOption={this.props.highFilter}
                                filterCriteria={'high_filter'}
                                onCatFilterChange={this.props.onFilterChange}
                                filterName={'PM10 levels'}/>
                <RadioContainer radios={categories}
                                selectedOption={this.props.siteCategory}
                                filterCriteria={'category'}
                                onCatFilterChange={this.props.onFilterChange}
                                filterName={'site category'}/>
                <TownSearch/>

            </>
        );
    }
}

export default SearchBar;