import React, { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import UI_ENIN_Boost_MPa_BG from '../../Assets/UI_Asset/SVG-UI-SIMS/UI-ECHO/BoostPressure/UI_ENIN_Boost_MPa_BG.png'
import UI_ENIN_Water_degC_FG from "../../Assets/UI_Asset/SVG-UI-SIMS/UI-ECHO/WaterTemp/UI_ENIN_Water_degC_FG.png"
import UI_ENIN_Boost_MPa_OuterRing from "../../Assets/UI_Asset/SVG-UI-SIMS/UI-ECHO/BoostPressure/UI_ENIN_Boost_MPa_OuterRing.png"
import Indicator from './indicator';
import { AlarmStatus } from '../DataComponents/AlarmControls/AlarmManager';

function rawValueToPercentage(maxValue, rawValue, maxPercentageValue){
    return maxPercentageValue * (rawValue / maxValue)
}

function getSizeMultiplier(fontSize, currentSize){
    const baseSize = 200;
    return fontSize * (currentSize/baseSize)
}

function IndicatorCoolingWaterTemperature({engine, size, alarmManager}) {
    const titleValue = "COOLING WATER TEMPERATURE";
    const unitValue = "°C";
    const maxPercentageValue = 61.85;
    const maxValue = 120;
    const fillRotation = 0.606;
    const valueStyle= { fontSize: getSizeMultiplier(25, size)}
    const unitStyle= { fontSize: getSizeMultiplier(15, size)}
    const tittleStyle = {fontSize: getSizeMultiplier(12, size)}
    const constantData = [UI_ENIN_Boost_MPa_BG, UI_ENIN_Water_degC_FG, UI_ENIN_Boost_MPa_OuterRing, size, fillRotation, titleValue, unitValue];

    const[rawValue, setRawValue] = useState(engine.coolingWaterTemp);
    const[alarm, setAlarm] = useState(false);
    
    const respondCommand = "lowTempWC";
    const altCommand = "highTempWC";
    let alarmCount = 0;

    useEffect(() => {
        const updateWaterCooling = (value) => {
            setRawValue(value);
            if(value < engine.lowTempCW || value > engine.highTempCW){
                setAlarm(true)
            }else{
                setAlarm(false)
            }
        }
        engine.on('Cooling Water Temp', updateWaterCooling);
        return () =>{
            engine.off('Cooling Water Temp', updateWaterCooling);
        }

    }, [engine]);

    return (
        <Indicator 
            percentage={rawValueToPercentage(maxValue, rawValue, maxPercentageValue)}
            tittleStyle={tittleStyle}
            valueStyle={valueStyle}
            unitStyle={unitStyle}
            rawValue={rawValue.toFixed(0)}
            activeAlarm={alarm}
            constantData={constantData}
            />
    );
}

export default IndicatorCoolingWaterTemperature;