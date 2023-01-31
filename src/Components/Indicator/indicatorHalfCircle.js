import React, { useCallback, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import RoundAlarm from './roundAlarm';
import Needle from '../../Assets/PMSOL/Needle_Smallcenter.png'
import BG from '../../Assets/PMSOL/HalfCircleIndicator.png'

function getRotation(value){
    let baseMultiplier = 95
    let trueValue = (Math.min(value, 95) / 100 * (baseMultiplier * 2)) - baseMultiplier 
    return 'rotate(' + trueValue+'deg)'
}

function IndicatorHalfCircle({percentage, tittleStyle, valueStyle, unitStyle, rawValue, activeAlarm, size}) {
    return (
        <div className='indicator-container' style={{width : size * 2, height : size}}>
            <img className='indicator' src={BG} alt="Indicator Background" />
            <div className='indicator-customLoc-rotate' style={{'--topPos' : 21, '--leftPos' : 46, '--needleRot': getRotation(rawValue)}}>
                <img src={Needle} width={size/6} />
            </div>
            {/* <CircularProgressbar className='indicator'
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
            <img className='indicator' src={constantData[2]} alt="Indicator Outer Ring"  /> */}
            <div className='indicator-TitleText' style={{fontSize: 30, fontWeight: 'bold'}}> {'Load'} </div>
            {/* <div className='indicator-ValueText' style={valueStyle}> {rawValue} </div>
            <div className='indicator-UnitText' style={unitStyle}> {constantData[6]} </div> */}
        </div>
    );
}

export default IndicatorHalfCircle;