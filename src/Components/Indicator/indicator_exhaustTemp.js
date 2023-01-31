import React, { useCallback, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import UI_ENIN_Boost_MPa_BG from '../../Assets/UI_Asset/SVG-UI-SIMS/UI-ECHO/BoostPressure/UI_ENIN_Boost_MPa_BG.png'
import UI_ENIN_Eshaust_degC_FG from "../../Assets/UI_Asset/SVG-UI-SIMS/UI-ECHO/Exhaust/UI_ENIN_Eshaust_degC_FG.png"
import UI_ENIN_Boost_MPa_OuterRing from "../../Assets/UI_Asset/SVG-UI-SIMS/UI-ECHO/BoostPressure/UI_ENIN_Boost_MPa_OuterRing.png"
import Indicator from './indicator';

function rawValueToPercentage(maxValue, rawValue, maxPercentageValue){
    return maxPercentageValue * (rawValue / maxValue)
}

function getSizeMultiplier(fontSize, currentSize){
    const baseSize = 200;
    return fontSize * (currentSize/baseSize)
}

function IndicatorExhaustTemperature({rawValue, size}) {
    const titleValue = "EXHAUST TEMPERATURE";
    const unitValue = "°C";
    const maxPercentageValue = 58.85;
    const maxValue = 700;
    const fillRotation = 0.664;
    const valueStyle= { fontSize: getSizeMultiplier(25, size)}
    const unitStyle= { fontSize: getSizeMultiplier(15, size)}
    const tittleStyle = {fontSize: getSizeMultiplier(12, size)}
    const constantData = [UI_ENIN_Boost_MPa_BG, UI_ENIN_Eshaust_degC_FG, UI_ENIN_Boost_MPa_OuterRing, size, fillRotation, titleValue, unitValue];

    

    return (
        <Indicator 
            percentage={rawValueToPercentage(maxValue, rawValue, maxPercentageValue)}
            tittleStyle={tittleStyle}
            valueStyle={valueStyle}
            unitStyle={unitStyle}
            rawValue={rawValue}
            activeAlarm={false}
            constantData={constantData}
            />
    );
}

export default IndicatorExhaustTemperature;