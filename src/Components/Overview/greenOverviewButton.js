import React, { useState, useEffect } from 'react'

function getNumber(overrideWidth){
    if(overrideWidth == null){
        return 75
    }else{
        return overrideWidth
    }
}



function GreenOverviewLight({name, active, overrideWidth}) {
    const[currentState, setCurrentState] = useState(true);

    return (
        // <button style={{'--boxWidth': getNumber(overrideWidth)}} onClick={() => setCurrentState(prev => !prev)} className={currentState ? 'whiteBox-OverviewButton-Green' : 'whiteBox-OverviewButton-Off'}>
        //     {name}
        // </button>
        <button style={{'--boxWidth': getNumber(overrideWidth)}} onClick={() => setCurrentState(prev => !prev)} className={active ? 'whiteBox-OverviewButton-Green' : 'whiteBox-OverviewButton-Off'}>
            {name}
        </button>
    );
}

export default GreenOverviewLight;