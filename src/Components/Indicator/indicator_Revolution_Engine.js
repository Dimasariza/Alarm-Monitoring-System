import React, { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import UI_ENIN_Rev_RPM_BG from "../../Assets/UI_Asset/SVG-UI-SIMS/UI-ECHO/Revolution/UI_ENIN_Rev_RPM_BG.png"
import UI_ENIN_Rev_RPM_Front from "../../Assets/UI_Asset/SVG-UI-SIMS/UI-ECHO/Revolution/UI_ENIN_Rev_RPM_Front.png"
import UI_ENIN_Boost_MPa_OuterRing from "../../Assets/UI_Asset/SVG-UI-SIMS/UI-ECHO/BoostPressure/UI_ENIN_Boost_MPa_OuterRing.png"
import Indicator from './indicator';

function rawValueToPercentage(maxValue, rawValue, maxPercentageValue){
    return maxPercentageValue * (rawValue / maxValue)
}

function getSizeMultiplier(fontSize, currentSize){
    const baseSize = 200;
    return fontSize * (currentSize/baseSize)
}

function IndicatorRevolutionEngine({engine, size}) {
    const titleValue = "ENGINE REVOLUTION";
    const unitValue = "RPM";
    const maxPercentageValue = 58.87;
    const maxValue = 3500;
    const fillRotation = 0.664;
    const valueStyle= { fontSize: getSizeMultiplier(25, size)}
    const unitStyle= { fontSize: getSizeMultiplier(15, size)}
    const tittleStyle = {fontSize: getSizeMultiplier(15, size)}
    const constantData = [UI_ENIN_Rev_RPM_BG, UI_ENIN_Rev_RPM_Front, UI_ENIN_Boost_MPa_OuterRing, size, fillRotation, titleValue, unitValue];

    const[rawValue, setRawValue] = useState(engine.engineRev);
    const[warningLight, setWarningLight] = useState(false);

    useEffect(() => {
        const updateEngineRevValue = (value) => {
            setRawValue(value);
            if(value > engine.restartRPM && value < engine.minRPM){
                setWarningLight(true)
            }else{
                setWarningLight(false)
            }
        }
        engine.on('Engine Rev', updateEngineRevValue);
        return () => {
            engine.off('Engine Rev', updateEngineRevValue);
        }
    }, [engine]);

    return (
        <Indicator 
            percentage={rawValueToPercentage(maxValue, rawValue, maxPercentageValue)}
            tittleStyle={tittleStyle}
            valueStyle={valueStyle}
            unitStyle={unitStyle}
            rawValue={rawValue.toFixed(0)}
            activeAlarm={warningLight}
            constantData={constantData}
            />
    );
}

export default IndicatorRevolutionEngine;