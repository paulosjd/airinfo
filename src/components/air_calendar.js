import React from "react";
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

class AirCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {calendarData: []}
    };

    componentDidMount(){
        this.getCalendarData()
    }

    getCalendarData() {
        const url = 'http://api.air-aware.com/stats/highest-sites/pm10/500'.concat('',''); // this.props.siteCode, '/168')
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
        const dateFromDateTime = (datetime) => {
            let dtData = datetime.split(/[\s-:]/).map(x => parseInt(x));
            dtData[1]--;
            let date = new Date(...dtData.splice(0,3));
            date.setHours(...dtData);
            return date;
        };
        let chartDataTime = [1]
        if ( chartDataTime.length > 0 ) {return (
            <>
                <div style={{width: 300, height: 200}}>
            <CalendarHeatmap
                startDate={new Date('2016-01-01')}
                endDate={new Date('2016-04-01')}
                values={[
                    { date: '2016-01-01' },
                    { date: '2016-01-22' },
                    { date: '2016-01-30' },
                    // ...and so on
                ]}
            />
                </div>

                </>

        )} return (<p className='loading_text'>Loading...</p>)
    }
}

export default AirCalendar;