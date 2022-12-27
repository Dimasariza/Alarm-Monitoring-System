import React, { useCallback, useEffect } from 'react'

function getBoxWidth(boxWidth){
    if(boxWidth == null) return 100
    return boxWidth
}

function PowerMeterIndicator({lifeHour, boxWidth}) {
    return (
        <div style={{width: getBoxWidth(boxWidth)}} className='tealBox'>
            <div style={{'display': 'flex', 'font-weight': 'bold', 'align-items': 'center', 'justify-content': 'center'}}> POWER </div>
            <div className='battreyText-value'> {lifeHour + ' kW'} </div>
        </div>
    );
}

export default PowerMeterIndicator;