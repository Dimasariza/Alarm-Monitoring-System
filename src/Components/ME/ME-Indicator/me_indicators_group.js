import React, { useCallback, useEffect, useState } from 'react'
import IndicatorBoostPressure from '../../Indicator/indicator_boostPressure';
import IndicatorRevolutionEngine from '../../Indicator/indicator_Revolution_Engine';
import IndicatorRevolutionPropeller from '../../Indicator/indicator_Revolution_Propeller';
import IndicatorLubOil from '../../Indicator/indicator_lub_oil';
import IndicatorExhaustTemperature from '../../Indicator/indicator_exhaustTemp';
import IndicatorCoolingWaterTemperature from '../../Indicator/indicator_coolingWaterTemp';


function MEIndicatorGroup({setState, stateName, inputValue, alarmManager, currentState}) {
    return (
            <div className='whiteBox-splitComp-indicator'>
                <div className='indicator-customLoc' style={{'--topPos' : 2, '--leftPos' : 70 }}>
                    <div style={{ width: 200, fontSize: 20}}>{stateName}</div>
                </div>
                <div className='indicator-customLoc' style={{'--topPos' : 5, '--leftPos' : 5 }}>
                    <IndicatorRevolutionEngine engine={inputValue} size={220} alarmManager={alarmManager}/>
                </div>
                <div className='indicator-customLoc' style={{'--topPos' : 12, '--leftPos' : 53 }}>
                    <IndicatorRevolutionPropeller engine={inputValue} size={180} alarmManager={alarmManager}/>
                </div>
                <div className='indicator-customLoc' style={{'--topPos' : 52, '--leftPos' : 6  }}>
                    <IndicatorLubOil engine={inputValue} size={135} alarmManager={alarmManager}/>
                </div>
                <div className='indicator-customLoc' style={{'--topPos' : 46, '--leftPos' : 35 }}>
                    <IndicatorBoostPressure engine={inputValue} size={160} alarmManager={alarmManager} />
                </div>
                <div className='indicator-customLoc' style={{'--topPos' : 52, '--leftPos' : 70  }}>
                    <IndicatorCoolingWaterTemperature engine={inputValue} size={100} alarmManager={alarmManager}/>
                </div>
                <div className='indicator-customLoc' style={{'--topPos' : 73, '--leftPos' : 61 }}>
                    <IndicatorExhaustTemperature rawValue={inputValue.exhaustTemp} size={100} alarmManager={alarmManager}/>
                </div>
                <div className={currentState != stateName ? 'indicator-customLoc' : 'mainContainer-login-off'} style={{background: 'rgba(0, 0, 0, 0.5)', width: '100%', height: '100%'}}></div>
            </div>
        
    );
}

export default MEIndicatorGroup;