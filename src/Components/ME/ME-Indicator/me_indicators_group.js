import React, { useCallback, useEffect, useState } from 'react'
import IndicatorBoostPressure from '../../Indicator/indicator_boostPressure';
import IndicatorRevolutionEngine from '../../Indicator/indicator_Revolution_Engine';
import IndicatorRevolutionPropeller from '../../Indicator/indicator_Revolution_Propeller';
import IndicatorLubOil from '../../Indicator/indicator_lub_oil';
import IndicatorExhaustTemperature from '../../Indicator/indicator_exhaustTemp';
import IndicatorCoolingWaterTemperature from '../../Indicator/indicator_coolingWaterTemp';


function MEIndicatorGroup({setState, stateName, inputValue, alarmManager}) {
    return (
            <div className='whiteBox-splitComp-indicator'>
                <div className='indicator-customLoc' style={{'--topPos' : 2, '--leftPos' : 70 }}>
                    <div style={{ width: 200, fontSize: 20}}>{stateName}</div>
                </div>
                <div className='indicator-customLoc' style={{'--topPos' : 5, '--leftPos' : 5 }}>
                    <IndicatorRevolutionEngine engine={inputValue} size={220} />
                </div>
                <div className='indicator-customLoc' style={{'--topPos' : 12, '--leftPos' : 53 }}>
                    <IndicatorRevolutionPropeller rawValue={inputValue.shaftRev} size={180} />
                </div>
                <div className='indicator-customLoc' style={{'--topPos' : 52, '--leftPos' : 6 }}>
                    <IndicatorLubOil rawValue={inputValue.lubOilPressure} size={135} />
                </div>
                <div className='indicator-customLoc' style={{'--topPos' : 46, '--leftPos' : 35 }}>
                    <IndicatorBoostPressure engine={inputValue} size={160} lowWarning={inputValue.lowPressureFO} alarmManager={alarmManager} />
                </div>
                <div className='indicator-customLoc' style={{'--topPos' : 52, '--leftPos' : 70 }}>
                    <IndicatorCoolingWaterTemperature rawValue={inputValue.coolingWaterTemp} size={100} />
                </div>
                <div className='indicator-customLoc' style={{'--topPos' : 73, '--leftPos' : 61 }}>
                    <IndicatorExhaustTemperature rawValue={inputValue.exhaustTemp} size={100} />
                </div>
            </div>
        
    );
}

export default MEIndicatorGroup;