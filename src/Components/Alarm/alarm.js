import React, { useState, useEffect } from 'react'
import AlarmBlock from './alarm-block';
import { AlarmStatus } from '../DataComponents/AlarmControls/AlarmManager';

function Alarm({alarmManager}) {
    const[ME_FO_PressureLow, setME_FO_PressureLow] = useState(AlarmStatus.Inactive);
    const[AE_FO_PressureLow, setAE_FO_PressureLow] = useState(AlarmStatus.Inactive);

    const[ME_LubOil_PressureHigh, setME_LubOil_PressureHigh] = useState(AlarmStatus.Inactive);
    const[ME_LubOil_PressureLow, setME_LubOil_PressureLow] = useState(AlarmStatus.Inactive);

    const[AE_LubOil_PressureHigh, setAE_LubOil_PressureHigh] = useState(AlarmStatus.Inactive);
    const[AE_LubOil_PressureLow, setAE_LubOil_PressureLow] = useState(AlarmStatus.Inactive);

    const[ME_FW_TempHigh, setME_FW_TempHigh] = useState(AlarmStatus.Inactive);
    const[ME_FW_TempLow, setME_FW_TempLow] = useState(AlarmStatus.Inactive);

    const[AE_FW_TempHigh, setAE_FW_TempHigh] = useState(AlarmStatus.Inactive);
    const[AE_FW_TempLow, setAE_FW_TempLow] = useState(AlarmStatus.Inactive);

    useEffect(() => {
        alarmManager.on('Alarm', (value)=>{
            // console.log(value.command, value.source, value.status)
            if(value.status == AlarmStatus.Active || value.status == AlarmStatus.Inactive){
                switch(value.command){
                    case 'highPressureLubOil':
                        // console.log(value.command, value.source, value.status)
                        if(value.source =='Main Engine'){
                            setME_LubOil_PressureHigh(value.status);
                        }else{
                            setAE_LubOil_PressureHigh(value.status)
                        }
                        // console.log(ME_LubOil_PressureHigh, AE_LubOil_PressureHigh)
                        break;
                    case 'lowPressureLubOil':
                        // console.log(value.command, value.source, value.status)
                        if(value.source =='Main Engine'){
                            setME_LubOil_PressureLow(value.status)
                        }else{
                            setAE_LubOil_PressureLow(value.status)
                        }
                        // console.log(ME_LubOil_PressureLow, AE_FO_PressureLow)
                        break;
                    case 'lowPressureBoost':
                        if(value.source =='Main Engine'){
                            setME_FO_PressureLow(value.status);
                        }else{
                            setAE_FO_PressureLow(value.status)
                        }
                        break;
                    case 'highTempWC':
                        if(value.source =='Main Engine'){
                            setME_FW_TempHigh(value.status)
                        }else{
                            setAE_FW_TempHigh(value.status)
                        }
                        break;
                    case 'lowTempWC':
                        if(value.source =='Main Engine'){
                            setME_FW_TempLow(value.status)
                        }else{
                            setAE_FW_TempLow(value.status)
                        }
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
        if(ME_LubOil_PressureHigh == AlarmStatus.Acknowledged){
            alarmManager.acknowledgeAlarm('highPressureLubOil', 'Main Engine');
        }
    }, [ME_LubOil_PressureHigh])

    useEffect(() =>{
        if(AE_LubOil_PressureHigh == AlarmStatus.Acknowledged){
            alarmManager.acknowledgeAlarm('highPressureLubOil', 'Aux Engine');
        }
    }, [AE_LubOil_PressureHigh])

    useEffect(() =>{
        if(ME_LubOil_PressureLow == AlarmStatus.Acknowledged){
            alarmManager.acknowledgeAlarm('lowPressureLubOil', 'Main Engine');
        }
    }, [ME_LubOil_PressureLow])

    useEffect(() =>{
        if(AE_LubOil_PressureLow == AlarmStatus.Acknowledged){
            alarmManager.acknowledgeAlarm('lowPressureLubOil', 'Aux Engine');
        }
    }, [AE_LubOil_PressureLow])

    useEffect(() =>{
        if(ME_FO_PressureLow == AlarmStatus.Acknowledged){
            alarmManager.acknowledgeAlarm('lowPressureBoost', 'Main Engine');
        }
    }, [ME_FO_PressureLow])

    useEffect(() =>{
        if(AE_FO_PressureLow == AlarmStatus.Acknowledged){
            alarmManager.acknowledgeAlarm('lowPressureBoost', 'Aux Engine');
        }
    }, [AE_FO_PressureLow])

    useEffect(() =>{
        if(ME_FW_TempHigh == AlarmStatus.Acknowledged){
            alarmManager.acknowledgeAlarm('highTempWC', 'Main Engine');
        }
    }, [ME_FW_TempHigh])

    useEffect(() =>{
        if(AE_FW_TempHigh == AlarmStatus.Acknowledged){
            alarmManager.acknowledgeAlarm('highTempWC', 'Aux Engine');
        }
    }, [AE_FW_TempHigh])

    useEffect(() =>{
        if(ME_FW_TempLow == AlarmStatus.Acknowledged){
            alarmManager.acknowledgeAlarm('lowTempWC', 'Main Engine');
        }
    }, [ME_FW_TempLow])

    useEffect(() =>{
        if(AE_FW_TempLow == AlarmStatus.Acknowledged){
            alarmManager.acknowledgeAlarm('lowTempWC', 'Aux Engine');
        }
    }, [AE_FW_TempLow])

    return (
        <div className='whiteBox-AlarmContainer'>
            <AlarmBlock name={"Overspeed Shutdown"} active={false}/>
            <AlarmBlock name={"ME Lub Oil Pressure High"} active={ME_LubOil_PressureHigh} setState={setME_LubOil_PressureHigh}/>
            <AlarmBlock name={"ME Fuel Oil Pressure Low"} active={ME_FO_PressureLow} setState={setME_FO_PressureLow}/>

            <AlarmBlock name={"Shutdown Canceled"} active={false}/>
            <AlarmBlock name={"AE Lub Oil Pressure High"} active={AE_LubOil_PressureHigh} setState={setAE_LubOil_PressureHigh}/>
            <AlarmBlock name={"AE Fuel Oil Pressure Low"} active={AE_FO_PressureLow} setState={setAE_FO_PressureLow}/>

            <AlarmBlock name={"Start Failure"} active={false}/>
            <AlarmBlock name={"ME Lub Oil Pressure Low"} active={ME_LubOil_PressureLow} setState={setME_LubOil_PressureLow}/>
            <AlarmBlock name={"Exhaust Gas After T/C Temp High"} active={false}/>

            <AlarmBlock name={"Stop Failure"} active={false}/>
            <AlarmBlock name={"AE Lub Oil Pressure Low"} active={AE_LubOil_PressureLow} setState={setAE_LubOil_PressureLow}/>
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
            <AlarmBlock name={"ME Cooling Water Temperature High"} active={ME_FW_TempHigh} setState={setME_FW_TempHigh}/>
            <AlarmBlock name={""} active={false}/>

            <AlarmBlock name={"Lub Oil Gear Pressure Low"} active={false}/>
            <AlarmBlock name={"AE Cooling Water Temperature High"} active={AE_FW_TempHigh} setState={setAE_FW_TempHigh}/>
            <AlarmBlock name={""} active={false}/>

            <AlarmBlock name={"Lub Oil Filter Diff. Pressure High"} active={false}/>
            <AlarmBlock name={"ME Cooling Water Temperature Low"} active={ME_FW_TempLow}  setState={setME_FW_TempLow}/>
            <AlarmBlock name={""} active={false}/>

            <AlarmBlock name={"Lub Oil Sump Tank Level Low"} active={false}/>
            <AlarmBlock name={"AE Cooling Water Temperature Low"} active={AE_FW_TempLow} setState={setAE_FW_TempLow}/>
            <AlarmBlock name={""} active={false}/>
        </div>
    );
}

export default Alarm;