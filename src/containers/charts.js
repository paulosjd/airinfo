import React from "react";
import { VictoryLine, VictoryChart, VictoryAxis, VictoryLabel } from 'victory';

class AirChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {chartData: this.props.chartData}
    };

    componentDidUpdate(prevProps){
        if (prevProps.siteCode !== this.props.siteCode) {
            this.getChartData();
        }
    }

    render() {
        console.log(this.props.chartData)
        const dateFromDateTime = (datetime) => {
            let dtData = datetime.split(/[\s-:]/).map(x => parseInt(x));
            dtData[1]--;
            let date = new Date(...dtData.splice(0,3));
            date.setHours(...dtData);
            return date;
        };
        let chartDataTime = this.props.chartData.map(hourlyData => ({
            x: hourlyData.time.split(' ').splice(-1)[0],
            y: parseInt(hourlyData.pm10) || null
        }));
        let chartDataDate = this.props.chartData.map(hourlyData => ({
            x: dateFromDateTime(hourlyData.time),
            y: parseInt(hourlyData.pm10) || null
        }));
        const maxVal = Math.max(...chartDataTime.map(a => a.y));
        const minVal = Math.min(...chartDataTime.map(a => a.y));
        const dateChartData = [
            {text: '2 days', numHours: 48}, {text: '3 days', numHours: 72}, {text: 'Week', numHours: 168},
        ];
        if ( chartDataTime.length > 0 ) {return (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
            <VictoryChart
                width={140}
                height={140}
                domain={{ y: [minVal * 0.76, maxVal * 1.6] }}
                scale={{ x: "time" }}
                style={{ parent: { maxWidth: "50%" } }}
                padding={{ top: 10, bottom: 30, left: 30, right: 0 }}
            >
                <VictoryLabel
                    text={`${this.props.siteName} - Past 24 hours`} x={37} y={30} textAnchor="middle"
                    style={{
                        textAnchor: "start",
                        verticalAnchor: "end",
                        fill: "#000000",
                        fontFamily: "inherit",
                        fontSize: "6px",
                    }}
                />
                <VictoryLine
                    style={{ data: { stroke: "gold", strokeWidth: 1} }}
                    interpolation="natural"
                    data={chartDataTime.slice(0, 24).reverse()}
                    animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 }
                    }}
                />
                <VictoryAxis
                    dependentAxis
                    style={{ tickLabels: {fontSize: 5, padding: 2} }}
                />
                <VictoryAxis
                    scale="time"
                    tickCount={7}
                    style={{ tickLabels: {fontSize: 5, padding: 2} }}
                />
            </VictoryChart>
            {dateChartData.map(obj =>
                <VictoryChart
                    key={obj.text}
                    width={140}
                    height={140}
                    domain={{ y: [minVal * 0.76, maxVal * 1.6] }}
                    scale={{ x: "time" }}
                    style={{ parent: { maxWidth: "50%"} }}
                    padding={{ top: 10, bottom: 30, left: 30, right: 0 }}
                >
                    <VictoryLabel
                        text={obj.text} x={45} y={30} textAnchor="middle"
                        style={{
                            textAnchor: "start",
                            verticalAnchor: "end",
                            fill: "#000000",
                            fontFamily: "inherit",
                            fontSize: "6px",
                        }}
                    />
                    <VictoryLine
                        style={{data: { stroke: "gold", strokeWidth: 1}}}
                        interpolation="natural"
                        data={chartDataDate.slice(0, obj.numHours).reverse()}
                        animate={{
                            duration: 2000,
                            onLoad: { duration: 1000 }
                        }}
                    />
                    <VictoryAxis dependentAxis style={{ tickLabels: {fontSize: 5, padding: 2 }}}/>
                    <VictoryAxis
                        scale="time"
                        tickCount={3}
                        style={{ tickLabels: {fontSize: 5, padding: 2} }}
                    />
                </VictoryChart>
                )}
            </div>
        )} return (<p className='loading_text'>Loading...</p>)
    }
}

export default AirChart;