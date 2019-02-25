import React from "react";

const SiteCatRow = (props) => {
    return <tr><th colSpan="2">{props.category}</th></tr>;
};

const SiteRow = (props) => {

    const handleClick = (e) => {
        e.preventDefault();
        const siteCode = e.currentTarget.dataset.sitecode;
        const siteName = e.currentTarget.dataset.sitename;
        props.onSiteClick(siteCode, siteName);
        window.scrollTo(0, 0);
    };

    return (
        <tr>
            <td><a href="#" className="link" onClick={handleClick}
                   data-sitecode={props.site.site_code}
                   data-sitename={props.site.name}
                >
                <span>{props.site.name.split(" ").splice(0,2).join(" ")}</span></a></td>
            <td className='pm10_data'>{props.site.pm10}</td>
        </tr>
    );
};

export { SiteCatRow, SiteRow };