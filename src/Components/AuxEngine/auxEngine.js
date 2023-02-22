import React, { useCallback, useEffect } from 'react'
import IndicatorRevolutionEngine from '../Indicator/indicator_Revolution_Engine'
import IndicatorRevolutionPropeller from '../Indicator/indicator_Revolution_Propeller';
import BattreyIndicator from '../Overview/battreyIndicator';
import RedOverviewLight from '../Overview/redOverviewButton';
import GreenOverviewLight from '../Overview/greenOverviewButton';
import IndicatorCoolingWaterTemperature from '../Indicator/indicator_coolingWaterTemp';
import IndicatorCoolingWaterPressure from '../Indicator/indicatior_coolingWatePressure';
import IndicatorLubOil from '../Indicator/indicator_lub_oil';
import IndicatorExhaustTemperature from '../Indicator/indicator_exhaustTemp';
import HourIndicator from '../Overview/hourIndicator';
import AmpMeterIndicator from '../Overview/ampmeter';
import PFIndicator from '../Overview/PF';
import VoltMeterIndicator from '../Overview/voltmeter';
import PowerMeterIndicator from '../Overview/powerMeter';
import Electricity from '../../Assets/PMSOL/Electricty.png';
import IndicatorHalfCircle from '../Indicator/indicatorHalfCircle';
import ArrowLefticonActive from '../../Assets/AMS-Modelling-Assets/ArrowLefticonActive.png'
import ArrowRightIconActive from '../../Assets/AMS-Modelling-Assets/ArrowRightIconActive.png'
import MEStateButton from '../ME/ME-Indicator/me_state_change_button';


