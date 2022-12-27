import React, { useCallback, useEffect } from 'react'

function RoundAlarmGreen({active}) {
    return (
        <div className={active ? 'whiteBox-RoundAlarm-On-Green' : 'whiteBox-RoundAlarm-Off'}>
        </div>
    );
}

export default RoundAlarmGreen;