import React from "react";
import CalendarHeatmap from 'react-calendar-heatmap';

const today = new Date();

export default (props) => {
    return (
        <CalendarHeatmap
            numDays={120}
            endDate={today}
            values={props.dateCounts}
            classForValue={(value) => {
                if (!value) {
                    return 'color-empty';
                }
                return `color-scale-${value.count}`;
            }}
            showWeekdayLabels={true}
        />
    )
}