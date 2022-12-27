import React, { useCallback, useState } from 'react'
import METempGraph from './me_temp_graph.js';
import MEIndicatorGroup from './me_indicators_group.js'

function ME_Indicator({state, setState, stateName}) {
    const [temperatureArray, setTEMP] = useState([100, 100, 200, 300, 400, 500, 600, 100]);
    return (
        <div className='displayContainer-split'style={{height : 455}}>
            <METempGraph temperatureArray={temperatureArray} />
            <MEIndicatorGroup setState={setState} stateName={stateName}/>
        </div>
    );
}

export default ME_Indicator;