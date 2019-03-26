import React from "react";
import { VictoryLine, VictoryChart, VictoryAxis, VictoryLabel } from 'victory';
import ChartsHeader from "../components/charts_header";

const oneWeekMeta = [
    {text: '24 hours', numHours: 24},
    {text: '2 days', numHours: 48},
    {text: '3 days', numHours: 72},
    {text: '7 days', numHours: 168},
];

const mapToMeta = (ary) => ary.map(value => {
    return {text: `${value[0]} week${value[0] === '1' ? '' : 's'}`, numHours: value[1]}
    });

const fourWeekMeta = mapToMeta([['1', 168], ['2', 2 * 168], ['3', 3 * 168], ['4', 4 * 168]]);
const eightWeekMeta = mapToMeta([['1', 168], ['4', 4 * 168], ['6', 6 * 168], ['8', 8 * 168]]);
const twelveWeekMeta = mapToMeta([['1', 168], ['6', 6 * 168], ['9', 96 * 168], ['12', 12 * 168]]);

const AirChart = (props) => {

    const dateFromDateTime = (datetime) => {
            let dtData = datetime.split(/[\s-:]/).map(x => parseInt(x));
            dtData[1]--;
            let date = new Date(...dtData.splice(0,3));
            date.setHours(...dtData);
            return date;
    };
    const chartDataTime = props.chartData.map(hourlyData => ({
        x: hourlyData.time.split(' ').splice(-1)[0],
        y: parseInt(hourlyData[props.pollutant]) || null
    }));
    const chartDataDate = props.chartData.map(hourlyData => ({
        x: dateFromDateTime(hourlyData.time),
        y: parseInt(hourlyData[props.pollutant]) || null
    }));
    const maxVal = Math.max(...chartDataTime.map(a => a.y));
    const minVal = Math.min(...chartDataTime.map(a => a.y));
    let chartMeta = oneWeekMeta;
    switch (props.timeframe) {
        case ('trimonthly'):
            chartMeta = twelveWeekMeta;
            break;
        case ('bimonthly'):
            chartMeta = eightWeekMeta;
            break;
        case ('monthly'):
            chartMeta = fourWeekMeta;
            break;
        default:
            chartMeta = oneWeekMeta;
    }

    if ( chartDataTime.length > 0 ) {
        return (
        <>
        <ChartsHeader
            activeTab={props.pollutant}
            handleClick={props.handlePollutantClick}
            siteName={props.siteName}
            timeframe={props.timeframe}
            handleTimeframeChoice={props.handleTimeframeChoice}
        />
        <div style={{ display: "flex", flexWrap: "wrap" }}>
        {chartMeta.map(obj =>
            <VictoryChart
                key={obj.text}
                width={140}
                height={140}
                domain={{ y: [minVal * 0.76, maxVal * 1.36] }}
                scale={{ x: "time" }}
                style={{ parent: { maxWidth: "50%"} }}
                padding={{ top: 10, bottom: 30, left: 30, right: 0 }}
            >
                <VictoryLabel
                    text={props.chartLoading ? '': obj.text} x={45} y={30}
                    style={{
                        textAnchor: "start",
                        verticalAnchor: "end",
                        fill: "lightslategrey",
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
                    tickCount={obj.numHours === 24 ? 3 : 3}
                    style={{ tickLabels: {fontSize: 5, padding: 2} }}
                />
            </VictoryChart>
            )}
        </div>
        </>
    )} return (<p className='loading_text'>Loading...</p>)
};

export default AirChart;