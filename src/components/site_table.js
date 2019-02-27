import React, { Component } from "react";
import {Table} from "react-bootstrap";
import { SiteCatRow, SiteRow } from "./site_row"

class SiteTable extends Component {

    getHighest(val) {
        let sites = [...this.props.sites];
        sites.sort(function(a,b) {
            a = parseInt(a.pm10);
            b = parseInt(b.pm10);
            if (a < b) { return 1; }
            else if (a === b) { return 0; }
            else { return -1; }
        });
        if ( val === 'low' ) {
            sites = sites.slice(-10)
        } else {sites = sites.slice(0,10)}
        return sites.map(site => site.id)
    }

    getSites() {
        const filterText = this.props.filterText;
        const orderedSites = this.getHighest(this.props.highFilter);
        return this.props.sites.filter((site) => {
            return (site.name.toLowerCase().indexOf(filterText.toLowerCase()) > -1 &&
                (!this.props.highFilter || orderedSites.includes(site.id)) &&
                (!this.props.siteRegion || site.region === this.props.siteRegion) &&
                (!this.props.siteCategory || site.category === this.props.siteCategory))
        });
    }

    render() {
        const sites = this.getSites();
        const categories = [...new Set(sites.map(item => item.category))];
        const categorizedSites = new Map();
        for (let cat of categories) {
            categorizedSites.set(cat, [])
        }
        sites.forEach(site => {
            categorizedSites.get(site.category).push(site)
        });
        const rows = [];
        for (let cat of categories) {
            rows.push(<SiteCatRow category={cat} key={generateKey(cat)}/>);
            let sites = categorizedSites.get(cat);
            if ( this.props.highFilter ||  this.props.lowFilter) {
                sites.sort((a, b) => a.pm10 - b.pm10);
                if (this.props.highFilter !== 'low') sites.reverse();
            }
            for (let site of sites) {
                rows.push(<SiteRow onSiteClick={this.props.onSiteClick} site={site} key={site.id}/>);
            }
        }
        return (
            <Table striped bordered condensed hover>
                <thead>
                <tr><th className='time_label'><strong>Measured at:</strong><br/>
                    {this.props.time}</th><th id="pm10_header">PM10 (ug/m3)</th></tr>
                </thead>
                <tbody>
                {rows.length > 0 ? rows :
                    !this.props.filterText ? <tr><td className='loading_text'>Loading...</td></tr> :
                        <tr><td>No results found</td></tr>}
                </tbody>
            </Table>
        );
    }
}

const generateKey = (pre) => {
    return `${ pre }_${ new Date().getTime() }`
};

export default SiteTable;