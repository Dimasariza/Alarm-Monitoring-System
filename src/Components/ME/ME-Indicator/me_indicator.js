import React, { useCallback, useState } from 'react'
import METempGraph from './me_temp_graph.js';
import MEIndicatorGroup from './me_indicators_group.js'
import GreenOverviewLight from '../../Overview/greenOverviewButton.js';
import RedOverviewLight from '../../Overview/redOverviewButton.js';
import { EngineControlStatus, EngineDirection } from '../../DataComponents/EngineControls/EngineData.js';

function ME_Indicator({inputValueStbd, inputValuePort, setState, stateName, alarmManager}) {
    return (
        <div className='displayContainer-split' style={{height : 455}}>
            <MEIndicatorGroup inputValue={inputValueStbd} setState={setState} stateName={''} alarmManager={alarmManager} currentState={stateName}/>
            {/* <MEIndicatorGroup inputValue={inputValuePort} setState={setState} stateName={'PORT ENGINE'} alarmManager={alarmManager} currentState={stateName}/> */}
            {/* <div className='whiteBox' style={{width: '35%', height: '100%'}}> */}
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 5, width: '20%'}}>
                    <div style={{display: 'flex', flexDirection: 'row', gap: 5}}>
                        <GreenOverviewLight name={"NEUTRAL"} active={inputValueStbd.engineDirection === EngineDirection.Neutral}/>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', gap: 5}}>
                        <GreenOverviewLight name={"AHEAD"} active={inputValueStbd.engineDirection === EngineDirection.Ahead}/>
                        <GreenOverviewLight name={"ASTERN"} active={inputValueStbd.engineDirection === EngineDirection.Astern}/>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', gap: 5}}>
                        <GreenOverviewLight name={"REMOTE CONTROL"} active={inputValueStbd.engineControlStatus === EngineControlStatus.Remote}/>
                        <GreenOverviewLight name={"LOCAL CONTROL"} active={inputValueStbd.engineControlStatus === EngineControlStatus.Local}/>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', gap: 5}}>
                        <RedOverviewLight name={"EMG STOP"} active={inputValueStbd.emergencyStop}/>
                        <GreenOverviewLight name={"READY TO START"} active={inputValueStbd.readyToStart}/>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', gap: 5}}>
                        <GreenOverviewLight name={"ENGINE RUNNING"} active={inputValueStbd.engineRunning}/>
                        <RedOverviewLight name={"AUX. BLOWER FAILURE"} active={inputValueStbd.auxBlowerFailure}/>
                    </div>
                </div>
            {/* </div> */}
        </div>
    );
}

export default ME_Indicator;