import React, { useCallback, useEffect } from 'react'
import IndicatorRevolutionEngine from '../Indicator/indicator_Revolution_Engine'
import IndicatorRevolutionPropeller from '../Indicator/indicator_Revolution_Propeller';
import OverviewButton from './overviewButton';
import BattreyIndicator from './battreyIndicator';
import RedOverviewLight from './redOverviewButton';
import GreenOverviewLight from './greenOverviewButton';
import HourIndicator from './hourIndicator';
import { EngineControlStatus, EngineDirection } from '../DataComponents/EngineControls/EngineData';


function Overview({inputValue}) {
    return (
        <div className='overviewContainer'>
            <div className='overviewContainer-indicator'>
                <div className='whiteBox-overview-indicator'>
                    <div className='text-block-right'> STBD ENGINE</div>
                    <div className='overviewContainer-indicator-center'>
                        <div className='indicator-customLoc' style={{'--topPos' : 2, '--leftPos' : 15 }}>
                            <IndicatorRevolutionPropeller engine={inputValue.stbd} size={150}/>
                        </div>
                        <div className='indicator-customLoc' style={{'--topPos' : 1600, '--leftPos' : 2 }}>
                            <BattreyIndicator voltage={inputValue.stbd.battreyVolt} battreyLife={inputValue.stbd.battreyLife} boxWidth={77} />
                        </div>
                        <div className='indicator-customLoc' style={{'--topPos' : 50, '--leftPos' : 49 }}>
                            <IndicatorRevolutionEngine engine={inputValue.stbd} size={240} />
                        </div>
                        <div className='indicator-customLoc' style={{'--topPos' : 1600, '--leftPos' : 25 }}>
                            <HourIndicator lifeHour={inputValue.stbd.runningHour} />
                        </div>
                    </div>
                </div>
                <div className='whiteBox-overview-indicator'>
                    <div className='text-block-left'> PORT ENGINE</div>
                    <div className='overviewContainer-indicator-center'>
                        <div className='indicator-customLoc' style={{'--topPos' : 2, '--leftPos' : 55 }}>
                            <IndicatorRevolutionPropeller engine={inputValue.port} size={150}/>
                        </div>
                        <div className='indicator-customLoc' style={{'--topPos' : 1600, '--leftPos' : 78 }}>
                            <BattreyIndicator voltage={inputValue.port.battreyVolt} battreyLife={inputValue.port.battreyLife} boxWidth={77}/>
                        </div>
                        <div className='indicator-customLoc' style={{'--topPos' : 50, '--leftPos' : 1 }}>
                            <IndicatorRevolutionEngine engine={inputValue.port} size={240} />
                        </div>
                        <div className='indicator-customLoc' style={{'--topPos' : 1600, '--leftPos' : 52 }}>
                            <HourIndicator lifeHour={inputValue.port.runningHour} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='whiteBox-noBorder'>
                <div className='overviewContainer-indicator'>
                    <div className='whiteBox-overview-indicator-noBorder'>
                        <div className='overviewContainer-indicator-center-maxWidth'>
                            <GreenOverviewLight name={"AHEAD"} active={inputValue.stbd.engineDirection === EngineDirection.Ahead}/>
                            <GreenOverviewLight name={"NEUTRAL"} active={inputValue.stbd.engineDirection === EngineDirection.Neutral}/>
                            <GreenOverviewLight name={"ASTERN"} active={inputValue.stbd.engineDirection === EngineDirection.Astern}/>
                            <GreenOverviewLight name={"REMOTE CONTROL"} active={inputValue.stbd.engineControlStatus === EngineControlStatus.Remote}/>
                            <GreenOverviewLight name={"LOCAL CONTROL"} active={inputValue.stbd.engineControlStatus === EngineControlStatus.Local}/>
                        </div>
                        <div style={{height : 5}}></div>
                        <div className='overviewContainer-indicator-center-maxWidth'>
                            <RedOverviewLight name={"EMG STOP"} active={inputValue.stbd.emergencyStop}/>
                            <GreenOverviewLight name={"READY TO START"} active={inputValue.stbd.readyToStart}/>
                            <RedOverviewLight name={"AUX. BLOWER FAILURE"} active={inputValue.stbd.auxBlowerFailure}/>
                            <GreenOverviewLight name={"ENGINE RUNNING"} active={inputValue.stbd.engineRunning}/>
                        </div>
                        
                    </div>
                    <div className='whiteBox-overview-indicator-noBorder'>
                        <div className='overviewContainer-indicator-center-maxWidth'>
                            <GreenOverviewLight name={"AHEAD"} active={inputValue.port.engineDirection === EngineDirection.Ahead}/>
                            <GreenOverviewLight name={"NEUTRAL"} active={inputValue.port.engineDirection === EngineDirection.Neutral}/>
                            <GreenOverviewLight name={"ASTERN"} active={inputValue.port.engineDirection === EngineDirection.Astern}/>
                            <GreenOverviewLight name={"REMOTE CONTROL"} active={inputValue.port.engineControlStatus === EngineControlStatus.Remote}/>
                            <GreenOverviewLight name={"LOCAL CONTROL"} active={inputValue.port.engineControlStatus === EngineControlStatus.Local}/>
                        </div>
                        <div style={{height : 5}}></div>
                        <div className='overviewContainer-indicator-center-maxWidth'>
                            <RedOverviewLight name={"EMG STOP"} active={inputValue.port.emergencyStop}/>
                            <GreenOverviewLight name={"READY TO START"} active={inputValue.port.readyToStart}/>
                            <RedOverviewLight name={"AUX. BLOWER FAILURE"} active={inputValue.port.auxBlowerFailure}/>
                            <GreenOverviewLight name={"ENGINE RUNNING"} active={inputValue.port.engineRunning}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Overview;