import React, { useCallback, useEffect, useState } from 'react'
import IndicatorBoostPressure from '../../Indicator/indicator_boostPressure';
import IndicatorRevolutionEngine from '../../Indicator/indicator_Revolution_Engine';
import IndicatorRevolutionPropeller from '../../Indicator/indicator_Revolution_Propeller';
import IndicatorLubOil from '../../Indicator/indicator_lub_oil';
import IndicatorExhaustTemperature from '../../Indicator/indicator_exhaustTemp';
import IndicatorCoolingWaterTemperature from '../../Indicator/indicator_coolingWaterTemp';


function MEIndicatorGroup({setState, stateName}) {
    return (
        
            <div className='whiteBox-splitComp-indicator'>
                <div className='indicator-customLoc' style={{'--topPos' : 2, '--leftPos' : 70 }}>
                    <div style={{ width: 200, 'font-size': 20}}>{stateName}</div>
                </div>
                <div className='indicator-customLoc' style={{'--topPos' : 5, '--leftPos' : 5 }}>
                    <IndicatorRevolutionEngine rawValue={2000} size={220} />
                </div>
                <div className='indicator-customLoc' style={{'--topPos' : 12, '--leftPos' : 53 }}>
                    <IndicatorRevolutionPropeller rawValue={2000} size={180} />
                </div>
                <div className='indicator-customLoc' style={{'--topPos' : 52, '--leftPos' : 6 }}>
                    <IndicatorLubOil rawValue={0.60} size={135} />
                </div>
                <div className='indicator-customLoc' style={{'--topPos' : 46, '--leftPos' : 35 }}>
                    <IndicatorBoostPressure rawValue={0.123} size={160} />
                </div>
                <div className='indicator-customLoc' style={{'--topPos' : 52, '--leftPos' : 70 }}>
                    <IndicatorCoolingWaterTemperature rawValue={120} size={100} />
                </div>
                <div className='indicator-customLoc' style={{'--topPos' : 73, '--leftPos' : 61 }}>
                    <IndicatorExhaustTemperature rawValue={700} size={100} />
                </div>
            </div>
        
    );
}

export default MEIndicatorGroup;