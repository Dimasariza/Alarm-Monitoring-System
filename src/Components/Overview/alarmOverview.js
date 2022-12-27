import React, { useCallback, useEffect } from 'react'
import RoundAlarm from '../Indicator/roundAlarm';
import RoundAlarmGreen from '../Indicator/roundAlarmGreen';


function AlarmOverview({firstAlarm, secondAlarm}) {
    return (
        <div style={{display: 'flex', width: '99%', height: '30%', justifyContent: 'space-around'}}>
            <div className='tealBox' style={{display: 'flex', width: '40%', height: '50%', alignItems: 'center', justifyContent: 'space-around'}}>
                <div style={{'fontSize': 10}}>
                    STARTING FAILURE
                </div>
                <div style={{width: 20, height: 20}} >
                    <RoundAlarmGreen active={firstAlarm} />
                </div>
            </div>
            <div className='tealBox' style={{display: 'flex', width: '40%', height: '50%', alignItems: 'center', justifyContent: 'space-around'}}>
                <div style={{'fontSize': 10}}>
                    BATTREY CHARGED
                </div>
                <div style={{width: 20, height: 20}} >
                    <RoundAlarm active={secondAlarm}/>
                </div>
            </div>
        </div>
    );
}

export default AlarmOverview;