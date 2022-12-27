import React, { useCallback, useEffect } from 'react'

function AlarmBlock({name, active}) {
    return (
        <div className={active ? 'whiteBox-Alarm-On' : 'whiteBox-Alarm-Off'}>
            {name}
        </div>
    );
}

export default AlarmBlock;