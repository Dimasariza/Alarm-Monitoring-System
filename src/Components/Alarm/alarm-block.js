import React, { useState, useEffect } from 'react'
import { AlarmStatus } from '../DataComponents/AlarmControls/AlarmManager';

function getClassName(alarmState, blip, name){
    // if(alarmState) console.log(name + " " + alarmState)
    switch(alarmState){
        case AlarmStatus.Active:
            if(blip){
                return '#FF0000'
            }else{
                return '#000000'
            }
        case AlarmStatus.Acknowledged:
            return '#00FF00'
        case AlarmStatus.Inactive:
            return '#000000'
        default:
            return '#000000'
    }
}

function AlarmBlock({name, active, setState}) {
    const[colorBlip, setColorBlip] = useState(true);

    useEffect(() => {
        const colorChangetimer = setInterval(() => {
            setColorBlip(prev => !prev);
        }, 500);
        return () => {
            clearInterval(colorChangetimer);
        }
    }, [])

    return (
        <div className='whiteBox-Alarm-Off' style={{background: getClassName(active, colorBlip, name)}} onClick={() => {
            if(active == AlarmStatus.Active){
                setState(AlarmStatus.Acknowledged)
            }
            }}>
            {name}
        </div>
    );
}

export default AlarmBlock;