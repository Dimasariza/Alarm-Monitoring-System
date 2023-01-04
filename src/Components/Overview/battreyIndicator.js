import React, { useCallback, useEffect } from 'react'
import UI_ENIN_Battrey_icon_Outer from '../../Assets/UI_Asset/SVG-UI-SIMS/UI-ECHO/Battrey/UI_ENIN_Battery_icon_Outer.png'
import UI_ENIN_Battery_icon_inner from '../../Assets/UI_Asset/SVG-UI-SIMS/UI-ECHO/Battrey/UI_ENIN_Battery_icon_inner.png'

function getProgressWidth(percentage, maxWidth){
    return maxWidth * (percentage / 100)
}

function BattreyIndicator({voltage, battreyLife, boxWidth}) {
    return (
        <div className='battreyBG' style={{'--boxWidth': boxWidth}}>
            <div className='battreyText-title'> Battrey </div>
            <div className='battreyText-value'> {voltage.toFixed(1)} </div>
            <div className='battreyImage'> 
                <div className='battreyText-title'>
                    Volts
                </div> 
                <div className='indicator-container' style={{width : 42, height : 18 }}>
                    <img className='indicator' src={UI_ENIN_Battrey_icon_Outer} />
                    <div className='battreyLoadingBar' style={{width : getProgressWidth(battreyLife, 31)}}/>
                </div>
            </div>
        </div>
    );
}

export default BattreyIndicator;