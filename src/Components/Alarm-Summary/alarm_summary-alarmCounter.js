import React, { useCallback, useEffect } from 'react'

function AlarmCounter({}) {
    return (
        <div className='whiteBox-topInfo-container'>
                <div className='tealBox' style={{width : 250, textAlign : 'center'}}> ACTIVE TIME</div>
                <div className='tealBox' style={{width : 400, textAlign : 'center'}}> DESCRIPTION </div>
                <div className='tealBox' style={{width : 210, textAlign : 'center'}}> CATEGORY </div>
                <div className='tealBox' style={{width : 60, textAlign : 'center'}}> ! </div>
        </div>
    );
}

export default AlarmCounter;