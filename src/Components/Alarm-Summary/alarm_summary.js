import { max } from 'moment/moment';
import React, { useCallback, useEffect, useState } from 'react'
import AlarmCounter from './alarm_summary-alarmCounter';
import LastAlarm from './alarm_summary-lastAlarm';
import AlarmSummaryTable from './alarm_summary-table';
import { AlarmStatus } from '../DataComponents/AlarmControls/AlarmManager';

function AlarmSummary({alarmManager}) {
    const [alarmRecord, setAlarmRecord] = useState([]);
    
    useEffect(() => {
        const updateAlarmList = (alarm) =>{
            let newData = alarmManager.redAlarm.reverse().concat(alarmManager.greyAlarm.reverse())
            setAlarmRecord(newData);
        }
        alarmManager.on('Alarm', updateAlarmList)

        return () => {
            alarmManager.off('Alarm', updateAlarmList)
        }
    }, [alarmManager]);

    return (
        <div className='whiteBox-AlarmSummary-Container'>
            <div className='whiteBox-topInfo'>
                <AlarmCounter />
            </div>
            <AlarmSummaryTable alarmRecord={alarmRecord.slice()} />
        </div>
    );
}

export default AlarmSummary;