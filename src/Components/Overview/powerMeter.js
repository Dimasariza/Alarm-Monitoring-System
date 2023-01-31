import React, { useCallback, useEffect } from 'react'

function getBoxWidth(boxWidth){
    if(boxWidth == null) return 100
    return boxWidth
}

function getBoxHeight(boxHeight){
    if(boxHeight == null) return 40
    return boxHeight
}

function PowerMeterIndicator({lifeHour, boxWidth, boxHeight}) {
    return (
        <div className='tealBox' style={{width: getBoxWidth(boxWidth), height: getBoxHeight(boxHeight), display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
            <div style={{'display': 'flex', fontWeight: 'bold', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}> 
                POWER
                <div className='battreyText-value'> {lifeHour + ' kW'} </div> 
            </div>
            
        </div>
    );
}

export default PowerMeterIndicator;