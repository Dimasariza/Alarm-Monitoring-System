import React, { useCallback, useEffect } from 'react'

function LastAlarm({latestAction}) {
    return (
        <div className='whiteBox-topInfo-container'>
            <div>Last Active Alarm : </div>
            <div className='whiteBox' style={{width : 750, height : 25, textAlign : 'left', paddingLeft : 10}}> {latestAction == null ? "" : latestAction}</div>
        </div>
    );
}

export default LastAlarm;