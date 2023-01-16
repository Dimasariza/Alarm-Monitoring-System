import React, { useCallback, useEffect } from 'react'

function getBoxWidth(boxWidth){
    if(boxWidth == null) return 100
    return boxWidth
}

function PFIndicator({lifeHour, boxWidth}) {
    return (
        <div style={{width: getBoxWidth(boxWidth)}} className='tealBox'>
            <div style={{'display': 'flex', fontWeight: 'bold', alignItems: 'center', justifyContent: 'center'}}> PF </div>
            <div className='battreyText-value'> {lifeHour.toFixed(2)} </div>
        </div>
    );
}

export default PFIndicator;