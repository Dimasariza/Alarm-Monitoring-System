import React, { useEffect, useState } from 'react'
import ParameterSettingsNumber from './parameterSettingsNumber';
import ParameterSettingsToogle from './parameterSettingsToogle';
import ParameterSettingsStatus from './parameterSettingsStatus';
import { CurrentActiveEngine } from '../../App';
import { addEventListener, removeEventListener } from '../DataComponents/SocketManager/socketManager';

function ParameterDigitalSettings({side, engineValue, alarmManager, activeEngine, setActiveEngine}) {
    const [startCommandActive, setStartCommandActive] = useState(activeEngine == CurrentActiveEngine.AuxEngine);
    const [pumpRawWaterFlowEngine, setpumpRawWaterFlowEngine] = useState(alarmManager.pumpRawWaterFlowEngine[1]);
    const [pumpFuelOilFlow, setpumpFuelOilFlow] = useState(alarmManager.pumpFuelOilFlow[1]);
    const [pumpLubOilFlow, setpumpLubOilFlow] = useState(alarmManager.pumpLubOilFlow[1]);
    const [pumpBilgeEngineRoom, setpumpBilgeEngineRoom] = useState(alarmManager.pumpBilgeEngineRoom[1]);
    const [loadPanelSwitch, setloadPanelSwitch] = useState(alarmManager.loadPanelSwitch[1]);
    const [lightingPanel, setlightingPanel] = useState(alarmManager.lightingPanel[1]);
    const [battreyFault, setbattreyFault] = useState(alarmManager.battreyFault[1]);

    const [engineOverspeed, setengineOverspeed] = useState(alarmManager.engineOverspeed[1]);
    const [lubricatingOilPressureLow, setlubricatingOilPressureLow] = useState(alarmManager.lubricatingOilPressureLow[1]);
    const [lubricatingOilTemperatureHigh, setlubricatingOilTemperatureHigh] = useState(alarmManager.lubricatingOilTemperatureHigh[1]);
    const [fuelOilPressureFlow, setfuelOilPressureFlow] = useState(alarmManager.fuelOilPressureFlow[1]);
    const [fuelOilLeakageFromHighPressurePipes, setfuelOilLeakageFromHighPressurePipes] = useState(alarmManager.fuelOilLeakageFromHighPressurePipes[1]);
    const [coolingWaterPressureLow, setcoolingWaterPressureLow] = useState(alarmManager.coolingWaterPressureLow[1]);
    const [coolingWaterTemperatureHigh, setcoolingWaterTemperatureHigh] = useState(alarmManager.coolingWaterTemperatureHigh[1]);

    useEffect(() =>{
        setStartCommandActive(activeEngine == CurrentActiveEngine.AuxEngine);
        const listener = (data) => {
            if(activeEngine != CurrentActiveEngine.AuxEngine) return;
            // console.log('AE', engineValue);
            var splitArray = data.split(',');
            switch(splitArray[0]){
              case "digital":
                setpumpRawWaterFlowEngine(splitArray[1] == 0);
                setpumpFuelOilFlow(splitArray[2] == 0);
                setpumpLubOilFlow(splitArray[3] == 0);
                setpumpBilgeEngineRoom(splitArray[4] == 0);
                setloadPanelSwitch(splitArray[5] == 0);
                setlightingPanel(splitArray[6] == 0);
                setbattreyFault(splitArray[7] == 0);
                break;
              case "safety":
                setengineOverspeed(splitArray[1] == 1);
                setlubricatingOilPressureLow(splitArray[2] == 1);
                setlubricatingOilTemperatureHigh(splitArray[3] == 1);
                setfuelOilPressureFlow(splitArray[4] == 1);
                setcoolingWaterPressureLow(splitArray[5] == 1);
                setcoolingWaterTemperatureHigh(splitArray[6] == 1);
                setfuelOilLeakageFromHighPressurePipes(splitArray[7] == 1);
                break;
            }
        }
        addEventListener('arduino-data-AE-Settings', listener);
        return () => {
            removeEventListener('arduino-data-AE-Settings', listener);
        };
    }, [activeEngine])

    return (
        <div className='displayContainer-shard'>
            <div style={{'textAlign': 'center', 'fontWeight': 'bold', color: '#FFFFFF', marginBottom: 30 }}>{side}</div>
            <div className='whiteBox-parameterSetting'>
                <ParameterSettingsToogle name={"Alarm Active"} activation={startCommandActive}  onClick={() => {
                    setActiveEngine(CurrentActiveEngine.AuxEngine);
                }} />
                <div style={{padding: 5}}></div>
                <ParameterSettingsStatus name1={"Pump Raw Water Flow Engine"} name2={"Engine Overspeed"}  selected1={pumpRawWaterFlowEngine} selected2={engineOverspeed} />
                <ParameterSettingsStatus name1={"Pump Fuel Oil Flow "} name2={"Lubricating Oil Pressure Flow"}  selected1={pumpFuelOilFlow} selected2={lubricatingOilPressureLow} />
                <ParameterSettingsStatus name1={"Pump Lub Oil Flow"} name2={"Lubricating Oil Temperature High"}  selected1={pumpLubOilFlow} selected2={lubricatingOilTemperatureHigh}/>
                <ParameterSettingsStatus name1={"Pump Bilge Engine Room"} name2={"Fuel Oil Pressure Flow"}  selected1={pumpBilgeEngineRoom} selected2={fuelOilPressureFlow}/>
                <ParameterSettingsStatus name1={""} name2={"Cooling Water Pressure Low"}  selected1={loadPanelSwitch} selected2={coolingWaterPressureLow}/>
                <ParameterSettingsStatus name1={""} name2={"Cooling Water Temperature High"}  selected1={lightingPanel} selected2={coolingWaterTemperatureHigh}/>
                <ParameterSettingsStatus name1={""} name2={"Fuel Oil Leakage From High Pressure Pipes"}  selected1={battreyFault} selected2={fuelOilLeakageFromHighPressurePipes} />
            </div>
        </div>
    );
}

export default ParameterDigitalSettings;