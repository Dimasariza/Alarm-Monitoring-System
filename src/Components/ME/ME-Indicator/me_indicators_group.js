import React, { useCallback, useEffect, useState } from 'react'
import IndicatorBoostPressure from '../../Indicator/indicator_boostPressure';
import IndicatorRevolutionEngine from '../../Indicator/indicator_Revolution_Engine';
import IndicatorRevolutionPropeller from '../../Indicator/indicator_Revolution_Propeller';
import IndicatorLubOil from '../../Indicator/indicator_lub_oil';
import IndicatorExhaustTemperature from '../../Indicator/indicator_exhaustTemp';
import IndicatorCoolingWaterTemperature from '../../Indicator/indicator_coolingWaterTemp';
import BattreyIndicator from '../../Overview/battreyIndicator';


function MEIndicatorGroup({setState, stateName, inputValue, alarmManager, currentState}) {
    return (
            <div className='whiteBox-splitComp-indicator' style={{width: '90%'}}>
                <div className='indicator-customLoc' style={{'--topPos' : 31, '--leftPos' : 14 }}>
                    <IndicatorRevolutionEngine engine={inputValue} size={250} alarmManager={alarmManager}/>
                </div>
                <div className='indicator-customLoc' style={{'--topPos' : 52, '--leftPos' : 70  }}>
                    <IndicatorLubOil engine={inputValue} size={135} alarmManager={alarmManager}/>
                </div>
                <div className='indicator-customLoc' style={{'--topPos' : 11, '--leftPos' : 40 }}>
                    <IndicatorBoostPressure engine={inputValue} size={160} alarmManager={alarmManager} />
                </div>
                <div className='indicator-customLoc' style={{'--topPos' : 45, '--leftPos' : 47  }}>
                    <IndicatorCoolingWaterTemperature engine={inputValue} size={160} alarmManager={alarmManager}/>
                </div>
                <div className='indicator-customLoc' style={{'--topPos' : 18, '--leftPos' : 63 }}>
                    <IndicatorExhaustTemperature rawValue={inputValue.exhaustTemp} size={160} alarmManager={alarmManager}/>
                </div>
                <div className='indicator-customLoc' style={{'--topPos' : 81, '--leftPos' : 88 }}> 
                    <BattreyIndicator voltage={inputValue.battreyVolt} battreyLife={inputValue.battreyLife} boxWidth={77} />
                </div>
                {/* <div className={'indicator-customLoc'} style={{background: 'rgba(0, 0, 0, 0.5)', width: '100%', height: '100%'}}></div> */}
            </div>
        
    );
}

export default MEIndicatorGroup;