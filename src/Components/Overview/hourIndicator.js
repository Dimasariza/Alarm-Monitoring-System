import React, { useCallback, useEffect } from 'react'

function getBoxWidth(boxWidth){
    if(boxWidth == null) return 100
    return boxWidth
}

function HourIndicator({lifeHour, boxWidth}) {
    return (
        <div style={{width: getBoxWidth(boxWidth)}} className='tealBox'>
            <div style={{'display': 'flex', fontWeight: 'bold', alignItems: 'center', justifyContent: 'center'}}> HOURS </div>
            <div className='battreyText-value'> {lifeHour.toString().padStart(6, "0")} </div>
        </div>
    );
}

export default HourIndicator;