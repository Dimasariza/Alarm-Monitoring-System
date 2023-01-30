import React, { useCallback, useState } from 'react'
import METempGraph from './me_temp_graph.js';
import MEIndicatorGroup from './me_indicators_group.js'

function ME_Indicator({inputValue, setState, stateName, alarmManager}) {
    return (
        <div className='displayContainer-split'style={{height : 455}}>
            <METempGraph temperatureArray={inputValue.engineTemperature} />
            <MEIndicatorGroup inputValue={inputValue} setState={setState} stateName={stateName} alarmManager={alarmManager}/>
        </div>
    );
}

export default ME_Indicator;