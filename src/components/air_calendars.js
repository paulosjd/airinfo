import React from "react";
import HeatmapCalendar from './heatmap_calendar'
import CalendarButtons from './calendar_buttons'

import 'react-calendar-heatmap/dist/styles.css';

const pollutants = ['no2', 'pm10', 'pm25', 'ozone'];

class AirCalendars extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pollutant: 'pm10'};
        pollutants.forEach(val => this.setState(
            this.state[val + 'Data'] = [])
        )
    };

    componentDidMount() {
        this.getCalendarData()
    }

    getCalendarData() {
        const url = 'http://api.air-aware.com/stats/highest-sites/'.concat(this.state.pollutant,'/500');
        fetch(url)
            .then(response => response.json())
            .then(aqData => {this.setState({
                [this.state.pollutant + 'Data']: aqData
            })})
            .then(aqD)
    }

    handleButtonClick(e) {
        this.setState({pollutant: e.target.value});
        this.getCalendarData();
    }

    render() {
        const data = this.state[this.state.pollutant + 'Data'];
        const rows = [];
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
        if ( this.state[this.state.pollutant + 'Data'].length > 0 ) {return (
            <>
                <h4>{this.state.pollutant}</h4>
            <CalendarButtons handleClick={this.handleButtonClick.bind(this)} />
            <table>
                <tbody>{rows}</tbody>
            </table>
            </>
        )} return (<p className='loading_text'>Loading...</p>)
    }
}

export default AirCalendars;