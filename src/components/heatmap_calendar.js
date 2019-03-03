import CalendarHeatmap from "./air_calendars";
import React from "react";

const today = new Date();

const SiteCatRow = (props) => {
    return <tr><th colSpan="2">{props.category}</th></tr>;
};

const HeatmapCalendars = (props) => {

    const handleClick = (e) => {
        e.preventDefault();
    };

    return (
        <>)
            <td>
                <CalendarHeatmap
                    startDate={shiftDate(today, -150)}
                    endDate={today}
                    values={[
                        {date: '2019-01-01', count: 1},
                        {date: '2019-01-03', count: 4},
                        {date: '2019-01-06', count: 2},
                        {date: '2019-01-11', count: 1},
                        {date: '2019-01-13', count: 4},
                        {date: '2019-01-16', count: 2},
                        // ...and so on
                    ]}
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
                    values={[
                        {date: '2019-01-01', count: 1},
                        {date: '2019-01-03', count: 4},
                        {date: '2019-01-06', count: 2},
                        {date: '2019-01-11', count: 1},
                        {date: '2019-01-13', count: 4},
                        {date: '2019-01-16', count: 2},
                        // ...and so on
                    ]}
                    classForValue={(value) => {
                        if (!value) {
                            return 'color-empty';
                        }
                        return `color-scale-${value.count}`;
                    }}
                    showWeekdayLabels={true}
                />
            </td>
        </>);
};

function shiftDate(date, numDays) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
}

export default HeatmapCalendars;