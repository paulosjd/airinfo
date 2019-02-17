import React, { Component } from 'react';
import FilterableSiteTable from './aq_table';


class App extends Component {
    state = {
      sites: [],
      time: '',
      gps: ''
  };

  handleGeoCoordinatesSearch(gps) {
      console.log('parent handleGeo called');
      console.log(gps);
      console.log('afer')
      this.setState({
        gps: gps
    })
  }

  componentDidMount() {
    const api = 'http://api.air-aware.com/';
    const default_query = 'sites/latest-pm10/';
    let location_url = '';
    if ( this.state.gps ) {
        location_url = 'sites/location-order/'.concat(
            this.state.gps.latitude, '/', this.state.gps.longitude)
        console.log(location_url);
    }
    fetch(api + (location_url || default_query))
        .then(response => response.json())
        .then(data => {this.setState({
          sites: data.site_data,
          time: data.time
        })});
  }

  render() {
      return (
      <div className="App">
        <FilterableSiteTable
            sites={this.state.sites}
            filterText={this.state.filterText}
            handleGeoCoordinatesSearch={this.handleGeoCoordinatesSearch.bind(this)}
        />
      </div>
    );
  }
}

export default App;