import React, { useCallback, useEffect } from 'react'

function getBoxWidth(boxWidth){
    if(boxWidth == null) return 100
    return boxWidth
}

function VoltMeterIndicator({lifeHour, boxWidth}) {
    return (
        <div style={{width: getBoxWidth(boxWidth)}} className='tealBox'>
            <div style={{'display': 'flex', fontWeight: 'bold', alignItems: 'center', justifyContent: 'center'}}> VOLTMETER </div>
            <div className='battreyText-value'> {lifeHour + ' V'} </div>
        </div>
    );
}

export default VoltMeterIndicator;