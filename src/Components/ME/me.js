import React, { useCallback, useEffect, useState } from 'react'
import ME_Indicator from './ME-Indicator/me_indicator';
import ME_Progress from './ME-Progress/me_progress';
import MEStateButton from './ME-Indicator/me_state_change_button';
import ArrowLefticonActive from '../../Assets/AMS-Modelling-Assets/ArrowLefticonActive.png'
import ArrowRightIconActive from '../../Assets/AMS-Modelling-Assets/ArrowRightIconActive.png'
import Overview from '../Overview/overview';

function ME({state, setState}) {
    return (
        <div className='meContainer'>
            <div className={state==0 ? 'displayContainer-activated' : 'displayContainer-deactivated'}>
                <ME_Indicator stateName={'STBD ENGINE'}/>
            </div>
            <div className={state==1 ? 'displayContainer-activated' : 'displayContainer-deactivated'}>
                <ME_Indicator stateName={'PORT ENGINE'}/>
            </div>
            <div className={state==2 ? 'displayContainer-activated' : 'displayContainer-deactivated'}>
                <Overview />
            </div>
            <div className='StateChangeButton-container'>
                <MEStateButton icon={ArrowLefticonActive} state={state} setState={setState} stateValueChange={-1} max={2} min={0} />
                <MEStateButton icon={ArrowRightIconActive} state={state} setState={setState} stateValueChange={1} max={2} min={0}/>
            </div>
        </div>
        
    );
}

export default ME;