import React, { useState, useEffect } from 'react'
import AlarmBlock from './alarm-block';
import { AlarmStatus } from '../DataComponents/AlarmControls/AlarmManager';

function Alarm({alarmManager}) {
    const[ME_OverspeedShutdown, setME_OverspeedShutdown] = useState(AlarmStatus.Inactive);
    const[ME_CoolingWaterHighTemperature, setME_CoolingWaterHighTemperature] = useState(AlarmStatus.Inactive);
    const[ME_StartFailure, setME_StartFailure] = useState(AlarmStatus.Inactive);
    const[ME_StopFailure, setME_StopFailure] = useState(AlarmStatus.Inactive);
    const[ME_LubOilPressureLow, setME_LubOilPressureLow] = useState(AlarmStatus.Inactive);
    const[ME_LubOilTemperatureHigh, setME_LubOilTemperatureHigh] = useState(AlarmStatus.Inactive);
    const[lubOilFilterDiffrentialPressureHigh, setLubOilFilterDiffrentialPressureHigh] = useState(AlarmStatus.Inactive);
    const[lubOilSumpTankLevelLow, setLubOilSumpTankLevelLow] = useState(AlarmStatus.Inactive);
    const[lubOilSumpTankHighLevel, setLubOilSumpTankHighLevel] = useState(AlarmStatus.Inactive);
    const[lubOilGearTempHigh, setLubOilGearTempHigh] = useState(AlarmStatus.Inactive);
    const[lubOilGearPressureLow, setLubOilGearPressureLow ] = useState(AlarmStatus.Inactive);
    const[SpeedGovernorFail, setSpeedGovernorFail] = useState(AlarmStatus.Inactive);
    const[RemoteControlFail, setRemoteControlFail ] = useState(AlarmStatus.Inactive);
    const[VoltageFuseFail, setVoltageFuseFail ] = useState(AlarmStatus.Inactive);
    const[ME_FuelPumpFail, setME_FuelPumpFail ] = useState(AlarmStatus.Inactive);
    // const[ME_CoolingWaterTemperatureHigh, setME_CoolingWaterTemperatureHigh ] = useState(AlarmStatus.Inactive);
    const[ME_CoolingWaterPressureLow, setME_CoolingWaterPressureLow] = useState(AlarmStatus.Inactive);
    const[ME_FuelOilInjectPressureLow, setME_FuelOilInjectPressureLow] = useState(AlarmStatus.Inactive);
    const[AE_CoolingWaterTempHigh, setAE_CoolingWaterTempHigh ] = useState(AlarmStatus.Inactive);
    const[AE_CoolingWaterPressureLow, setAE_CoolingWaterPressureLow ] = useState(AlarmStatus.Inactive);
    const[AE_FuelOilPressureLow, setAE_FuelOilPressureLow ] = useState(AlarmStatus.Inactive);
    const[AE_FuelOilTemperatureHigh, setAE_FuelOilTemperatureHigh ] = useState(AlarmStatus.Inactive);
    const[AE_Overspeed, setAE_Overspeed ] = useState(AlarmStatus.Inactive);
    const[AE_LubOilTemperatureHigh, setAE_LubOilTemperatureHigh ] = useState(AlarmStatus.Inactive);
    const[AE_LubOilPressureLow, setAE_LubOilPressureLow ] = useState(AlarmStatus.Inactive);
    const[AE_FuelOilLeakage, setAE_FuelOilLeakage ] = useState(AlarmStatus.Inactive);

    useEffect(() => {
        alarmManager.on('Alarm', (value)=>{
            // console.log(value.command, value.source, value.status)
            if(value.status == AlarmStatus.Active || value.status == AlarmStatus.Inactive){
                switch(value.command){
                    case 'ME_OverspeedShutdown':
                        return setME_OverspeedShutdown(value.status);
                    case 'ME_CoolingWaterHighTemperature':
                        return setME_CoolingWaterHighTemperature(value.status);
                    case 'ME_StartFailure':
                        return setME_StartFailure(value.status);
                    case 'ME_StopFailure':
                        return setME_StopFailure(value.status);
                    case 'ME_LubOilPressureLow':
                        return setME_LubOilPressureLow(value.status);
                    case 'ME_LubOilTemperatureHigh':
                        return setME_LubOilTemperatureHigh(value.status);
                    case 'LubOilFilterDiffrentialPressureHigh':
                        return setLubOilFilterDiffrentialPressureHigh(value.status);
                    case 'LubOilSumpTankLevelLow':
                        return setLubOilSumpTankLevelLow(value.status);
                    case 'LubOilSumpTankHighLevel':
                        return setLubOilSumpTankHighLevel(value.status);
                    case 'LubOilGearTempHigh':
                        return setLubOilGearTempHigh(value.status);
                    case 'LubOilGearPressureLow':
                        return setLubOilGearPressureLow(value.status);
                    case 'SpeedGovernorFail':
                        return setSpeedGovernorFail(value.status);
                    case 'RemoteControlFail':
                        return setRemoteControlFail(value.status);
                    case 'VoltageFuseFail':
                        return setVoltageFuseFail(value.status);
                    case 'ME_FuelPumpFail':
                        return setME_FuelPumpFail(value.status);
                    // case 'ME_CoolingWaterTemperatureHigh':
                    //     return setME_CoolingWaterTemperatureHigh(value.status);
                    case 'ME_CoolingWaterPressureLow':
                        return setME_CoolingWaterPressureLow(value.status);    
                    case 'ME_FuelOilInjectPressureLow':
                        return setME_FuelOilInjectPressureLow(value.status);    
                    case 'AE_CoolingWaterTempHigh':
                        return setAE_CoolingWaterTempHigh(value.status);
                    case 'AE_CoolingWaterPressureLow':
                        return setAE_CoolingWaterPressureLow(value.status);
                    case 'AE_FuelOilPressureLow':
                        return setAE_FuelOilPressureLow(value.status);
                    case 'AE_FuelOilTemperatureHigh':
                        return setAE_FuelOilTemperatureHigh(value.status);
                    case 'AE_Overspeed':
                        return setAE_Overspeed(value.status);
                    case 'AE_LubOilTemperatureHigh':
                        return setAE_LubOilTemperatureHigh(value.status);
                    case 'AE_LubOilPressureLow':
                        return setAE_LubOilPressureLow(value.status);
                    case 'AE_FuelOilLeakage':
                        return setAE_FuelOilLeakage(value.status);
                    default:
                        break;
                }
            }
        });
    }, []);

    useEffect(() =>{
        if(ME_OverspeedShutdown == AlarmStatus.Acknowledged){
            alarmManager.acknowledgeAlarm('ME_OverspeedShutdown', 'Main Engine');
        }
    }, [ME_OverspeedShutdown])

    useEffect(() =>{
        if(ME_CoolingWaterHighTemperature == AlarmStatus.Acknowledged){
            alarmManager.acknowledgeAlarm('ME_CoolingWaterHighTemperature', 'Main Engine');
        }
    }, [ME_CoolingWaterHighTemperature])

    useEffect(() =>{
        if(ME_StartFailure == AlarmStatus.Acknowledged){
            alarmManager.acknowledgeAlarm('ME_StartFailure', 'Main Engine');
        }
    }, [ME_StartFailure])

    useEffect(() =>{
        if(ME_StopFailure == AlarmStatus.Acknowledged){
            alarmManager.acknowledgeAlarm('ME_StopFailure', 'Main Engine');
        }
    }, [ME_StopFailure])

    useEffect(() =>{
        if(ME_LubOilPressureLow == AlarmStatus.Acknowledged){
            alarmManager.acknowledgeAlarm('ME_LubOilPressureLow', 'Main Engine');
        }
    }, [ME_LubOilPressureLow])

    useEffect(() =>{
        if(ME_LubOilTemperatureHigh == AlarmStatus.Acknowledged){
            alarmManager.acknowledgeAlarm('ME_LubOilTemperatureHigh', 'Main Engine');
        }
    }, [ME_LubOilTemperatureHigh])

    useEffect(() =>{
        if(lubOilFilterDiffrentialPressureHigh == AlarmStatus.Acknowledged){
            alarmManager.acknowledgeAlarm('LubOilFilterDiffrentialPressureHigh', 'Main Engine');
        }
    }, [lubOilFilterDiffrentialPressureHigh])

    useEffect(() =>{
        if(lubOilSumpTankLevelLow == AlarmStatus.Acknowledged){
            alarmManager.acknowledgeAlarm('LubOilSumpTankLevelLow', 'Main Engine');
        }
    }, [lubOilSumpTankLevelLow])

    useEffect(() =>{
        if(lubOilSumpTankHighLevel == AlarmStatus.Acknowledged){
            alarmManager.acknowledgeAlarm('LubOilSumpTankHighLevel', 'Main Engine');
        }
    }, [lubOilSumpTankHighLevel])

    useEffect(() =>{
        if(lubOilGearPressureLow == AlarmStatus.Acknowledged){
            alarmManager.acknowledgeAlarm('lubOilGearPressureLow', 'Main Engine');
        }
    }, [lubOilGearPressureLow])

    useEffect(() =>{
        if(ME_CoolingWaterHighTemperature == AlarmStatus.Acknowledged){
            alarmManager.acknowledgeAlarm('ME_CoolingWaterHighTemperature', 'Main Engine');
        }
    }, [ME_CoolingWaterHighTemperature])

    useEffect(() =>{
        if(SpeedGovernorFail == AlarmStatus.Acknowledged){
            alarmManager.acknowledgeAlarm('SpeedGovernorFail', 'Main Engine');
        }
    }, [SpeedGovernorFail])

    useEffect(() =>{
        if(RemoteControlFail == AlarmStatus.Acknowledged){
            alarmManager.acknowledgeAlarm('RemoteControlFail', 'Main Engine');
        }
    }, [RemoteControlFail])

    useEffect(() =>{
        if(VoltageFuseFail == AlarmStatus.Acknowledged){
            alarmManager.acknowledgeAlarm('VoltageFuseFail', 'Main Engine');
        }
    }, [VoltageFuseFail])

    // useEffect(() =>{
    //     if(ME_CoolingWaterTemperatureHigh == AlarmStatus.Acknowledged){
    //         alarmManager.acknowledgeAlarm('ME_CoolingWaterTemperatureHigh', 'Main Engine');
    //     }
    // }, [ME_CoolingWaterTemperatureHigh])

    useEffect(() =>{
        if(ME_FuelPumpFail == AlarmStatus.Acknowledged){
            alarmManager.acknowledgeAlarm('ME_FuelPumpFail', 'Main Engine');
        }
    }, [ME_FuelPumpFail])

    useEffect(() =>{
        if(ME_CoolingWaterPressureLow == AlarmStatus.Acknowledged){
            alarmManager.acknowledgeAlarm('ME_CoolingWaterPressureLow', 'Main Engine');
        }
    }, [ME_CoolingWaterPressureLow])

    useEffect(() =>{
        if(ME_FuelOilInjectPressureLow == AlarmStatus.Acknowledged){
            alarmManager.acknowledgeAlarm('ME_StopFailure', 'Main Engine');
        }
    }, [ME_FuelOilInjectPressureLow])

    useEffect(() =>{
        if(AE_CoolingWaterTempHigh == AlarmStatus.Acknowledged){
            alarmManager.acknowledgeAlarm('AE_CoolingWaterTempHigh', 'Aux Engine');
        }
    }, [AE_CoolingWaterTempHigh])

    useEffect(() =>{
        if(AE_CoolingWaterPressureLow == AlarmStatus.Acknowledged){
            alarmManager.acknowledgeAlarm('AE_CoolingWaterPressureLow', 'Aux Engine');
        }
    }, [AE_CoolingWaterPressureLow])

    useEffect(() =>{
        if(AE_FuelOilPressureLow == AlarmStatus.Acknowledged){
            alarmManager.acknowledgeAlarm('AE_FuelOilPressureLow', 'Aux Engine');
        }
    }, [AE_FuelOilPressureLow])

    useEffect(() =>{
        if(AE_FuelOilTemperatureHigh == AlarmStatus.Acknowledged){
            alarmManager.acknowledgeAlarm('AE_FuelOilTemperatureHigh', 'Aux Engine');
        }
    }, [AE_FuelOilTemperatureHigh])

    useEffect(() =>{
        if(AE_Overspeed == AlarmStatus.Acknowledged){
            alarmManager.acknowledgeAlarm('AE_Overspeed', 'Aux Engine');
        }
    }, [AE_Overspeed])

    useEffect(() =>{
        if(AE_LubOilTemperatureHigh == AlarmStatus.Acknowledged){
            alarmManager.acknowledgeAlarm('AE_LubOilTemperatureHigh', 'Aux Engine');
        }
    }, [AE_LubOilTemperatureHigh])

    useEffect(() =>{
        if(AE_LubOilPressureLow == AlarmStatus.Acknowledged){
            alarmManager.acknowledgeAlarm('AE_LubOilPressureLow', 'Aux Engine');
        }
    }, [AE_LubOilPressureLow])

    useEffect(() =>{
        if(AE_FuelOilLeakage == AlarmStatus.Acknowledged){
            alarmManager.acknowledgeAlarm('AE_FuelOilLeakage', 'Aux Engine');
        }
    }, [AE_FuelOilLeakage])

    return (
        <div className='whiteBox-AlarmContainer'>
            <AlarmBlock name={"ME Overspeed Shutdown"} active={ME_OverspeedShutdown} setState={setME_OverspeedShutdown}/>
            <AlarmBlock name={"Lub Oil Sump Tank High Level Alarm"} active={lubOilSumpTankHighLevel} setState={setLubOilSumpTankHighLevel}/>
            <AlarmBlock name={"ME Fuel Oil Inject Pressure Low"} active={ME_FuelOilInjectPressureLow} setState={setME_FuelOilInjectPressureLow}/>

            <AlarmBlock name={"ME Lub Oil Low Pressure"} active={ME_LubOilPressureLow} setState={setME_LubOilPressureLow}/>
            <AlarmBlock name={"Lub Oil Gear Temp High"} active={lubOilGearTempHigh} setState={setLubOilGearTempHigh}/>
            <AlarmBlock name={"AE Fuel Oil Pressure Low"} active={AE_FuelOilPressureLow} setState={setAE_FuelOilPressureLow}/>

            <AlarmBlock name={"ME Cooling Water High Temperature"} active={ME_CoolingWaterHighTemperature} setState={setME_CoolingWaterHighTemperature}/>
            <AlarmBlock name={"Lub Oil Gear Pressure Low"} active={lubOilGearPressureLow} setState={setLubOilGearPressureLow}/>
            <AlarmBlock name={"Speed Governor Fail"} active={SpeedGovernorFail} setState={setSpeedGovernorFail}/>

            
            <AlarmBlock name={"Remote Control Fail"} active={RemoteControlFail} setState={setRemoteControlFail}/>
            <AlarmBlock name={"AE Lub Oil Pressure Low"} active={AE_LubOilPressureLow} setState={setAE_LubOilPressureLow}/>
            <AlarmBlock name={"Start Failure"} active={ME_StartFailure} setState={setME_StartFailure}/>

            <AlarmBlock name={"Voltage / Fuse Fail"} active={VoltageFuseFail} setState={setVoltageFuseFail}/>
            <AlarmBlock name={"AE Lub Oil Temperature High"} active={AE_LubOilTemperatureHigh} setState={setAE_LubOilTemperatureHigh}/>
            <AlarmBlock name={"Stop Failure"} active={ME_StopFailure} setState={setME_StopFailure}/>

            <AlarmBlock name={"ME Pump Fail"} active={ME_FuelPumpFail} setState={setME_FuelPumpFail}/>
            <AlarmBlock name={""} active={false} />
            <AlarmBlock name={""} active={false} />

            <AlarmBlock name={"AE Fuel Oil Temperature High"} active={AE_FuelOilTemperatureHigh} setState={setAE_FuelOilTemperatureHigh}/>
            <AlarmBlock name={"ME Lub Oil Temperature High"} active={ME_LubOilTemperatureHigh} setState={setME_LubOilTemperatureHigh}/>
            <AlarmBlock name={"ME Cooling Water Pressure Low"} active={ME_CoolingWaterPressureLow} setState={setME_CoolingWaterPressureLow}/>

            <AlarmBlock name={"AE Overspeed"} active={AE_Overspeed} setState={setAE_Overspeed}/>
            <AlarmBlock name={"Lub Oil Filter Diff. Pressure High"} active={lubOilFilterDiffrentialPressureHigh} setState={setLubOilFilterDiffrentialPressureHigh}/>
            <AlarmBlock name={"AE Cooling Water Temperature High"} active={AE_CoolingWaterTempHigh} setState={setAE_CoolingWaterTempHigh}/>

            <AlarmBlock name={"AE FuelOilLeakage"} active={AE_FuelOilLeakage} setState={setAE_FuelOilLeakage}/>
            <AlarmBlock name={"Lub Oil Sump Tank Level Low"} active={lubOilSumpTankLevelLow} setState={setLubOilSumpTankLevelLow}/>
            <AlarmBlock name={"AE Cooling Water Pressure Low"} active={AE_CoolingWaterPressureLow} setState={setAE_CoolingWaterPressureLow}/>

            <AlarmBlock name={"Shutdown Canceled"} active={false}/>
            <AlarmBlock name={"AE Pump Fail"} active={false}/>
            <AlarmBlock name={"Exhaust Gas After T/C Temp High"} active={false}/>

            <AlarmBlock name={"Air Compress Pressure Low"} active={false}/>
            <AlarmBlock name={"Exhaust Gas Before T/C Temp High"} active={false}/>
            <AlarmBlock name={""} active={false}/>
            
        </div>
    );
}

export default Alarm;