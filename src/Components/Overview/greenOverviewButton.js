import React, { useCallback, useEffect } from 'react'

function getNumber(overrideWidth){
    if(overrideWidth == null){
        return 75
    }else{
        return overrideWidth
    }
}

function GreenOverviewButton({name, active, overrideWidth}) {
    return (
        <button style={{'--boxWidth': getNumber(overrideWidth)}} className={active ? 'whiteBox-OverviewButton-Green' : 'whiteBox-OverviewButton-Off'}>
            {name}
        </button>
    );
}

export default GreenOverviewButton;