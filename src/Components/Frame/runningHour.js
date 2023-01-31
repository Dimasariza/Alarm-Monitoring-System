import React, { useCallback, useEffect, useState } from 'react'
import EngineIcon from '../../Assets/AMS-Modelling-Assets/EngineIcon.png'
import HourIndicator from '../Overview/hourIndicator';
import HDEngineImage from '../../Assets/PMSOL/HDEngineImage.png'
import HDEngineImagePower from '../../Assets/PMSOL/HDEngineImage_Power.png'

function RunningHourDisplay({mainEngineValue, auxEngineValue, state, setState}) {
    return (
        <div className='meContainer'>
            <div className='displayContainer-split'style={{height : 455}}>
                <div style={{display: 'flex', flexDirection: 'column', height: '100%', width: '50%'}}>
                    <div className='whiteBox' style={{display: 'flex', position: 'relative', flexDirection: 'column', height: '50%'}}>
                        <div className='indicator-customLoc' style={{'--topPos': 5, '--leftPos': 5}}>
                            <img src={HDEngineImage} style={{width: '65%', height: '65%'}}/>
                        </div>
                        <div className='indicator-customLoc' style={{'--topPos': 3, '--leftPos': 70, fontSize: 20, width: 200, fontWeight: 'bold'}}>
                            STBD ENGINE
                        </div>
                        <div className='indicator-customLoc' style={{'--topPos': 55, '--leftPos': 70}}>
                            <HourIndicator lifeHour={mainEngineValue.stbd.runningHour} />
                        </div>
                    </div>
                    <div className='whiteBox' style={{display: 'flex', position: 'relative', flexDirection: 'column', height: '50%'}}>
                        <div className='indicator-customLoc' style={{'--topPos': 10, '--leftPos': 5}}>
                            <img src={HDEngineImagePower} style={{width: '65%', height: '65%'}}/>
                        </div>
                        <div className='indicator-customLoc' style={{'--topPos': 3, '--leftPos': 60, fontSize: 20, width: 200, fontWeight: 'bold'}}>
                            STBD GENERATOR
                        </div>
                        <div className='indicator-customLoc' style={{'--topPos': 55, '--leftPos': 70}}>
                            <HourIndicator lifeHour={auxEngineValue.stbd.runningHour} />
                        </div>
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', height: '100%', width: '50%'}}>
                    <div className='whiteBox' style={{display: 'flex', position: 'relative', flexDirection: 'column', height: '50%'}}>
                        <div className='indicator-customLoc' style={{'--topPos': 5, '--leftPos': 35}}>
                            <img src={HDEngineImage} style={{width: '95%', height: '95%'}}/>
                        </div>
                        <div className='indicator-customLoc' style={{'--topPos': 3, '--leftPos': 2, fontSize: 20, width: 200, fontWeight: 'bold'}}>
                            PORT ENGINE
                        </div>
                        <div className='indicator-customLoc' style={{'--topPos': 55, '--leftPos': 5}}>
                            <HourIndicator lifeHour={0} />
                        </div>
                        <div className={'indicator-customLoc'} style={{background: 'rgba(100, 100, 100, 0.7)', width: '100%', height: '100%'}}/>
                    </div>
                    <div className='whiteBox' style={{display: 'flex', position: 'relative', flexDirection: 'column', height: '50%'}}>
                        <div className='indicator-customLoc' style={{'--topPos': 10, '--leftPos': 35}}>
                            <img src={HDEngineImagePower} style={{width: '95%', height: '95%'}}/>
                        </div>
                        <div className='indicator-customLoc' style={{'--topPos': 3, '--leftPos': 2, fontSize: 20, width: 200, fontWeight: 'bold'}}>
                            PORT GENERATOR
                        </div>
                        <div className='indicator-customLoc' style={{'--topPos': 55, '--leftPos': 5}}>
                            <HourIndicator lifeHour={0} />
                        </div>
                        <div className={'indicator-customLoc'} style={{background: 'rgba(100, 100, 100, 0.7)', width: '100%', height: '100%'}}/>
                    </div>
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