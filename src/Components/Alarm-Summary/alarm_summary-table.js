import React from 'react'
import { AlarmStatus } from '../DataComponents/AlarmControls/AlarmManager';

function getTableHeight(alarmRecord){
    var totalHeight = 55 + 55 * alarmRecord.length;
    var maxHeight = 420;
    if(totalHeight > maxHeight){
        return maxHeight;
    }else{
        return totalHeight;
    }
}

function dateToStringFormat(date){
    var stringDate = checkSingleDigit((date.getMonth() + 1)) + "/" + checkSingleDigit(date.getDate()) +"/" + date.getFullYear();
    var stringHours = checkSingleDigit(date.getHours()) + ":" + checkSingleDigit(date.getMinutes()) +":" + checkSingleDigit(date.getSeconds());
    return stringDate + " " + stringHours
}

function checkSingleDigit(target){
    if(target < 10){
        return "0" + target
    }else{
        return target
    }
}


function AlarmSummaryTable({alarmRecord}) {
    return (
        <div className='tableContainer' style={{height : getTableHeight(alarmRecord)}} >
                <table className="darkTable">
                    <thead>
                        {/* <tr>
                            <th style={{width : 200, height : 30}}>Active Time</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>!</th>
                        </tr> */}
                    </thead>
                    <tbody>
                        {   
                            alarmRecord.map((value, key) =>{
                                return(
                                    <tr style={{background: (value.status == AlarmStatus.Active)? '#FF0000' : '#2C2C2C'}} key={key}>
                                        <td>{dateToStringFormat(value.recordedTime)}</td>
                                        <td>{value.desc}</td>
                                        <td>{value.source}</td>
                                        <td>{(value.status == AlarmStatus.Active)? 'ALH' : 'INH'}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
    );
}

export default AlarmSummaryTable;