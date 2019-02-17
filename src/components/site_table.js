import React, { Component } from "react";
import {Table} from "react-bootstrap";


const SiteCatRow = (props) => {
    return <tr><th colSpan="2">{props.category}</th></tr>;
};

const SiteRow = (props) => {
    const site = props.site;
    const name = site.exceedance ?
        <span style={{color: 'red'}}>{site.name}</span> :
        site.name;
    return (
        <tr>
            <td>{name}</td>
            <td>{site.pm10}</td>
        </tr>
    );
};

const generateKey = (pre) => {
    return `${ pre }_${ new Date().getTime() }`
};

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
                (!this.props.isExceedance || orderedSites.includes(site.id)) &&
                (!this.props.highFilter || orderedSites.includes(site.id)) &&
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
            for (let site of categorizedSites.get(cat)) {
                rows.push(<SiteRow site={site} key={site.id}/>);
            }
        }
        return (
            <Table striped bordered condensed hover>
                <thead>
                <tr><th>Site Name</th><th id="pm10_header">PM10 (ug/m3)</th></tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        );
    }
}

export default SiteTable;