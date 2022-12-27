import React, { useCallback, useEffect, useState } from 'react'
import TemperatureBlock from './temperature_block';
import Ruler from '../../../Assets/AMS-Modelling-Assets/Ruler.png'

function getAverageTemp(temperatureArray){
    var result = 0;
    temperatureArray.forEach(element => {
        result += element
    });
    return parseInt(result / temperatureArray.length);
}

function METempGraph({temperatureArray}) {
    return (
        <div className='whiteBox-splitComp'>
            <div className='ME-noBorder'>
                {"AVG. TEMP "} 
                <div style={{color: '#ff0000', paddingLeft : 5, paddingRight : 5}}> {getAverageTemp(temperatureArray)} </div> 
                {'°C'}
            </div>
            <div className='ME-temp'>
                <img src={Ruler} />
                <TemperatureBlock name={"TURBO IN"} temperature={temperatureArray[0]} />
                <TemperatureBlock name={"C1"} temperature={temperatureArray[1]} />
                <TemperatureBlock name={"C2"} temperature={temperatureArray[2]} />
                <TemperatureBlock name={"C3"} temperature={temperatureArray[3]} />
                <TemperatureBlock name={"C4"} temperature={temperatureArray[4]} />
                <TemperatureBlock name={"C5"} temperature={temperatureArray[5]} />
                <TemperatureBlock name={"C6"} temperature={temperatureArray[6]} />
                <TemperatureBlock name={"TURBO OUT"} temperature={temperatureArray[7]} />
            </div>
        </div>
    );
}

export default METempGraph;