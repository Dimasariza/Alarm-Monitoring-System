import React, { useCallback, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import RoundAlarm from './roundAlarm';

function Indicator({percentage, tittleStyle, valueStyle, unitStyle, rawValue, activeAlarm, constantData}) {
    return (
        <div className='indicator-container' style={{width : constantData[3], height : constantData[3]}}>
            <img className='indicator' src={constantData[0]} alt="Indicator Background" />
            <CircularProgressbar className='indicator'
                value={percentage}
                strokeWidth={50}
                styles={
                    buildStyles({
                    strokeLinecap : "butt",
                    rotation : constantData[4],
                    pathColor: '#00FFE8',
                    trailColor: `rgba(0, 0, 0, 0)`,
                })}
            />
            <img className='indicator' src={constantData[1]} alt="Indicator Foreground" />
            <img className='indicator' src={constantData[2]} alt="Indicator Outer Ring"  />
            <div className='indicator-TitleText' style={tittleStyle}> {constantData[5]} </div>
            <div className='indicator-ValueText' style={valueStyle}> {rawValue} </div>
            <div className='indicator-UnitText' style={unitStyle}> {constantData[6]} </div>
            <div className='indicator-Alarm'>
                <RoundAlarm active={activeAlarm} />
            </div>
        </div>
    );
}

export default Indicator;