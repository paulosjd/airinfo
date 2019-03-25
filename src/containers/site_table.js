import React from "react";
import {Table} from "react-bootstrap";
import PollutantSelect from '../components/pollutant_select'
import {SiteCatRow, SiteRow} from "../components/site_row";

const SiteTable = (props) => {

    const getSites = () =>{
        let sites = [...props.sites];
        const filterText = props.filterText;
        if (props.highFilter) {
            sites.sort((a, b) => a[props.pollutant] - b[props.pollutant]);
            if ( props.highFilter === 'low' ) {
                sites = sites.slice(0,10)
            } else {sites = sites.slice(-10).reverse()}
        }
        return sites.filter((site) => {
            return (
                site.name.toLowerCase().indexOf(filterText.toLowerCase()) > -1 &&
                (!props.siteRegion || site.region === props.siteRegion) &&
                (!props.siteCategory || site.category === props.siteCategory))
        });
    };

    const getTableRows = () => {
        const sites = getSites();
        const categories = [...new Set(sites.map(item => item.category))];
        const categorizedSites = new Map();
        for (let cat of categories) {
            categorizedSites.set(cat, [])
        }
        sites.forEach(site => {
            categorizedSites.get(site.category).push(site)
        });
        const rows = [];
        let first = true;
        for (let cat of categories) {
            rows.push(<SiteCatRow
                category={cat}
                isFirst={first}
                key={generateKey(cat)}
            />);
            first = false;
            let sites = categorizedSites.get(cat);
            for (let site of sites) {
                rows.push(<SiteRow
                    pollutant={props.pollutant}
                    onSiteClick={props.onSiteClick}
                    site={site} key={site.id}
                />);
            }
        }
        if (rows.length < 1){
            return !props.filterText ? <tr><td className='loading_text'>Loading...</td></tr> :
                <tr><td>No results found</td></tr>}
        return rows
    };

    return (
        <Table striped bordered condensed hover>
            <thead>
            <tr><th className='time_label'> <br/>
                {props.time}</th><th id="pm10_header">
                <PollutantSelect
                    pollutant={props.pollutant}
                    handlePollutantChoice={props.handlePollutantChoice}
                />
            </th></tr>
            </thead>
            <tbody>
              { getTableRows() }
            </tbody>
        </Table>
    );
};

const generateKey = (pre) => {
    return `${ pre }_${ new Date().getTime() }`
};

export default SiteTable;