import React, { useCallback, useEffect } from 'react'
import IndicatorRevolutionEngine from '../Indicator/indicator_Revolution_Engine'
import IndicatorRevolutionPropeller from '../Indicator/indicator_Revolution_Propeller';
import OverviewButton from './overviewButton';
import BattreyIndicator from './battreyIndicator';
import RedOverviewButton from './redOverviewButton';
import GreenOverviewButton from './greenOverviewButton';
import HourIndicator from './hourIndicator';
import COMPASS_BG from '../../Assets/PMSOL/COMPASS_BG.png'
import CompassParemeter from './compassParameter';
import doubleNeedle from '../../Assets/PMSOL/doubleNeedle.png'
import AlarmOverview from './alarmOverview';


function DetailedOverview({}) {
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
                                    <IndicatorRevolutionPropeller rawValue={2000} size={100}/>
                                </div>
                                <div className='indicator-customLoc' style={{'--topPos' : 200, '--leftPos' : 55 }}>
                                    <IndicatorRevolutionEngine rawValue={2000} size={140} />
                                </div>
                                <div className='indicator-customLoc' style={{'--topPos' : 1050, '--leftPos' : 0 }}>
                                    <HourIndicator lifeHour={80} />
                                </div>
                            </div>
                        </div>
                        <AlarmOverview firstAlarm={true} secondAlarm={true}/>
                    </div>
                    <div  style={{position: 'relative', width: '50%', height: '95%'}}>
                        <div className='whiteBox' style={{position: 'relative', width: '94%', height: '75%'}}>
                            <div className='overviewContainer-indicator-center'>
                                <div className='indicator-customLoc' style={{'--topPos' : 0, '--leftPos' : 5 }}>
                                    PORT ENGINE
                                </div>
                                <div className='indicator-customLoc' style={{'--topPos' : 10, '--leftPos' : 45 }}>
                                    <IndicatorRevolutionPropeller rawValue={2000} size={100}/>
                                </div>
                                <div className='indicator-customLoc' style={{'--topPos' : 200, '--leftPos' : 2 }}>
                                    <IndicatorRevolutionEngine rawValue={2000} size={140} />
                                </div>
                                <div className='indicator-customLoc' style={{'--topPos' : 1050, '--leftPos' : 65 }}>
                                    <HourIndicator lifeHour={80} />
                                </div>
                            </div>
                        </div>
                        <AlarmOverview firstAlarm={true} secondAlarm={true}/>
                    </div>
                </div>
                <div style={{display: 'flex', width: '100%', height: '50%'}}>
                    <div style={{position: 'relative', width: '50%', height: '95%'}}>
                        <div className='whiteBox' style={{position: 'relative', width: '94%', height: '75%'}}>
                            UWU
                        </div>
                        <AlarmOverview firstAlarm={true} secondAlarm={true}/>
                    </div>
                    <div style={{position: 'relative', width: '50%', height: '95%'}}>
                        <div className='whiteBox' style={{position: 'relative', width: '94%', height: '75%'}}>
                            UWU
                        </div>
                        <AlarmOverview firstAlarm={true} secondAlarm={true}/>
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
                <CompassParemeter parameter={'GPS Speed'} value={'4.00'} unit={'knots'}/>
                <CompassParemeter parameter={'GPS Heading (COG)'} value={'017'} unit={'°M'}/>
                <CompassParemeter parameter={'Depth'} value={'19.9'} unit={'Meters'}/>
                <div>GPS Position</div>
                <CompassParemeter parameter={'LONG'} value={'N DDD° MM\' SS.S\'\''} unit={''}/>
                <CompassParemeter parameter={'LAT'} value={'S DDD° MM\' SS.S\'\''} unit={''}/>
            </div>
        </div>
    );
}

export default DetailedOverview;