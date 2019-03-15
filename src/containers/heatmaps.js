import React from "react";
import HeatmapCalendar from '../components/heatmap_calendar'
import CalendarButtons from '../components/calendar_buttons'

import 'react-calendar-heatmap/dist/styles.css';

class AirCalendars extends React.Component {
    state = {
        tooltipMax: false,
        max: null,
        number: 500,
        pollutant: 'no2',
        pm10Data: {},
        pm25Data: {},
        no2Data: {},
        ozoneData: {}

    };

    componentDidMount() {
        this.setState({
                ...this.state,
                pm10Data: this.props.pm10Data,
                pm25Data: this.props.pm25Data,
                no2Data: this.props.no2Data,
                ozoneData: this.props.ozoneData
        })
    }

    handleButtonClick(e) {
        this.setState({pollutant: e.target.value});
    }

    handleNumberChoice(number) {
        this.setState({...this.state, number})
    }

    handleHeatmapClick(e) {
        console.log('click handler called')
        console.log(e)
        this.setState({...this.state, tooltipOption: !this.state.tooltipMax, max: e.max})
    }

    render() {
        console.log(this.state);
        let data = this.state[this.state.pollutant + 'Data'][this.state.pollutant + this.state.number];
        console.log(this.state.pollutant + 'Data')
        console.log(this.state[this.state.pollutant + 'Data'])
        console.log(data)
        if ( !data ) {
            return (<p className='loading_text'>Loading...</p>)
        }
        const rows = [];
        data = data.filter(value => {
            return Object.keys(value.date_counts).length > (this.state.number > 500 ? 3 : 2)});
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
                        date_vals[0].push({date: new Date(key), count: val.count, max: val.max})
                }
                if ( data[i + 1]) {
                    for (let [key, val] of Object.entries(data[i + 1].date_counts)) {
                            date_vals[1].push({date: new Date(key), count: val.count, max: val.max})
                    }
                }
                if (date_vals[1].length > 0){
                    console.log('push')
                rows.push(
                    <React.Fragment key={i + 'key1'}>
                        <tr>{[0, 1].map(n => {
                            return <td key={n}>
                                <HeatmapCalendar
                                    dateCounts={date_vals[n]}
                                    handleHeatmapClick={this.handleHeatmapClick.bind(this)}
                                    tooltipMax={this.state.tooltipMax}
                                /></td>
                        })}
                        </tr>
                    </React.Fragment>
                )
            }}
        });
        if ( this.state[this.state.pollutant + 'Data'][this.state.pollutant + this.state.number].length > 0 ) {return (
            <>
            <CalendarButtons
                handleClick={this.handleButtonClick.bind(this)}
                activeTab={this.props.pollutant}
                number={this.state.number}
                handleNumberChoice={this.handleNumberChoice.bind(this)}
                numChoices={this.props.numChoices}
            />
            <table>
                <tbody>{rows}</tbody>
            </table>
            </>
        )} return (<p className='loading_text'>Loading...</p>)
    }
}

export default AirCalendars;