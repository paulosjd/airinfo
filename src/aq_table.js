import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import SearchBar from './components/search_bar'
import SiteTable from './components/site_table'


class FilterableSiteTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            siteCategory: '',
            highFilter: '',
            townSearch: ''
        };
    }

    handleFilterInput(val, field) {
        switch (field) {
            case ('category'):
                this.setState({
                    siteCategory: val,
                    highFilter: '',
                }); break;
            case ('high_filter'):
                this.setState({
                    highFilter: val,
                    siteCategory: ''
                }); break;
            case ('text_filter'):
                this.setState({
                    filterText: val,
                }); break;
            default: console.log('no condition met')
        }
    }
    render() {
        return (
            <div>
                <Grid>
                <Row>
                <Col md={4}>
                <SiteTable
                    sites={this.props.sites.filter(site => site.pm10)}
                    filterText={this.state.filterText}
                    highFilter={this.state.highFilter}
                    siteCategory={this.state.siteCategory}
                />
                </Col>
                <Col md={8}>
                    <SearchBar
                        filterText={this.state.filterText}
                        highFilter={this.state.highFilter}
                        siteCategory={this.state.siteCategory}
                        onFilterChange={this.handleFilterInput.bind(this)}
                        handleGeoCoordinatesSearch={this.props.handleGeoCoordinatesSearch}
                    />
                </Col>
                </Row>
                </Grid>
            </div>
        );
    }
}

export default FilterableSiteTable;