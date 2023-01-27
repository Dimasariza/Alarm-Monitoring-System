import React, { useCallback, useEffect, useState } from 'react'
import EngineIcon from '../../Assets/AMS-Modelling-Assets/EngineIcon.png'
import HourIndicator from '../Overview/hourIndicator';

function RunningHourDisplay({mainEngineValue, state, setState}) {
    return (
        <div className='meContainer'>
            <div className='displayContainer-split'style={{height : 455}}>
                <div style={{display: 'flex', flexDirection: 'column', height: '100%', width: '50%'}}>
                    <div className='whiteBox' style={{display: 'flex', position: 'relative', flexDirection: 'column', height: '50%'}}>
                        <div className='indicator-customLoc' style={{'--topPos': 10, '--leftPos': 90, fontSize: 10}}>
                            STBD ENGINE
                        </div>
                        <div className='indicator-customLoc' style={{'--topPos': 7, '--leftPos': 10}}>
                            <img src={EngineIcon} style={{width: '200%', height: '200%'}}/>
                        </div>
                        <div className='indicator-customLoc' style={{'--topPos': 55, '--leftPos': 70}}>
                            <HourIndicator lifeHour={100} />
                        </div>
                    </div>
                    <div className='whiteBox' style={{display: 'flex', position: 'relative', flexDirection: 'column', height: '50%'}}>
                        <div className='indicator-customLoc' style={{'--topPos': 0, '--leftPos': 0}}>
                            <img src={EngineIcon}/>
                        </div>
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', height: '100%', width: '50%'}}>
                    <div className='whiteBox' style={{display: 'flex', flexDirection: 'column', height: '50%'}}></div>
                    <div className='whiteBox' style={{display: 'flex', flexDirection: 'column', height: '50%'}}></div>
                </div>
                {/* <METempGraph temperatureArray={inputValue.engineTemperature} />
                <MEIndicatorGroup inputValue={inputValue} setState={setState} stateName={stateName}/> */}
            </div>
            {/* <div className={state==0 ? 'displayContainer-activated' : 'displayContainer-deactivated'}>
                <ME_Indicator stateName={'STBD ENGINE'} inputValue={mainEngineValue.stbd}/>
            </div>
            <div className={state==1 ? 'displayContainer-activated' : 'displayContainer-deactivated'}>
                <ME_Indicator stateName={'PORT ENGINE'} inputValue={mainEngineValue.port}/>
            </div>
            <div className={state==2 ? 'displayContainer-activated' : 'displayContainer-deactivated'}>
                <Overview inputValue={mainEngineValue}/>
            </div>
            <div className='StateChangeButton-container'>
                <MEStateButton icon={ArrowLefticonActive} state={state} setState={setState} stateValueChange={-1} max={2} min={0} />
                <MEStateButton icon={ArrowRightIconActive} state={state} setState={setState} stateValueChange={1} max={2} min={0}/>
            </div> */}
        </div>
    );
}

export default RunningHourDisplay;