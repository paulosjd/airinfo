import React, { Component } from 'react';
import FilterableSiteTable from './aq_table';

const initialState = {
    sites: [],
    time: '',
    geoUrl: '',
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    reset() {
        this.setState(initialState);
    }
    handleGeoCoordinatesSearch(val) {
        this.reset();
        this.fetchData(val)
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData (coordinates){
        const api = 'http://api.air-aware.com/';
        const default_query = 'sites/latest-pm10/';
        let location_url = '';
        if ( coordinates ) {
            location_url = 'sites/location-order/'.concat(coordinates);
            console.log(location_url);
    }
        fetch(api + (location_url || default_query))
            .then(response => response.json())
            .then(data => {this.setState({
                sites: data.site_data.filter(x => x),
                time: data.time
            })});
    }

    render() {
        return (
        <div className="App">
            <FilterableSiteTable
                sites={this.state.sites}
                time={this.state.time}
                filterText={this.state.filterText}
                handleGeoCoordinatesSearch={this.handleGeoCoordinatesSearch.bind(this)}
            />
        </div>
        )
    }
}

export default App;