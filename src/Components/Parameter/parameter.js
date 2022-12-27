import React, { useCallback, useEffect } from 'react'
import ParameterSettings from './parameterSettings';
import MEStateButton from '../ME/ME-Indicator/me_state_change_button';
import ArrowLefticonActive from '../../Assets/AMS-Modelling-Assets/ArrowLefticonActive.png'
import ArrowRightIconActive from '../../Assets/AMS-Modelling-Assets/ArrowRightIconActive.png'

function Parameter({state, setState}) {
    return (
        <div className='meContainer'>
            <div className={state==0 ? 'displayContainer-split-parameter-active' : 'displayContainer-split-parameter-inactive'}>
                <ParameterSettings side={"MAIN ENGINE - STBD"}/>
                <ParameterSettings side={"MAIN ENGINE - PORT"}/>
            </div>
            <div className={state==1 ? 'displayContainer-split-parameter-active' : 'displayContainer-split-parameter-inactive'}>
                <ParameterSettings side={"AUX. ENGINE - STBD"}/>
                <ParameterSettings side={"AUX. ENGINE - PORT"}/>
            </div>
            <div className='StateChangeButton-container'>
                <MEStateButton icon={ArrowLefticonActive} state={state} setState={setState} stateValueChange={-1} max={1} min={0} />
                <MEStateButton icon={ArrowRightIconActive} state={state} setState={setState} stateValueChange={1} max={1} min={0}/>
            </div>
        </div>
        
    );
}

export default Parameter;