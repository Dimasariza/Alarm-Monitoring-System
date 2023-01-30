import React, { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import UI_ENIN_Boost_MPa_BG from '../../Assets/UI_Asset/SVG-UI-SIMS/UI-ECHO/BoostPressure/UI_ENIN_Boost_MPa_BG.png'
import UI_ENIN_Lub_oil_MPa_FG from "../../Assets/UI_Asset/SVG-UI-SIMS/UI-ECHO/LubOil/UI_ENIN_Lub_oil_MPa_FG.png"
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

function IndicatorLubOil({engine, size, alarmManager}) {
    const titleValue = "LUB. OIL PRESSURE";
    const unitValue = "MPa";
    const maxPercentageValue = 56.15;
    const maxValue = 1;
    const fillRotation = 0.607;
    const valueStyle= { fontSize: getSizeMultiplier(25, size)}
    const unitStyle= { fontSize: getSizeMultiplier(15, size)}
    const tittleStyle = {fontSize: getSizeMultiplier(15, size)}
    const constantData = [UI_ENIN_Boost_MPa_BG, UI_ENIN_Lub_oil_MPa_FG, UI_ENIN_Boost_MPa_OuterRing, size, fillRotation, titleValue, unitValue];

    const[rawValue, setRawValue] = useState(engine.lubOilPressure);
    const[alarm, setAlarm] = useState(false);
    
    const respondCommand = "lowPressureLubOil";
    const altCommand = "highPressureLubOil";
    let alarmCount = 0;

    useEffect(() => {
        engine.on('Lub Oil Pressure', (value) => {
            setRawValue(value);
        });

        engine.alarmManager.on('Alarm', (value) => {
            if(engine.alarmManager.checkActive(value.command)){
                if((value.command == respondCommand || value.command == altCommand) && value.source == engine.source){
                    // console.log(titleValue, engine.source, value.command, value.source)
                    if(value.status == AlarmStatus.Active){
                        // alarmCount++;
                        // console.log('plus', value.source, alarmCount)
                        setAlarm(true);
                    }else{
                        // alarmCount--;
                        // console.log('min', value.source, alarmCount)
                        setAlarm(false);
                    }
                }
            }else{
                alarmCount = 0;
                setAlarm(false);
            }
            // if(alarmCount == 0){
            //     setAlarm(false);
            // }else{
            //     setAlarm(true);
            // }
        });

    }, []);

    return (
        <Indicator 
            percentage={rawValueToPercentage(maxValue, rawValue, maxPercentageValue)}
            tittleStyle={tittleStyle}
            valueStyle={valueStyle}
            unitStyle={unitStyle}
            rawValue={rawValue.toFixed(1)}
            activeAlarm={alarm}
            constantData={constantData}
            />
    );
}

export default IndicatorLubOil;