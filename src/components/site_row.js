import React from "react";

const SiteCatRow = (props) => {
    if (props.isFirst) {
        return <tr><th colSpan="2">{props.category}
            <span style={{float: 'right', color: 'dimgrey', marginRight: 16, fontWeight: 'normal'}}>
                μg/m3</span></th></tr>;
    } return <tr><th colSpan="2">{props.category}</th></tr>;
};

const SiteRow = (props) => {
    const handleClick = (e) => {
        e.preventDefault();
        const siteCode = e.currentTarget.dataset.sitecode;
        const siteName = e.currentTarget.dataset.sitename;
        props.onSiteClick(siteCode, siteName);
        window.scrollTo(0, 0);
    };

    const siteNameDisplay = (siteName) => {
        if (siteName.startsWith("Bristol")){
            return siteName;
        } else if (siteName.endsWith("Kensington")){
            return 'London Nth. Kens.';
        } else if (siteName.startsWith("Stanford") || siteName.startsWith("Stockton")) {
            return siteName.split(" ").splice(0, 1)[0];
        } else return siteName.split(" ").splice(0,2).join(" ")
    };

    return (
        <tr>
            <td><a href={'/' + props.site.site_code} className="link" onClick={handleClick}
                   data-sitecode={props.site.site_code}
                   data-sitename={props.site.name}
                >
                <span>{siteNameDisplay(props.site.name)}</span></a></td>
            <td className='pm10_data'>{props.site[props.pollutant]}</td>
        </tr>
    );
};

export { SiteCatRow, SiteRow };