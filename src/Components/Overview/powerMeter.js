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
        <div style={{width: getBoxWidth(boxWidth), height: getBoxHeight(boxHeight), paddingTop: getBoxHeight(boxHeight)/2}} className='tealBox'>
            <div style={{'display': 'flex', fontWeight: 'bold', alignItems: 'center', justifyContent: 'center'}}> POWER </div>
            <div className='battreyText-value'> {lifeHour + ' kW'} </div>
        </div>
    );
}

export default PowerMeterIndicator;