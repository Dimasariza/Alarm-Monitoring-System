import React, { useCallback, useEffect } from 'react'
import IndicatorRevolutionEngine from '../Indicator/indicator_Revolution_Engine'
import IndicatorRevolutionPropeller from '../Indicator/indicator_Revolution_Propeller';
import HourIndicator from './hourIndicator';
import COMPASS_BG from '../../Assets/PMSOL/COMPASS_BG.png'
import CompassParemeter from './compassParameter';
import doubleNeedle from '../../Assets/PMSOL/doubleNeedle.png'
import AlarmOverview from './alarmOverview';
import PFIndicator from './PF';
import VoltMeterIndicator from './voltmeter';
import PowerMeterIndicator from './powerMeter';
import IndicatorHalfCircle from '../Indicator/indicatorHalfCircle';
import Electricity from '../../Assets/PMSOL/Electricty.png';


function DetailedOverview({mainEngineValue, auxEngineValue, GPSData}) {
    return (
        <div style={{display: 'flex', width: '100%', height: '100%', gap: 10}}>
            <div style={{width: '70%', height: '100%'}}>
                <div style={{display: 'flex', width: '100%', height: '50%', marginBottom: 5, marginRight: 5}}>
                    <div style={{position: 'relative', width: '50%', height: '95%'}}>
                        <div className='whiteBox' style={{position: 'relative', width: '94%', height: '75%'}}>
                            <div className='overviewContainer-indicator-center'>
                                <div className='indicator-customLoc' style={{'--topPos' : 0, '--leftPos' : 60 }}>
                                    STBD ENGINE
                                </div>
                                <div className='indicator-customLoc' style={{'--topPos' : 10, '--leftPos' : 25 }}>
                                    <IndicatorRevolutionPropeller rawValue={mainEngineValue.stbd.shaftRev} size={100}/>
                                </div>
                                <div className='indicator-customLoc' style={{'--topPos' : 200, '--leftPos' : 55 }}>
                                    <IndicatorRevolutionEngine engine={mainEngineValue.stbd} size={140} />
                                </div>
                                <div className='indicator-customLoc' style={{'--topPos' : 1050, '--leftPos' : 0 }}>
                                    <HourIndicator lifeHour={mainEngineValue.stbd.runningHour} />
                                </div>
                            </div>
                        </div>
                        <AlarmOverview firstAlarm={mainEngineValue.stbd.startingFailure} secondAlarm={mainEngineValue.stbd.battreyCharging}/>
                    </div>
                    <div  style={{position: 'relative', width: '50%', height: '95%'}}>
                        <div className='whiteBox' style={{position: 'relative', width: '94%', height: '75%'}}>
                            <div className='overviewContainer-indicator-center'>
                                <div className='indicator-customLoc' style={{'--topPos' : 0, '--leftPos' : 5 }}>
                                    PORT ENGINE
                                </div>
                                <div className='indicator-customLoc' style={{'--topPos' : 10, '--leftPos' : 45 }}>
                                    <IndicatorRevolutionPropeller rawValue={mainEngineValue.port.shaftRev} size={100}/>
                                </div>
                                <div className='indicator-customLoc' style={{'--topPos' : 200, '--leftPos' : 2 }}>
                                    <IndicatorRevolutionEngine engine={mainEngineValue.port} size={140} />
                                </div>
                                <div className='indicator-customLoc' style={{'--topPos' : 1050, '--leftPos' : 65 }}>
                                    <HourIndicator lifeHour={mainEngineValue.port.runningHour} />
                                </div>
                            </div>
                        </div>
                        <AlarmOverview firstAlarm={mainEngineValue.port.startingFailure} secondAlarm={mainEngineValue.port.battreyCharging}/>
                    </div>
                </div>
                <div style={{display: 'flex', width: '100%', height: '50%'}}>
                    <div style={{position: 'relative', width: '50%', height: '95%'}}>
                        <div className='whiteBox' style={{position: 'relative', width: '94%', height: '75%'}}>
                            <div className='overviewContainer-indicator-center'>
                                <div className='indicator-customLoc' style={{'--topPos' : 0, '--leftPos' : 60, fontWeight: 'bold' }}> 
                                    STBD ENGINE
                                </div>
                                <div className='indicator-customLoc' style={{'--topPos' : 1100, '--leftPos' : 80 }}>
                                    <PFIndicator lifeHour={0.85} boxWidth={50} />
                                </div>
                                <div className='indicator-customLoc' style={{'--topPos' : 1100, '--leftPos' : 44 }}> 
                                    <VoltMeterIndicator lifeHour={80} boxWidth={94} />
                                </div>
                                <div className='indicator-customLoc' style={{'--topPos' : 650, '--leftPos' : 0 }}> 
                                    <PowerMeterIndicator lifeHour={80} boxWidth={125} boxHeight={60} />
                                </div>
                                <div className='indicator-customLoc' style={{'--topPos' : 10, '--leftPos' : 2 }}> 
                                    <img src={Electricity} style={{width: 50}}/>
                                </div>
                                <div className='indicator-customLoc' style={{'--topPos' : 190, '--leftPos' : 44 }}> 
                                    <IndicatorHalfCircle rawValue={100} size={90}/>
                                </div>
                            </div>
                        </div>
                        <AlarmOverview firstAlarm={auxEngineValue.stbd.startingFailure} secondAlarm={auxEngineValue.stbd.battreyCharging}/>
                    </div>
                    <div style={{position: 'relative', width: '50%', height: '95%'}}>
                        <div className='whiteBox' style={{position: 'relative', width: '94%', height: '75%'}}>
                            <div className='overviewContainer-indicator-center'>
                                <div className='indicator-customLoc' style={{'--topPos' : 0, '--leftPos' : 6, fontWeight: 'bold' }}> 
                                    PORT ENGINE
                                </div>
                                <div className='indicator-customLoc' style={{'--topPos' : 1100, '--leftPos' : 0 }}>
                                    <PFIndicator lifeHour={0.85} boxWidth={50} />
                                </div>
                                <div className='indicator-customLoc' style={{'--topPos' : 1100, '--leftPos' : 22 }}> 
                                    <VoltMeterIndicator lifeHour={80} boxWidth={94} />
                                </div>
                                <div className='indicator-customLoc' style={{'--topPos' : 650, '--leftPos' : 56 }}> 
                                    <PowerMeterIndicator lifeHour={80} boxWidth={130} boxHeight={60} />
                                </div>
                                <div className='indicator-customLoc' style={{'--topPos' : 10, '--leftPos' : 82 }}> 
                                    <img src={Electricity} style={{width: 50}}/>
                                </div>
                                <div className='indicator-customLoc' style={{'--topPos' : 190, '--leftPos' : 0 }}> 
                                    <IndicatorHalfCircle rawValue={100} size={90}/>
                                </div>
                            </div>
                        </div>
                        <AlarmOverview firstAlarm={auxEngineValue.port.startingFailure} secondAlarm={auxEngineValue.port.battreyCharging}/>
                    </div>
                </div>
            </div>
            <div className='whiteBox' style={{fontSize: 22, width: '30%', height: '98.3%'}}>
                <div style={{display: 'flex', position: 'relative', alignItems: 'center',justifyContent: 'center', justifyItems: 'center'}}>
                    <img src={COMPASS_BG} width={200} />
                    <div className='indicator-customLoc' style={{'--topPos' : 22, '--leftPos' : 48 }}>
                        <img src={doubleNeedle} width={15} />
                    </div>
                </div>
                <CompassParemeter parameter={'GPS Speed'} value={GPSData.speed.toFixed(2)} unit={'knots'}/>
                <CompassParemeter parameter={'GPS Heading (COG)'} value={GPSData.getHeading()} unit={'°M'}/>
                <CompassParemeter parameter={'Depth'} value={GPSData.depth.toFixed(1)} unit={'Meters'}/>
                <div>GPS Position</div>
                <CompassParemeter parameter={'LONG'} value={'N DDD° MM\' SS.S\'\''} unit={''}/>
                <CompassParemeter parameter={'LAT'} value={'S DDD° MM\' SS.S\'\''} unit={''}/>
            </div>
        </div>
    );
}

export default DetailedOverview;