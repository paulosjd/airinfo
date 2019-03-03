import React from "react";
import CalendarHeatmap from 'react-calendar-heatmap';

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
        const url = 'http://api.air-aware.com/stats/highest-sites/'.concat('pm10/','200');
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
        const rows2 = []
        data.forEach((value, i) => {
            if ( i % 2 === 0 ) {
                rows2.push(
                    <tr>
                        <td><h5 className='heatmap_label'>{value.name}</h5></td>
                        <td><h5 className='heatmap_label'>{data[i + 1] ? data[i + 1].name : ''}</h5></td>
                    </tr>);
                const date_vals_1 = [];
                const date_vals_2 = [];
                for (let [key, val] of Object.entries(value.date_counts)) {
                        date_vals_1.push({date: new Date(key), count: val})
                }

                if ( data[i + 1]) {
                    for (let [key, val] of Object.entries(data[i + 1].date_counts)) {
                            date_vals_2.push({date: new Date(key), count: val})
                    }
                }
                console.log(date_vals_1)
                console.log(date_vals_2)
                rows2.push(
                    <tr>
                        <td>
                            <CalendarHeatmap
                                startDate={shiftDate(today, -150)}
                                endDate={today}
                                values={date_vals_1}
                                classForValue={(value) => {
                                    if (!value) {
                                        return 'color-empty';
                                    }
                                    return `color-scale-${value.count}`;
                                }}
                                showWeekdayLabels={true}
                            />
                        </td>
                        <td>
                            <CalendarHeatmap
                                startDate={shiftDate(today, -150)}
                                endDate={today}
                                values={date_vals_1}
                                classForValue={(value) => {
                                    if (!value) {
                                        return 'color-empty';
                                    }
                                    return `color-scale-${value.count}`;
                                }}
                                showWeekdayLabels={true}
                            />
                        </td>
                        </tr>)
            }
        });

        if ( this.state.calendarData.length > 0 ) {return (
            <>
            <table>
                <thead>
                <tr>
                </tr>
                </thead>
                <tbody>
                {rows2}
                </tbody>
            </table>
            </>
        )} return (<p className='loading_text'>Loading...</p>)
    }
}

function shiftDate(date, numDays) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
}

export default AirCalendars;