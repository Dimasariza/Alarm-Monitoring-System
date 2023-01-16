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


function AuxEngine({auxEngineValue, state, setState}) {
    return (
        <div className='overviewContainer'>
            <div className='overviewContainer-aux'>
            
                <div className='whiteBox-overview-indicator' style={{'--whiteBoxHeight': 370}}>
                    <div className='indicator-customLoc' style={{'--topPos' : 2, '--leftPos' : 75, fontWeight: 'bold' }}> 
                        STBD ENGINE
                    </div>
                    <div className='indicator-customLoc' style={{'--topPos' : 2, '--leftPos' : 2 }}> 
                        <IndicatorCoolingWaterTemperature rawValue={auxEngineValue.stbd.coolingWaterTemp} size={120}/>
                    </div>
                    <div className='indicator-customLoc' style={{'--topPos' : 33, '--leftPos' : 12 }}> 
                        <IndicatorCoolingWaterPressure rawValue={auxEngineValue.stbd.coolingWaterPressure} size={70}/>
                    </div>
                    <div className='indicator-customLoc' style={{'--topPos' : 48, '--leftPos' : 2 }}> 
                        <IndicatorLubOil rawValue={auxEngineValue.stbd.lubOilPressure} size={70}/>
                    </div>
                    <div className='indicator-customLoc' style={{'--topPos' : 67, '--leftPos' : 2 }}> 
                        <IndicatorExhaustTemperature rawValue={auxEngineValue.stbd.exhaustTemp} size={120} />
                    </div>
                    <div className='indicator-customLoc' style={{'--topPos' : 77, '--leftPos' : 81 }}> 
                        <BattreyIndicator voltage={auxEngineValue.stbd.battreyVolt} battreyLife={auxEngineValue.stbd.battreyLife} boxWidth={77} />
                    </div>
                    <div className='indicator-customLoc' style={{'--topPos' : 80, '--leftPos' : 28 }}>
                        <HourIndicator lifeHour={auxEngineValue.stbd.runningHour} boxWidth={65} />
                    </div>
                    <div className='indicator-customLoc' style={{'--topPos' : 80, '--leftPos' : 45 }}>
                        <AmpMeterIndicator lifeHour={auxEngineValue.stbd.amp} boxWidth={88} />
                    </div>
                    <div className='indicator-customLoc' style={{'--topPos' : 80, '--leftPos' : 67 }}>
                        <PFIndicator lifeHour={auxEngineValue.stbd.pf} boxWidth={50} />
                    </div>
                    <div className='indicator-customLoc' style={{'--topPos' : 61, '--leftPos' : 77.5 }}> 
                        <VoltMeterIndicator lifeHour={auxEngineValue.stbd.battreyVolt} boxWidth={94} />
                    </div>
                    <div className='indicator-customLoc' style={{'--topPos' : 61, '--leftPos' : 41 }}> 
                        <PowerMeterIndicator lifeHour={auxEngineValue.stbd.power} boxWidth={160} />
                    </div>
                    <div className='indicator-customLoc' style={{'--topPos' : 61.5, '--leftPos' : 29 }}> 
                        <img src={Electricity} style={{width: 50}}/>
                    </div>
                    <div className='indicator-customLoc' style={{'--topPos' : 15, '--leftPos' : 30 }}> 
                        <IndicatorHalfCircle rawValue={auxEngineValue.stbd.halfCircle} size={170}/>
                    </div>
                </div>
                <div className='whiteBox-overview-indicator' style={{'--whiteBoxHeight': 370}}>
                <div className='indicator-customLoc' style={{'--topPos' : 2, '--leftPos' : 2, fontWeight: 'bold' }}> 
                        PORT ENGINE
                    </div>
                    <div className='indicator-customLoc' style={{'--topPos' : 2, '--leftPos' : 74 }}> 
                        <IndicatorCoolingWaterTemperature rawValue={auxEngineValue.port.coolingWaterTemp} size={120}/>
                    </div>
                    <div className='indicator-customLoc' style={{'--topPos' : 33, '--leftPos' : 74 }}> 
                        <IndicatorCoolingWaterPressure rawValue={auxEngineValue.port.coolingWaterPressure} size={70}/>
                    </div>
                    <div className='indicator-customLoc' style={{'--topPos' : 48, '--leftPos' : 84 }}> 
                        <IndicatorLubOil rawValue={auxEngineValue.port.lubOilPressure} size={70}/>
                    </div>
                    <div className='indicator-customLoc' style={{'--topPos' : 67, '--leftPos' : 74 }}> 
                        <IndicatorExhaustTemperature rawValue={auxEngineValue.port.exhaustTemp} size={120} />
                    </div>
                    <div className='indicator-customLoc' style={{'--topPos' : 77, '--leftPos' : 0.5 }}> 
                        <BattreyIndicator voltage={auxEngineValue.port.battreyVolt} battreyLife={auxEngineValue.port.battreyLife} boxWidth={77} />
                    </div>
                    <div className='indicator-customLoc' style={{'--topPos' : 80, '--leftPos' : 55.5 }}>
                        <HourIndicator lifeHour={auxEngineValue.port.runningHour} boxWidth={65} />
                    </div>
                    <div className='indicator-customLoc' style={{'--topPos' : 80, '--leftPos' : 34 }}>
                        <AmpMeterIndicator lifeHour={auxEngineValue.port.amp} boxWidth={88} />
                    </div>
                    <div className='indicator-customLoc' style={{'--topPos' : 80, '--leftPos' : 20 }}>
                        <PFIndicator lifeHour={auxEngineValue.port.pf} boxWidth={50} />
                    </div>
                    <div className='indicator-customLoc' style={{'--topPos' : 61, '--leftPos' : 0.5 }}> 
                        <VoltMeterIndicator lifeHour={auxEngineValue.port.battreyVolt} boxWidth={94} />
                    </div>
                    <div className='indicator-customLoc' style={{'--topPos' : 61, '--leftPos' : 24 }}> 
                        <PowerMeterIndicator lifeHour={auxEngineValue.port.power} boxWidth={160} />
                    </div>
                    <div className='indicator-customLoc' style={{'--topPos' : 61.5, '--leftPos' : 62 }}> 
                        <img src={Electricity} style={{width: 50}}/>
                    </div>
                    <div className='indicator-customLoc' style={{'--topPos' : 15, '--leftPos' : 1 }}> 
                        <IndicatorHalfCircle rawValue={auxEngineValue.port.halfCircle} size={170}/>
                    </div>
                </div>
            </div>
            <div className='whiteBox-noBorder'>
                <div className='overviewContainer-indicator'>
                    <div className='whiteBox-overview-indicator-noBorder'>
                        <div className='overviewContainer-indicator-center-maxWidth'>
                            <RedOverviewLight overrideWidth={120} name={"EMERGENCY STOP"} active={auxEngineValue.stbd.emergencyStop}/>
                            <GreenOverviewLight overrideWidth={120} name={"READY TO START"} active={auxEngineValue.stbd.readyToStart}/>
                            <GreenOverviewLight overrideWidth={120} name={"ENGINE RUNNING"} active={auxEngineValue.stbd.engineRunning}/>
                            <GreenOverviewLight overrideWidth={120} name={"BUZZER"} active={auxEngineValue.stbd.buzzer}/>
                        </div>
                    </div>
                    <div className='whiteBox-overview-indicator-noBorder'>
                        <div className='overviewContainer-indicator-center-maxWidth'>
                            <GreenOverviewLight overrideWidth={120} name={"EMERGENCY STOP"} active={auxEngineValue.port.emergencyStop}/>
                            <GreenOverviewLight overrideWidth={120} name={"READY TO START"} active={auxEngineValue.port.readyToStart}/>
                            <GreenOverviewLight overrideWidth={120} name={"ENGINE RUNNING"} active={auxEngineValue.port.engineRunning}/>
                            <GreenOverviewLight overrideWidth={120} name={"BUZZER"} active={auxEngineValue.port.buzzer}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuxEngine;