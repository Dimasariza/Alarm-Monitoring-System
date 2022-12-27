import React, { useCallback, useState } from 'react'
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

function IndicatorRevolutionPropeller({rawValue, size}) {
    const titleValue = "REVOLUTION (PROPELLER)";
    const unitValue = "RPM";
    const maxPercentageValue = 58.87;
    const maxValue = 3500;
    const fillRotation = 0.664;
    const valueStyle= { fontSize: getSizeMultiplier(25, size)}
    const unitStyle= { fontSize: getSizeMultiplier(15, size)}
    const tittleStyle = {fontSize: getSizeMultiplier(13, size)}
    const constantData = [UI_ENIN_Rev_RPM_BG, UI_ENIN_Rev_RPM_Front, UI_ENIN_Boost_MPa_OuterRing, size, fillRotation, titleValue, unitValue];

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

export default IndicatorRevolutionPropeller;