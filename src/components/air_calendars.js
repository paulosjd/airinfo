import React from "react";
import HeatmapCalendar from './heatmap_calendar'

import 'react-calendar-heatmap/dist/styles.css';

class AirCalendars extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            calendarData: [],
            pollutant: 'pm10'}
    };

    componentDidMount(){
        this.getCalendarData()
    }

    getCalendarData() {
        const url = 'http://api.air-aware.com/stats/highest-sites/'.concat(this.state.pollutant,'/500');
        fetch(url)
            .then(response => response.json())
            .then(aqData => {this.setState({calendarData: aqData})});
    }

    componentDidUpdate(prevProps){
        if (prevProps.siteCode !== this.props.siteCode) {
            this.getChartData();
        }
    }

    render() {
        const data = this.state.calendarData;
        const rows2 = [];
        data.forEach((value, i) => {
            if ( i % 2 === 0 ) {
                if (data[i + 1]) {
                    rows2.push(
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
                rows2.push(
                    <><tr key={i + 'cal-key'}>
                    <td><HeatmapCalendar dateCounts={date_vals[0]} /></td>
                    <td><HeatmapCalendar dateCounts={date_vals[1]} /></td>
                    </tr></>)
            }}
        });
        if ( this.state.calendarData.length > 0 ) {return (
            <>
            <div id='data_options' className="btn-group calendar-buttons">
                <button value='pm10' className='calendar-option'>PM10</button>
                <button value='pm25' className='calendar-option'>PM25</button>
                <button value='no2' className='calendar-option'>NO<sub>2</sub></button>
                <button value='ozone' className='calendar-option'>Ozone</button>
            </div>
            <table>
                <tbody>{rows2}</tbody>
            </table>
            </>
        )} return (<p className='loading_text'>Loading...</p>)
    }
}

export default AirCalendars;