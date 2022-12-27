import React, { useCallback, useEffect } from 'react'

function RoundAlarm({active}) {
    return (
        <div className={active ? 'whiteBox-RoundAlarm-On-Red' : 'whiteBox-RoundAlarm-Off'}>
        </div>
    );
}

export default RoundAlarm;