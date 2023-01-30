import React, { useCallback, useState } from 'react'
import METempGraph from './me_temp_graph.js';
import MEIndicatorGroup from './me_indicators_group.js'

function ME_Indicator({inputValueStbd, inputValuePort, setState, stateName, alarmManager}) {
    return (
        <div className='displayContainer-split'style={{height : 455}}>
            <MEIndicatorGroup inputValue={inputValueStbd} setState={setState} stateName={'STBD ENGINE'} alarmManager={alarmManager} currentState={stateName}/>
            <MEIndicatorGroup inputValue={inputValuePort} setState={setState} stateName={'PORT ENGINE'} alarmManager={alarmManager} currentState={stateName}/>
        </div>
    );
}

export default ME_Indicator;