import React, { useCallback, useEffect } from 'react'
import ParameterSettings from './parameterSettings';

function Parameter({}) {
    return (
        <div className='displayContainer-split'>
            <ParameterSettings side={"PORT"}/>
            <ParameterSettings side={"STBD"}/>
        </div>
    );
}

export default Parameter;