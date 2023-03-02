import React, { useCallback, useEffect, useState } from 'react'
import ParameterSettings from './parameterSettings';
import MEStateButton from '../ME/ME-Indicator/me_state_change_button';
import ArrowLefticonActive from '../../Assets/AMS-Modelling-Assets/ArrowLefticonActive.png'
import ArrowRightIconActive from '../../Assets/AMS-Modelling-Assets/ArrowRightIconActive.png'
import ParameterSettings2 from './parameterSettings2';
import ParameterDigitalSettings from './parameterDigitalSettings';
import ParameterDigitalSettings_ME from './parameterDigitalSettings_ME';

function Parameter({state, setState, mainEngineValue, auxEngineValue, loginManager, virtualKeyboardManager, alarmManager}) {
    const [allowEdit, setAllowEdit] = useState(loginManager.loggedIn);
    const [refresher, setRefresh] = useState(false);
    
    useEffect(() => {
        loginManager.on('LoginSuccess', () => {
            setAllowEdit(true);
        });
        loginManager.on('LogoutSuccess', () => {
            setAllowEdit(false);
        });
    }, []);

    return (
        <div>
            <div className={!allowEdit ? 'meContainer-warning-login' : 'mainContainer-login-off'}>
                Please Login To Change Parameter Settings
            </div>
            <div className={allowEdit ? 'meContainer' : 'mainContainer-login-off'}>
            <div className={state==0 ? 'displayContainer-split-parameter-active' : 'displayContainer-split-parameter-inactive'}>
                    <ParameterDigitalSettings_ME side={"MAIN ENGINE - DIGITAL & SAFETY ALARM"} engineValue={mainEngineValue.stbd} alarmManager={alarmManager}/>
                    <ParameterDigitalSettings side={"AUX ENGINE - DIGITAL & SAFETY ALARM"} engineValue={auxEngineValue.stbd} alarmManager={alarmManager}/>
                </div>
                <div className={state==1 ? 'displayContainer-split-parameter-active' : 'displayContainer-split-parameter-inactive'}>
                    <ParameterSettings side={"MAIN ENGINE"} engineValue={mainEngineValue.stbd} virtualKeyboardManager={virtualKeyboardManager}/>
                    <ParameterSettings2 side={"MAIN ENGINE"} engineValue={mainEngineValue.stbd} virtualKeyboardManager={virtualKeyboardManager}/>
                </div>
                <div className={state==2 ? 'displayContainer-split-parameter-active' : 'displayContainer-split-parameter-inactive'}>
                    <ParameterSettings side={"AUX. ENGINE"} engineValue={auxEngineValue.stbd} virtualKeyboardManager={virtualKeyboardManager}/>
                    <ParameterSettings2 side={"AUX. ENGINE"} engineValue={auxEngineValue.stbd} virtualKeyboardManager={virtualKeyboardManager}/>
                </div>
                <div className='StateChangeButton-container'>
                    <MEStateButton icon={ArrowLefticonActive} state={state} setState={setState} stateValueChange={-1} max={2} min={0} />
                    <MEStateButton icon={ArrowRightIconActive} state={state} setState={setState} stateValueChange={1} max={2} min={0}/>
                </div>
            </div>
        </div>
        
    );
}

export default Parameter;