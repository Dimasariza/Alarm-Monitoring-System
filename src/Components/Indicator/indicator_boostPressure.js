import React, { useCallback, useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import UI_ENIN_Boost_MPa_BG from '../../Assets/UI_Asset/SVG-UI-SIMS/UI-ECHO/BoostPressure/UI_ENIN_Boost_MPa_BG.png'
import UI_ENIN_Boost_MPa_FG from "../../Assets/UI_Asset/SVG-UI-SIMS/UI-ECHO/BoostPressure/UI_ENIN_Boost_MPa_FG.png"
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

function IndicatorBoostPressure({engine, size, alarmManager}) {
    const titleValue = "BOOST PRESSURE";
    const unitValue = "MPA";
    const maxPercentageValue = 50.55;
    const maxValue = 0.3;
    const fillRotation = 0.747;
    const valueStyle= { fontSize: getSizeMultiplier(25, size)}
    const unitStyle= { fontSize: getSizeMultiplier(15, size)}
    const tittleStyle = {fontSize: getSizeMultiplier(15, size)}
    const constantData = [UI_ENIN_Boost_MPa_BG, UI_ENIN_Boost_MPa_FG, UI_ENIN_Boost_MPa_OuterRing, size, fillRotation, titleValue, unitValue];

    const[rawValue, setRawValue] = useState(engine.boostPressure);
    const[alarm, setAlarm] = useState(false);
    
    const respondCommand = "lowPressureBoost";

    useEffect(() => {
        engine.on('Boost Pressure', (value) => {
            setRawValue(value);
        });

        engine.alarmManager.on('Alarm', (value) => {
            if(alarmManager.activeLowPressureBoost){
                if(value.command == respondCommand && value.source == engine.source){
                    if(value.status == AlarmStatus.Active){
                        setAlarm(true);
                    }else{
                        setAlarm(false);
                    }
                }
            }else{
                setAlarm(false);
            }
            
        });
    }, []);

    return (
        <Indicator 
            percentage={rawValueToPercentage(maxValue, rawValue, maxPercentageValue)}
            tittleStyle={tittleStyle}
            valueStyle={valueStyle}
            unitStyle={unitStyle}
            rawValue={rawValue.toFixed(2)}
            activeAlarm={alarm}
            constantData={constantData}
            />
    );
}

export default IndicatorBoostPressure;