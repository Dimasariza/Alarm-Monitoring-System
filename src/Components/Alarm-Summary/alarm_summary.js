import { max } from 'moment/moment';
import React, { useCallback, useEffect, useState } from 'react'
import AlarmCounter from './alarm_summary-alarmCounter';
import LastAlarm from './alarm_summary-lastAlarm';
import AlarmSummaryTable from './alarm_summary-table';
import { AlarmStatus } from '../DataComponents/AlarmControls/AlarmManager';

function AlarmSummary({alarmManager}) {
    const [alarmRecord, setAlarmRecord] = useState([]);
    // const [alarmRecord, setAlarmRecord] = useState([
    //     {recordedTime : new Date, desc : "Action1", source: 'Main Engine', alertSymbol: 'AL', status: AlarmStatus.Active},
    //     {recordedTime : new Date, desc : "Action1", source: 'Main Engine', alertSymbol: 'AL', status: AlarmStatus.Active},
    //     {recordedTime : new Date, desc : "Action1", source: 'Main Engine', alertSymbol: 'AL', status: AlarmStatus.Active},
    //     {recordedTime : new Date, desc : "Action1", source: 'Main Engine', alertSymbol: 'AL', status: AlarmStatus.Active},
    //     {recordedTime : new Date, desc : "Action2", source: 'Main Engine', alertSymbol: 'AL', status: AlarmStatus.Active},
    //     {recordedTime : new Date, desc : "Action2", source: 'Main Engine', alertSymbol: 'AL', status: AlarmStatus.Active},
    //     {recordedTime : new Date, desc : "Action2", source: 'Main Engine', alertSymbol: 'AL', status: AlarmStatus.Active},
    //     {recordedTime : new Date, desc : "Stop Failure", source: 'Main Engine', alertSymbol: 'INH', status: AlarmStatus.Acknowledged},
    //     {recordedTime : new Date, desc : "Start Failure", source: 'Auxiliary Engine', alertSymbol: 'INH', status: AlarmStatus.Acknowledged},
    //     {recordedTime : new Date, desc : "Shutdown Cancelled", source: 'Bridge Room', alertSymbol: 'INH', status: AlarmStatus.Acknowledged},
    //     {recordedTime : new Date, desc : "Air Compress Pressure Low", source: 'Main Engine', alertSymbol: 'INH', status: AlarmStatus.Acknowledged},
    //     {recordedTime : new Date, desc : "ME Cooling Water HT Shutdown", source: 'Main Engine', alertSymbol: 'INH', status: AlarmStatus.Acknowledged},
    //     {recordedTime : new Date, desc : "ME Lub Oil Low Pressure", source: 'Main Engine', alertSymbol: 'AL', status: AlarmStatus.Acknowledged},
    // ]);
    
    useEffect(() => {
        alarmManager.on('Alarm', (alarm) =>{
            let newData = alarmManager.redAlarm.reverse().concat(alarmManager.greyAlarm.reverse())
            setAlarmRecord(newData);
        })
    }, []);

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