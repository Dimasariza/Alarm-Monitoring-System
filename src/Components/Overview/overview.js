import React, { useCallback, useEffect } from 'react'
import IndicatorRevolutionEngine from '../Indicator/indicator_Revolution_Engine'
import IndicatorRevolutionPropeller from '../Indicator/indicator_Revolution_Propeller';
import OverviewButton from './overviewButton';
import BattreyIndicator from './battreyIndicator';
import RedOverviewButton from './redOverviewButton';
import GreenOverviewButton from './greenOverviewButton';
import HourIndicator from './hourIndicator';


function Overview({}) {
    return (
        <div className='overviewContainer'>
            <div className='overviewContainer-indicator'>
                <div className='whiteBox-overview-indicator'>
                    <div className='text-block-right'> STBD ENGINE</div>
                    <div className='overviewContainer-indicator-center'>
                        <div className='indicator-customLoc' style={{'--topPos' : 2, '--leftPos' : 15 }}>
                            <IndicatorRevolutionPropeller rawValue={2000} size={150}/>
                        </div>
                        <div className='indicator-customLoc' style={{'--topPos' : 1600, '--leftPos' : 2 }}>
                            <BattreyIndicator voltage={13.5} battreyLife={80} boxWidth={77} />
                        </div>
                        <div className='indicator-customLoc' style={{'--topPos' : 50, '--leftPos' : 49 }}>
                            <IndicatorRevolutionEngine rawValue={2000} size={240} />
                        </div>
                        <div className='indicator-customLoc' style={{'--topPos' : 1600, '--leftPos' : 25 }}>
                            <HourIndicator lifeHour={80} />
                        </div>
                    </div>
                </div>
                <div className='whiteBox-overview-indicator'>
                    <div className='text-block-left'> PORT ENGINE</div>
                    <div className='overviewContainer-indicator-center'>
                        <div className='indicator-customLoc' style={{'--topPos' : 2, '--leftPos' : 55 }}>
                            <IndicatorRevolutionPropeller rawValue={2000} size={150}/>
                        </div>
                        <div className='indicator-customLoc' style={{'--topPos' : 1600, '--leftPos' : 81 }}>
                            <BattreyIndicator voltage={13.5} battreyLife={80} boxWidth={77}/>
                        </div>
                        <div className='indicator-customLoc' style={{'--topPos' : 50, '--leftPos' : 1 }}>
                            <IndicatorRevolutionEngine rawValue={2000} size={240} />
                        </div>
                        <div className='indicator-customLoc' style={{'--topPos' : 1600, '--leftPos' : 52 }}>
                            <HourIndicator lifeHour={80} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='whiteBox-noBorder'>
                <div className='overviewContainer-indicator'>
                    <div className='whiteBox-overview-indicator-noBorder'>
                        <div className='overviewContainer-indicator-center-maxWidth'>
                            <GreenOverviewButton name={"AHEAD"} active={false}/>
                            <GreenOverviewButton name={"NEUTRAL"} active={true}/>
                            <GreenOverviewButton name={"ASTERN"} active={false}/>
                            <GreenOverviewButton name={"REMOTE CONTROL"} active={false}/>
                            <GreenOverviewButton name={"LOCAL CONTROL"} active={true}/>
                        </div>
                        <div style={{height : 5}}></div>
                        <div className='overviewContainer-indicator-center-maxWidth'>
                            <RedOverviewButton name={"EMG STOP"} active={true}/>
                            <RedOverviewButton name={"READY TO START"} active={false}/>
                            <RedOverviewButton name={"AUX. BLOWER FAILURE"} active={false}/>
                            <RedOverviewButton name={"ENGINE RUNNING"} active={false}/>
                        </div>
                        
                    </div>
                    <div className='whiteBox-overview-indicator-noBorder'>
                        <div className='overviewContainer-indicator-center-maxWidth'>
                            <GreenOverviewButton name={"AHEAD"} active={false}/>
                            <GreenOverviewButton name={"NEUTRAL"} active={false}/>
                            <GreenOverviewButton name={"ASTERN"} active={false}/>
                            <GreenOverviewButton name={"REMOTE CONTROL"} active={false}/>
                            <GreenOverviewButton name={"LOCAL CONTROL"} active={false}/>
                        </div>
                        <div style={{height : 5}}></div>
                        <div className='overviewContainer-indicator-center-maxWidth'>
                            <RedOverviewButton name={"EMG STOP"} active={true}/>
                            <RedOverviewButton name={"READY TO START"} active={false}/>
                            <RedOverviewButton name={"AUX. BLOWER FAILURE"} active={false}/>
                            <RedOverviewButton name={"ENGINE RUNNING"} active={false}/>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Overview;