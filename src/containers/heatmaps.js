import React from "react";
import HeatmapCalendar from '../components/heatmap_calendar'
import CalendarButtons from '../components/calendar_buttons'

import 'react-calendar-heatmap/dist/styles.css';

class AirCalendars extends React.Component {
    state = {
        number: 500,
        pollutant: 'no2',
        pm10Data: this.props.pm10Data,
        pm25Data: this.props.pm25Data,
        no2Data: this.props.no2Data,
        ozoneData: this.props.ozoneData,
        tooltipChoice: 'count'
    };

    handleButtonClick(e) {
        this.setState({...this.state, pollutant: e.target.value});
    }

    handleNumberChoice(number) {
        this.setState({...this.state, number})
    }

    handleTooltipChoice(tooltipChoice) {
        this.setState({...this.state, tooltipChoice})
    }

    render() {
        let aqData = this.state[this.state.pollutant + 'Data'][this.state.pollutant + this.state.number];
        if ( !aqData ) {
            return (<p className='loading_text'>Loading...</p>)
        }
        const rows = [];
        aqData = aqData.filter(value => {
            return Object.keys(value.date_counts).length >
                (this.state.number > 500 ? 3 : aqData.leftBounds >15 ? 2 : 1)});
        aqData.forEach((value, i) => {
            if ( i % 2 === 0 ) {
                if (aqData[i + 1]) {
                    rows.push(
                        <tr key={i}>
                            <td><h5 className='heatmap_label'>{value.name}</h5></td>
                            <td><h5 className='heatmap_label'>{aqData[i + 1] ? aqData[i + 1].name : ''}</h5></td>
                        </tr>);
                }
                const date_vals = [[], []];
                for (let [key, val] of Object.entries(value.date_counts)) {
                        date_vals[0].push({date: new Date(key), count: val.count, max: val.max})
                }
                if ( aqData[i + 1]) {
                    for (let [key, val] of Object.entries(aqData[i + 1].date_counts)) {
                            date_vals[1].push({date: new Date(key), count: val.count, max: val.max})
                    }
                }
                if (date_vals[1].length > 0){
                    rows.push(
                        <React.Fragment key={i + 'key1'}>
                            <tr>{[0, 1].map(n => {
                                return <td key={n}>
                                    <HeatmapCalendar
                                        tooltipChoice={this.state.tooltipChoice}
                                        dateCounts={date_vals[n]}
                                    />
                                    </td>
                            })}
                            </tr>
                        </React.Fragment>
                )
            }}
        });
        if ( this.state[this.state.pollutant + 'Data'][this.state.pollutant + this.state.number].length > 0 ) {
            return (
                <>
                <CalendarButtons
                    handleClick={this.handleButtonClick.bind(this)}
                    activeTab={this.props.pollutant}
                    number={this.state.number}
                    handleNumberChoice={this.handleNumberChoice.bind(this)}
                    numChoices={this.props.numChoices}
                    tooltipChoice={this.state.tooltipChoice}
                    handleTooltipChoice={this.handleTooltipChoice.bind(this)}
                />
                <table>
                    <tbody>{rows}</tbody>
                </table>
                </>
        )} return (<p className='loading_text'>Loading...</p>)
    }
}

export default AirCalendars;