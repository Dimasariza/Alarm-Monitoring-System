import { max } from 'moment/moment';
import React, { useCallback, useEffect, useState } from 'react'
import AlarmCounter from './alarm_summary-alarmCounter';
import LastAlarm from './alarm_summary-lastAlarm';
import AlarmSummaryTable from './alarm_summary-table';

function AlarmSummary({}) {
    const [alarmRecord, setAlarmRecord] = useState([
        {activeTime : new Date, description : "Action1", category: 'Main Engine', alertSymbol: 'AL', active: false},
        {activeTime : new Date, description : "Action1", category: 'Main Engine', alertSymbol: 'AL', active: false},
        {activeTime : new Date, description : "Action1", category: 'Main Engine', alertSymbol: 'AL', active: false},
        {activeTime : new Date, description : "Action1", category: 'Main Engine', alertSymbol: 'AL', active: false},
        {activeTime : new Date, description : "Action2", category: 'Main Engine', alertSymbol: 'AL', active: false},
        {activeTime : new Date, description : "Action2", category: 'Main Engine', alertSymbol: 'AL', active: false},
        {activeTime : new Date, description : "Action2", category: 'Main Engine', alertSymbol: 'AL', active: false},
        {activeTime : new Date, description : "Stop Failure", category: 'Main Engine', alertSymbol: 'INH', active: false},
        {activeTime : new Date, description : "Start Failure", category: 'Auxiliary Engine', alertSymbol: 'INH', active: false},
        {activeTime : new Date, description : "Shutdown Cancelled", category: 'Bridge Room', alertSymbol: 'INH', active: false},
        {activeTime : new Date, description : "Air Compress Pressure Low", category: 'Main Engine', alertSymbol: 'INH', active: false},
        {activeTime : new Date, description : "ME Cooling Water HT Shutdown", category: 'Main Engine', alertSymbol: 'INH', active: false},
        {activeTime : new Date, description : "ME Lub Oil Low Pressure", category: 'Main Engine', alertSymbol: 'AL', active: true},
    ]);

    
    // useEffect(() => {
    //     // console.log(alarmRecord);
    //     var newAlarmecord = alarmRecord.push({activeTime : new Date, description : "Test Updatte"})
    //     // console.log(newAlarmecord);
    //     // setAlarmRecord(newAlarmecord)
    //   }, []);

    return (
        <div className='whiteBox-AlarmSummary-Container'>
            <div className='whiteBox-topInfo'>
                <AlarmCounter alarmCount={alarmRecord.length} inhCount={0}/>
            </div>
            <AlarmSummaryTable alarmRecord={alarmRecord.slice().reverse()} />
        </div>
    );
}

export default AlarmSummary;