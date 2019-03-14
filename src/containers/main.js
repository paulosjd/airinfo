import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import SearchBar from './search_bar'
import SiteTable from './site_table'
import AirChart from './charts'
import AirCalendars from './heatmaps'

const pollutants = ['no2', 'pm10', 'pm25', 'ozone'];

const defaultFilters = {
    filterText: '',
    siteRegion: '',
    siteCategory: '',
    highFilter: '',
    townSearch: '',
};

class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...defaultFilters,
            siteCode: 'CLL2',
            siteName: 'London Bloomsbury',
            showCalendar: false,
            pollutant: 'no2',
            number: 500
        };
    }

    componentDidMount() {
        this.getCalendarData()
    }

    getCalendarData() {
        const getUrl = (pol) => 'http://api.air-aware.com/stats/highest-sites/'.concat(pol,'/100');
        let url = getUrl(this.state.pollutant);
        fetch(url)
            .then(response => response.json())
            .then(aqData => {
                this.setState({[this.state.pollutant + 'Data']: aqData});
            });
        pollutants.filter(val => val !== this.state.pollutant).forEach(value => {
            url = getUrl(value);
            fetch(url)
                .then(response => response.json())
                .then(aqData => {
                    this.setState({[value + 'Data']: aqData});
                });
        })
    }

    handleSiteClick(siteCode, siteName) {
        this.setState({...this.state, siteCode, siteName, showCalendar: false})
    }

    handleNumberChoice(number) {
        this.setState({...this.state, number})
    }

    handleCalendarButtonClick() {
        this.setState({showCalendar: !this.state.showCalendar})
    }

    handleFilterInput(val, field) {
        this.resetFilterState();
        switch (field) {
            case ('category'):
                this.setState({
                    siteCategory: val,
                }); break;
            case ('high_filter'):
                this.setState({
                    highFilter: val,
                }); break;
            case ('text_filter'):
                this.setState({
                    filterText: val,
                }); break;
            case ('region'):
                this.setState({
                    siteRegion: val
                }); break;
            default:
                console.log('no condition met')
        }
    }

    resetFilterState() {
        this.setState({...defaultFilters})
    }

    resetRegion() {
        this.setState({siteRegion: '',})
    }

    handleButtonClick(e) {
        this.setState({pollutant: e.target.value});
    }


    render() {
        const siteCode = this.state.siteCode;
        const siteName = this.state.siteName;
        let detail;
        if (this.state.showCalendar) {
            detail = <AirCalendars
                pm10Data={this.state.pm10Data}
                no2Data={this.state.no2Data}
                pm25Data={this.state.pm25Data}
                ozoneData={this.state.ozoneData}
                pollutant={this.state.pollutant}
                handleButtonClick={this.handleButtonClick.bind(this)}
                handleNumberChoice={this.handleNumberChoice.bind(this)}
                number={this.state.number}
            />}
        else {
            detail = <AirChart
                siteCode={siteCode}
                siteName={siteName.split(" ").splice(0,2).join(" ")}
                
            />
        }
        return (
            <div>
                <Grid>
                <Row>
                <Col md={2}>
                <SearchBar
                    filterText={this.state.filterText}
                    highFilter={this.state.highFilter}
                    siteCategory={this.state.siteCategory}
                    siteRegion={this.state.siteRegion}
                    showCalendar={this.state.showCalendar}
                    resetRegion={this.resetRegion.bind(this)}
                    resetText={this.resetFilterState.bind(this)}
                    onCalendarButtonClick={this.handleCalendarButtonClick.bind(this)}
                    onFilterChange={this.handleFilterInput.bind(this)}
                    handleGeoCoordinatesSearch={this.props.handleGeoCoordinatesSearch}
                />
                </Col>
                <Col md={3}>
                <SiteTable
                    sites={this.props.sites.filter(site => site.pm10)}
                    time={this.props.time}
                    filterText={this.state.filterText}
                    highFilter={this.state.highFilter}
                    siteRegion={this.state.siteRegion}
                    siteCategory={this.state.siteCategory}
                    onSiteClick={this.handleSiteClick.bind(this)}
                />
                </Col>
                <Col md={7}>
                    {detail}
                </Col>
                </Row>
                </Grid>
            </div>
        );
    }
}

export default MainContainer;