function AuxEngine({auxEngineValuestbd, auxEngineValueport, state, setState, alarmManager}) {
    return (
        <div className='overviewContainer'>
            <div className='overviewContainer-aux'>
            
                <div className='whiteBox-overview-indicator' style={{'--whiteBoxHeight': 370}}>
                    <div className='indicator-customLoc' style={{'--topPos' : 3, '--leftPos' : 70, fontWeight: 'bold', fontSize: 20 }}> 
                        STBD ENGINE
                    </div>
                    <div className='indicator-customLoc' style={{'--topPos' : 2, '--leftPos' : 61 }}> 
                        <img src={Electricity} style={{width: 30}}/>
                    </div>
                    <div className='indicator-customLoc' style={{'--topPos' : 2, '--leftPos' : 2 }}> 
                        <IndicatorCoolingWaterTemperature engine={auxEngineValuestbd} size={120} alarmManager={alarmManager}/>
                    </div>
                    <div className='indicator-customLoc' style={{'--topPos' : 33, '--leftPos' : 12 }}> 
                        <IndicatorCoolingWaterPressure rawValue={auxEngineValuestbd.coolingWaterPressure} size={70} alarmManager={alarmManager}/>
                    </div>
                    <div className='indicator-customLoc' style={{'--topPos' : 48, '--leftPos' : 2 }}> 
                        <IndicatorLubOil engine={auxEngineValuestbd} size={70} alarmManager={alarmManager}/>
                    </div>
                    <div className='indicator-customLoc' style={{'--topPos' : 67, '--leftPos' : 2 }}> 
                        <IndicatorExhaustTemperature rawValue={auxEngineValuestbd.exhaustTemp} size={120} alarmManager={alarmManager}/>
                    </div>
                    <div className='indicator-customLoc' style={{'--topPos' : 77, '--leftPos' : 81 }}> 
                        <BattreyIndicator voltage={auxEngineValuestbd.battreyVolt} battreyLife={auxEngineValuestbd.battreyLife} boxWidth={77} />
                    </div>
                    <div className='indicator-customLoc' style={{'--topPos' : 80, '--leftPos' : 28 }}>
                        <HourIndicator lifeHour={auxEngineValuestbd.runningHour} boxWidth={65} />
                    </div>
                    <div className='indicator-customLoc' style={{'--topPos' : 80, '--leftPos' : 45 }}>
                        <AmpMeterIndicator lifeHour={auxEngineValuestbd.amp} boxWidth={88} />
                    </div>
                    <div className='indicator-customLoc' style={{'--topPos' : 80, '--leftPos' : 67 }}>
                        <PFIndicator lifeHour={auxEngineValuestbd.pf} boxWidth={50} />
                    </div>
                    <div className='indicator-customLoc' style={{'--topPos' : 61, '--leftPos' : 77.5 }}> 
                        <VoltMeterIndicator lifeHour={auxEngineValuestbd.voltMeter} boxWidth={94} />
                    </div>
                    <div className='indicator-customLoc' style={{'--topPos' : 61, '--leftPos' : 31 }}> 
                        <PowerMeterIndicator lifeHour={auxEngineValuestbd.power} boxWidth={210} boxHeight={50}/>
                    </div>
                    <div className='indicator-customLoc' style={{'--topPos' : 15, '--leftPos' : 30 }}> 
                        <IndicatorHalfCircle engine={auxEngineValuestbd} size={170}/>
                    </div>
                </div>
                <div className='whiteBox-overview-indicator' style={{'--whiteBoxHeight': 370}}>
                    <div className='indicator-customLoc' style={{'--topPos' : 3, '--leftPos' : 2, fontWeight: 'bold', fontSize: 20 }}> 
                        PORT ENGINE
                    </div>
                    <div className='indicator-customLoc' style={{'--topPos' : 2, '--leftPos' : 32 }}> 
                        <img src={Electricity} style={{width: 30}}/>
                    </div>
                    <div className='indicator-customLoc' style={{'--topPos' : 2, '--leftPos' : 74 }}> 
                        <IndicatorCoolingWaterTemperature engine={auxEngineValueport} size={120} alarmManager={alarmManager}/>
                    </div>
                    <div className='indicator-customLoc' style={{'--topPos' : 33, '--leftPos' : 74 }}> 
                        <IndicatorCoolingWaterPressure rawValue={auxEngineValueport.coolingWaterPressure} size={70}/>
                    </div>
                    <div className='indicator-customLoc' style={{'--topPos' : 48, '--leftPos' : 84 }}> 
                        <IndicatorLubOil engine={auxEngineValueport} size={70}/>
                    </div>
                    <div className='indicator-customLoc' style={{'--topPos' : 67, '--leftPos' : 74 }}> 
                        <IndicatorExhaustTemperature rawValue={auxEngineValueport.exhaustTemp} size={120} />
                    </div>
                    <div className='indicator-customLoc' style={{'--topPos' : 77, '--leftPos' : 0.5 }}> 
                        <BattreyIndicator voltage={auxEngineValueport.battreyVolt} battreyLife={auxEngineValueport.battreyLife} boxWidth={77} />
                    </div>
                    <div className='indicator-customLoc' style={{'--topPos' : 80, '--leftPos' : 55.5 }}>
                        <HourIndicator lifeHour={auxEngineValueport.runningHour} boxWidth={65} />
                    </div>
                    <div className='indicator-customLoc' style={{'--topPos' : 80, '--leftPos' : 34 }}>
                        <AmpMeterIndicator lifeHour={auxEngineValueport.amp} boxWidth={88} />
                    </div>
                    <div className='indicator-customLoc' style={{'--topPos' : 80, '--leftPos' : 20 }}>
                        <PFIndicator lifeHour={auxEngineValueport.pf} boxWidth={50} />
                    </div>
                    <div className='indicator-customLoc' style={{'--topPos' : 61, '--leftPos' : 0.5 }}> 
                        <VoltMeterIndicator lifeHour={auxEngineValueport.voltMeter} boxWidth={94} />
                    </div>
                    <div className='indicator-customLoc' style={{'--topPos' : 61, '--leftPos' : 24 }}> 
                        <PowerMeterIndicator lifeHour={auxEngineValueport.power} boxWidth={200} />
                    </div>
                    <div className='indicator-customLoc' style={{'--topPos' : 15, '--leftPos' : 1 }}> 
                        <IndicatorHalfCircle engine={auxEngineValueport} size={170}/>
                    </div>
                </div>
            </div>
            <div className='whiteBox-noBorder'>
                <div className='overviewContainer-indicator'>
                    <div className='whiteBox-overview-indicator-noBorder'>
                        <div className='overviewContainer-indicator-center-maxWidth'>
                            <RedOverviewLight overrideWidth={120} name={"EMERGENCY STOP"} active={auxEngineValuestbd.emergencyStop}/>
                            <GreenOverviewLight overrideWidth={120} name={"READY TO START"} active={auxEngineValuestbd.readyToStart}/>
                            <GreenOverviewLight overrideWidth={120} name={"ENGINE RUNNING"} active={auxEngineValuestbd.engineRunning}/>
                            <GreenOverviewLight overrideWidth={120} name={"BUZZER"} active={auxEngineValuestbd.buzzer}/>
                        </div>
                    </div>
                    <div className='whiteBox-overview-indicator-noBorder'>
                        <div className='overviewContainer-indicator-center-maxWidth'>
                            <RedOverviewLight overrideWidth={120} name={"EMERGENCY STOP"} active={auxEngineValueport.emergencyStop}/>
                            <GreenOverviewLight overrideWidth={120} name={"READY TO START"} active={auxEngineValueport.readyToStart}/>
                            <GreenOverviewLight overrideWidth={120} name={"ENGINE RUNNING"} active={auxEngineValueport.engineRunning}/>
                            <GreenOverviewLight overrideWidth={120} name={"BUZZER"} active={auxEngineValueport.buzzer}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuxEngine;