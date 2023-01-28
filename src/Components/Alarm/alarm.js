import React, { useState, useEffect } from 'react'
import AlarmBlock from './alarm-block';
import { AlarmStatus } from '../DataComponents/AlarmControls/AlarmManager';

function Alarm({alarmManager}) {
    const[ME_FO_PressureLow, setME_FO_PressureLow] = useState(AlarmStatus.Inactive);

    useEffect(() => {
        alarmManager.on('Alarm', (value)=>{
            if(value.status == AlarmStatus.Active){
                switch(value.command){
                    case 'highTempLubOil':
                        // this.highTempLubOil = target;
                        break;
                    case 'lowTempLubOil':
                        // this.lowTempLubOil = target;
                        break;
                    case 'lowPressureBoost':
                        setME_FO_PressureLow(AlarmStatus.Active);
                        break;
                    case 'highTempWC':
                        // this.highTempWC = target;
                        break;
                    case 'lowTempWC':
                        // this.lowTempWC = target;
                        break;
                    case 'fullLeakageInspPipe':
                        // this.fullLeakageInspPipe = target;
                        break;
                    case 'battreyFault':
                        // this.battreyFault = target;
                        break;
                    default:
                        break;
                }
            }else if(value.status == AlarmStatus.Inactive){
                switch(value.command){
                    case 'highTempLubOil':
                        // this.highTempLubOil = target;
                        break;
                    case 'lowTempLubOil':
                        // this.lowTempLubOil = target;
                        break;
                    case 'lowPressureBoost':
                        // console.log(ME_FO_PressureLow);
                        setME_FO_PressureLow(AlarmStatus.Inactive);
                        break;
                    case 'highTempWC':
                        // this.highTempWC = target;
                        break;
                    case 'lowTempWC':
                        // this.lowTempWC = target;
                        break;
                    case 'fullLeakageInspPipe':
                        // this.fullLeakageInspPipe = target;
                        break;
                    case 'battreyFault':
                        // this.battreyFault = target;
                        break;
                    default:
                        break;
                }
            }
        });
    }, []);

    useEffect(() =>{
        if(ME_FO_PressureLow == AlarmStatus.Acknowledged){
            alarmManager.acknowledgeAlarm('lowPressureBoost', 'Main Engine');
        }
        // console.log('TEST ALARM ACKNOWLEDGHE')
        // console.log(alarmManager.redAlarm);
        // console.log(alarmManager.greyAlarm);
    }, [ME_FO_PressureLow])

    return (
        <div className='whiteBox-AlarmContainer'>
            <AlarmBlock name={"Overspeed Shutdown"} active={false}/>
            <AlarmBlock name={"ME Lub Oil Temperature High"} active={false}/>
            <AlarmBlock name={"ME Fuel Oil Pressure Low"} active={ME_FO_PressureLow} setState={setME_FO_PressureLow}/>

            <AlarmBlock name={"Shutdown Canceled"} active={false}/>
            <AlarmBlock name={"AE Lub Oil Temperature High"} active={false}/>
            <AlarmBlock name={"AE Fuel Oil Pressure Low"} active={false}/>

            <AlarmBlock name={"Start Failure"} active={false}/>
            <AlarmBlock name={"ME Lub Oil Temperature Low"} active={false}/>
            <AlarmBlock name={"Exhaust Gas After T/C Temp High"} active={false}/>

            <AlarmBlock name={"Stop Failure"} active={false}/>
            <AlarmBlock name={"AE Lub Oil Temperature Low"} active={false}/>
            <AlarmBlock name={"Exhaust Gas Before T/C Temp High"} active={false}/>

            <AlarmBlock name={"Remote Control Fail"} active={false}/>
            <AlarmBlock name={"Lub Oil Gear Temp High"} active={false}/>
            <AlarmBlock name={"Air Compress Pressure Low"} active={false}/>

            <AlarmBlock name={"AE Pump Fail"} active={false}/>
            <AlarmBlock name={"Voltage / Fuse Fail"} active={false}/>
            <AlarmBlock name={"Lub Oil Sump Tank High Level Alarm"} active={false}/>
            
            <AlarmBlock name={"ME Pump Fail"} active={false}/>
            <AlarmBlock name={"Speed Governor Fail"} active={false}/>
            <AlarmBlock name={"ME Cooling Water HT Shutdown"} active={false}/>

            <AlarmBlock name={"ME Lub Oil Pressure Low"} active={false}/>
            <AlarmBlock name={"ME Cooling Water Temperature High"} active={false}/>
            <AlarmBlock name={""} active={false}/>

            <AlarmBlock name={"Lub Oil Gear Pressure Low"} active={false}/>
            <AlarmBlock name={"ME Cooling Water Pressure Low"} active={false}/>
            <AlarmBlock name={""} active={false}/>

            <AlarmBlock name={"Lub Oil Filter Diff. Pressure High"} active={false}/>
            <AlarmBlock name={"AE Cooling Water Temperature High"} active={false}/>
            <AlarmBlock name={""} active={false}/>

            <AlarmBlock name={"Lub Oil Sump Tank Level Low"} active={false}/>
            <AlarmBlock name={"AE Cooling Water Pressure Low"} active={false}/>
            <AlarmBlock name={""} active={false}/>
        </div>
    );
}

export default Alarm;