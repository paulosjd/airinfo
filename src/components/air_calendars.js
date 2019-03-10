import React from "react";
import HeatmapCalendar from './heatmap_calendar'
import CalendarButtons from './calendar_buttons'

import 'react-calendar-heatmap/dist/styles.css';

class AirCalendars extends React.Component {

    render() {
        let data = this.props[this.props.pollutant + 'Data'];
        const rows = [];
        if ( !data ) {
            return (<p className='loading_text'>Loading...</p>)
        }
        data = data.filter(value => {return Object.keys(value.date_counts).length  > 1});
        data.forEach((value, i) => {
            if ( i % 2 === 0 ) {
                if (data[i + 1]) {
                    rows.push(
                        <tr key={i}>
                            <td><h5 className='heatmap_label'>{value.name}</h5></td>
                            <td><h5 className='heatmap_label'>{data[i + 1] ? data[i + 1].name : ''}</h5></td>
                        </tr>);
                }
                const date_vals = [[], []];
                for (let [key, val] of Object.entries(value.date_counts)) {
                        date_vals[0].push({date: new Date(key), count: val})
                }
                if ( data[i + 1]) {
                    for (let [key, val] of Object.entries(data[i + 1].date_counts)) {
                            date_vals[1].push({date: new Date(key), count: val})
                    }
                }
                if (date_vals[1].length > 0){
                rows.push(
                    <React.Fragment key={i + 'key1'}>
                        <tr>
                            <td><HeatmapCalendar dateCounts={date_vals[0]} /></td>
                            <td><HeatmapCalendar dateCounts={date_vals[1]} /></td>
                        </tr>
                    </React.Fragment>
                )
            }}
        });
        if ( this.props[this.props.pollutant + 'Data'].length > 0 ) {return (
            <>
            <CalendarButtons
                handleClick={this.props.handleButtonClick}
                activeTab={this.props.pollutant}
            />
            <table>
                <tbody>{rows}</tbody>
            </table>
            </>
        )} return (<p className='loading_text'>Loading...</p>)
    }
}

export default AirCalendars;