import React from "react";
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis } from 'victory';

class AirChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: []
        }
    };

    componentDidMount(){
        const url = 'http://api.air-aware.com/data/'.concat(this.props.siteCode, '/24')
        fetch(url)
            .then(response => response.json())
            .then(aqData => {console.log(aqData); this.setState({
                chartData: aqData
            })});
    }

    render() {
        const chartData = this.state.chartData.map(hourlyData => ({
            x: hourlyData.time.split(' ').splice(-1)[0],
            y: parseInt(hourlyData.pm10) || null
        }));
        const maxVal = Math.max(...chartData.map(a => a.y));
        if ( chartData.length > 0 ) {return (
            <VictoryChart
                width={140}
                height={140}
                domain={{ y: [0, maxVal * 1.6] }}
                scale={{ x: "time" }}
                theme={VictoryTheme.material}
                padding={{ top: 10, bottom: 30, left: 30, right: 0 }}
            >
            <VictoryLine
                style={{
                    data: { stroke: "#0074D9" }
                }}
                data={chartData.reverse()}
            />
                <VictoryAxis
                    dependentAxis
                    style={{
                        tickLabels: {
                            fontSize: 3
                        }
                    }}
                />
                <VictoryAxis
                    scale="time"
                    tickCount={7}
                    style={{
                        tickLabels: {
                            fontSize: 3
                        }
                    }}
                />
            </VictoryChart>

        )} return (<p className='loading_text'>Loading...</p>)
    }
}

export default AirChart;