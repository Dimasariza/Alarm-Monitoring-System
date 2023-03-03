import React, { useCallback, useEffect } from 'react'
import IndicatorRevolutionEngine from '../Indicator/indicator_Revolution_Engine'
import IndicatorRevolutionPropeller from '../Indicator/indicator_Revolution_Propeller';
import BattreyIndicator from '../Overview/battreyIndicator';
import RedOverviewLight from '../Overview/redOverviewButton';
import GreenOverviewLight from '../Overview/greenOverviewButton';
import IndicatorCoolingWaterTemperature from '../Indicator/indicator_coolingWaterTemp';
import IndicatorLubOil from '../Indicator/indicator_lub_oil';
import HourIndicator from '../Overview/hourIndicator';
import AmpMeterIndicator from '../Overview/ampmeter';
import PFIndicator from '../Overview/PF';
import VoltMeterIndicator from '../Overview/voltmeter';
import PowerMeterIndicator from '../Overview/powerMeter';
import Electricity from '../../Assets/PMSOL/Electricty.png';
import IndicatorHalfCircle from '../Indicator/indicatorHalfCircle';
import RevolutionMeterIndicator from '../Overview/revolutionMeter';


function AuxEngine({auxEngineValue, state, setState, alarmManager}) {
    return (
        <div className='displayContainer-split' style={{height : 455}}>
             <div className='whiteBox-splitComp-indicator' style={{width: '70%'}}>
                <div className='indicator-customLoc' style={{'--topPos' : 2, '--leftPos' : 94.5 }}> 
                    <img src={Electricity} style={{width: 30}}/>
                </div>
                <div className='indicator-customLoc' style={{'--topPos' : 5, '--leftPos' : 7 }}> 
                    <IndicatorCoolingWaterTemperature engine={auxEngineValue.stbd} size={200} alarmManager={alarmManager}/>
                </div>
                <div className='indicator-customLoc' style={{'--topPos' : 50, '--leftPos' : 7 }}> 
                    <IndicatorLubOil engine={auxEngineValue.stbd} size={200} alarmManager={alarmManager}/>
                </div>
                <div className='indicator-customLoc' style={{'--topPos' : 80, '--leftPos' : 85 }}> 
                    <BattreyIndicator voltage={auxEngineValue.stbd.battreyVolt} battreyLife={auxEngineValue.stbd.battreyLife} boxWidth={77} />
                </div>
                <div className='indicator-customLoc' style={{'--topPos' : 86, '--leftPos' : 48 }}>
                    <HourIndicator lifeHour={auxEngineValue.stbd.runningHour} boxWidth={65} />
                </div>
                <div className='indicator-customLoc' style={{'--topPos' : 86, '--leftPos' : 60 }}>
                    <AmpMeterIndicator lifeHour={auxEngineValue.stbd.amp} boxWidth={88} />
                </div>
                <div className='indicator-customLoc' style={{'--topPos' : 86, '--leftPos' : 75 }}>
                    <PFIndicator lifeHour={auxEngineValue.stbd.pf} boxWidth={50} />
                </div>
                <div className='indicator-customLoc' style={{'--topPos' : 67, '--leftPos' : 82.5 }}> 
                    <VoltMeterIndicator lifeHour={auxEngineValue.stbd.voltMeter} boxWidth={94} />
                </div>
                <div className='indicator-customLoc' style={{'--topPos' : 67, '--leftPos' : 63 }}> 
                    <PowerMeterIndicator lifeHour={auxEngineValue.stbd.power} boxWidth={120} boxHeight={50}/>
                </div>
                <div className='indicator-customLoc' style={{'--topPos' : 67, '--leftPos' : 43 }}> 
                    <RevolutionMeterIndicator engine={auxEngineValue.stbd} boxWidth={120} boxHeight={50}/>
                </div>
                <div className='indicator-customLoc' style={{'--topPos' : 23, '--leftPos' : 41 }}> 
                    <IndicatorHalfCircle engine={auxEngineValue.stbd} size={200}/>
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 5, width: '30%'}}>
                <div style={{display: 'flex', flexDirection: 'row', gap: 5}}>
                    <RedOverviewLight overrideWidth={120} name={"EMERGENCY STOP"} active={auxEngineValue.stbd.emergencyStop}/>
                    <GreenOverviewLight overrideWidth={120} name={"READY TO START"} active={auxEngineValue.stbd.readyToStart}/>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', gap: 5}}>
                    <GreenOverviewLight overrideWidth={120} name={"ENGINE RUNNING"} active={auxEngineValue.stbd.engineRunning}/>
                    <GreenOverviewLight overrideWidth={120} name={"BUZZER"} active={auxEngineValue.stbd.buzzer}/>
                </div>
            </div>
        </div>
    );
}

export default AuxEngine;