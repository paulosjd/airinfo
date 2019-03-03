import React from "react";
import CalendarHeatmap from 'react-calendar-heatmap';
import HeatmapCalendar from './heatmap_calendar'

import 'react-calendar-heatmap/dist/styles.css';

const today = new Date();

class AirCalendars extends React.Component {
    constructor(props) {
        super(props);
        this.state = {calendarData: []}
    };

    componentDidMount(){
        this.getCalendarData()
    }

    getCalendarData() {
        let data = null;
        const url = 'http://api.air-aware.com/stats/highest-sites/'.concat('pm10/','500');
        fetch(url)
            .then(response => response.json())
            .then(aqData => {this.setState({calendarData: aqData})});
        fetch(url)
            .then(response => response.json())
            .then(aqData => data = aqData)
            .then()
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
                rows2.push(<><tr key={i + 'cal-key'}>
                    <td><HeatmapCalendar dateCounts={date_vals[0]} />
                    <td><HeatmapCalendar dateCounts={date_vals[1]} />
                        </td>
                        <td>
                            <CalendarHeatmap
                                numDays={120}
                                endDate={today}
                                values={date_vals[1]}
                                classForValue={(value) => {
                                    if (!value) {
                                        return 'color-empty';
                                    }
                                    return `color-scale-${value.count}`;
                                }}
                                showWeekdayLabels={true}
                            />
                        </td>
                        </tr></>)
            }}
        });
        if ( this.state.calendarData.length > 0 ) {return (
            <>
            <div className="btn-group">
                <button className='calendar-option'>Test button 1</button>
                <button className='calendar-option'>Test button 1</button>
                <button className='calendar-option'>Test button 1</button>
            </div>
            <table>
                <tbody>{rows2}</tbody>
            </table>
            </>
        )} return (<p className='loading_text'>Loading...</p>)
    }
}

export default AirCalendars;