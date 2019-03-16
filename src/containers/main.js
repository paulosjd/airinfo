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
            numChoices: [100, 500, 1000],
            calendarDataLoaded: false,
            chartData: [],
        };
    }

    componentDidMount() {
        this.getChartData();
        this.state.numChoices.forEach(num => this.getCalendarData(num))
    }

    getCalendarData(number) {
        const getUrl = (pol) => 'http://api.air-aware.com/stats/highest-sites/'.concat(pol, '/', number);
        let url = getUrl('no2');
        fetch(url)
            .then(response => response.json())
            .then(aqData => {
                this.setState({['no2' + number]: aqData});
            });
        pollutants.filter(val => val !== 'no2').forEach(value => {
            url = getUrl(value);
            fetch(url)
                .then(response => response.json())
                .then(aqData => {
                    this.setState({[value + number]: aqData},
                        () => this.isCalendarDataLoaded(value, number));
                })
        })
    };

    isCalendarDataLoaded(value, number) {
        if (value === 'ozone' && number === 1000){
            this.setState({calendarDataLoaded: true})
        }
    }

    getChartData() {
        const url = 'http://api.air-aware.com/data/'.concat(this.state.siteCode, '/168')
        fetch(url)
            .then(response => response.json())
            .then(aqData => {this.setState({...this.state, chartData: aqData})});
    }

    handleSiteClick(siteCode, siteName) {
        this.setState(
            {...this.state, siteCode, siteName, showCalendar: false},
            this.getChartData)
    }

    handleCalendarButtonClick() {
        if (this.state.calendarDataLoaded) {
            this.setState({...this.state, showCalendar: !this.state.showCalendar})
        }
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

    render() {
        const getDataObject = (str) => {
            let obj = {};
            this.state.numChoices.forEach(num => obj[str + num] = this.state[str + num]);
            return obj
        };
        const siteCode = this.state.siteCode;
        const siteName = this.state.siteName;
        let detail;
        if (this.state.showCalendar) {
            detail = <AirCalendars
                pm10Data={getDataObject('pm10')}
                pm25Data={getDataObject('pm25')}
                no2Data={getDataObject('no2')}
                ozoneData={getDataObject('ozone')}
                pollutant={this.state.pollutant}
                numChoices={this.state.numChoices}
            />}
        else {
            detail = <AirChart
                chartData={this.state.chartData}
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