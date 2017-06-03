import React from 'react';

const Statistics = ({
    twentyFourHourBloodSugar,
    twentyFourHourAvg,
    lastFiftyBloodSugar
}) => {
    return (
        <div>
            <h1 className="text-center">Health Analytics Page</h1>
            <p>24 Hour Blood Sugar: {twentyFourHourBloodSugar}</p>
            <p>24 Hour Avg: {twentyFourHourAvg}</p>
            <p>Last 50 Blood Sugars: {lastFiftyBloodSugar}</p>
        </div>
    );
};

export default Statistics;
