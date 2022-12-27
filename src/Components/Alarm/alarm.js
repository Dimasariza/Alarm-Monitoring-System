import React, { useCallback, useEffect } from 'react'
import AlarmBlock from './alarm-block';

function Alarm({}) {
    return (
        <div className='whiteBox-AlarmContainer'>
            <AlarmBlock name={"Overspeed Shutdown"} active={false}/>
            <AlarmBlock name={"Lub Oil Sump Tank High Level Alarm"} active={false}/>
            <AlarmBlock name={"ME Fuel Oil Inject Pressure Low"} active={false}/>

            <AlarmBlock name={"ME Lub Oil Low Pressure"} active={true}/>
            <AlarmBlock name={"Lub Oil Gear Temp High"} active={false}/>
            <AlarmBlock name={"AE Fuel Oil Pressure Low"} active={false}/>

            <AlarmBlock name={"ME Cooling Water HT Shutdown"} active={false}/>
            <AlarmBlock name={"Lub Oil Gear Pressure Low"} active={true}/>
            <AlarmBlock name={"Exhaust Gas After T/C Temp High"} active={false}/>

            <AlarmBlock name={"Air Compress Pressure Low"} active={false}/>
            <AlarmBlock name={"Speed Governor Fail"} active={false}/>
            <AlarmBlock name={"Exhaust Gas Before T/C Temp High"} active={false}/>

            <AlarmBlock name={"Shutdown Canceled"} active={false}/>
            <AlarmBlock name={"Remote Control Fail"} active={false}/>
            <AlarmBlock name={"AE Lub Oil Pressure Low"} active={false}/>

            <AlarmBlock name={"Start Failure"} active={false}/>
            <AlarmBlock name={"Voltage / Fuse Fail"} active={false}/>
            <AlarmBlock name={"AE Lub Oil Temperature High"} active={false}/>

            <AlarmBlock name={"Stop Failure"} active={false}/>
            <AlarmBlock name={"ME Pump Fail"} active={false}/>
            <AlarmBlock name={"AE Pump Fail"} active={false}/>

            <AlarmBlock name={"ME Lub Oil Pressure Low"} active={false}/>
            <AlarmBlock name={"ME Cooling Water Temperature High"} active={false}/>
            <AlarmBlock name={""} active={false}/>

            <AlarmBlock name={"ME Lub Oil Temperature High"} active={false}/>
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