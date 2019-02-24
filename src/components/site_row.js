import React from "react";

const SiteCatRow = (props) => {
    return <tr><th colSpan="2">{props.category}</th></tr>;
};

const SiteRow = (props) => {

    const handleClick = (e) => {e.preventDefault(); console.log(e)}

    return (
        <tr>
            <td><a href="#" className="link" onClick={handleClick}>
                <span>{props.site.name.split(" ").splice(0,2).join(" ")}</span></a></td>
            <td className='pm10_data'>{props.site.pm10}</td>
        </tr>
    );
};

export { SiteCatRow, SiteRow };