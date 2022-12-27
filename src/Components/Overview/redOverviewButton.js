import React, { useCallback, useEffect } from 'react'

function getNumber(overrideWidth){
    if(overrideWidth == null){
        return 75
    }else{
        return overrideWidth
    }
}

function RedOverviewButton({name, active, overrideWidth}) {
    return (
        <button style={{'--boxWidth': getNumber(overrideWidth)}} className={active ? 'whiteBox-OverviewButton-Red' : 'whiteBox-OverviewButton-Off'}>
            {name}
        </button>
    );
}

export default RedOverviewButton;