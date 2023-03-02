import React, { useCallback, useEffect, useState } from 'react'
import EngineIcon from '../../Assets/AMS-Modelling-Assets/EngineIcon.png'
import HourIndicator from '../Overview/hourIndicator';
import HDEngineImage from '../../Assets/PMSOL/HDEngineImage.png'
import HDEngineImagePower from '../../Assets/PMSOL/HDEngineImage_Power.png'

function RunningHourDisplay({mainEngineValue, auxEngineValue, state, setState}) {
    return (
        <div className='meContainer'>
            <div className='displayContainer-split'style={{height : '100%', boxSizing: 'border-box'}}>
                <div style={{display: 'flex', flexDirection: 'column', height: '100%', width: '50%', boxSizing: 'border-box'}}>
                    <div className='whiteBox' style={{display: 'flex', position: 'relative', flexDirection: 'column', height: '100%', boxSizing: 'border-box'}}>
                        <div className='indicator-customLoc' style={{'--topPos': 15, '--leftPos': 2}}>
                            <img src={HDEngineImage} style={{width: '100%', height: '100%'}}/>
                        </div>
                        <div className='indicator-customLoc' style={{'--topPos': 3, '--leftPos': 80, fontSize: 20, width: 200, fontWeight: 'bold'}}>
                            ENGINE
                        </div>
                        <div className='indicator-customLoc' style={{'--topPos': 80, '--leftPos': 70}}>
                            <HourIndicator lifeHour={mainEngineValue.stbd.runningHour} />
                        </div>
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', height: '100%', width: '50%'}}>
                    <div className='whiteBox' style={{display: 'flex', position: 'relative', flexDirection: 'column', height: '100%', boxSizing: 'border-box'}}>
                        <div className='indicator-customLoc' style={{'--topPos': 15, '--leftPos': 2}}>
                            <img src={HDEngineImagePower} style={{width: '100%', height: '100%'}}/>
                        </div>
                        <div className='indicator-customLoc' style={{'--topPos': 3, '--leftPos': 72, fontSize: 20, width: 200, fontWeight: 'bold'}}>
                            GENERATOR
                        </div>
                        <div className='indicator-customLoc' style={{'--topPos': 80, '--leftPos': 70}}>
                            <HourIndicator lifeHour={auxEngineValue.stbd.runningHour} />
                        </div>
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