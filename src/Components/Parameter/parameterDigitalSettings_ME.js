import React, { useEffect, useState } from 'react'
import ParameterSettingsNumber from './parameterSettingsNumber';
import ParameterSettingsToogle from './parameterSettingsToogle';
import ParameterSettingsStatus from './parameterSettingsStatus';

function ParameterDigitalSettings_ME({side, engineValue, alarmManager}) {
    const [startCommandActive, setStartCommandActive] = useState(engineValue.startCommandActive);
    const [pumpRawWaterFlowEngine, setpumpRawWaterFlowEngine] = useState(alarmManager.pumpRawWaterFlowEngine);
    const [pumpFuelOilFlow, setpumpFuelOilFlow] = useState(alarmManager.pumpFuelOilFlow);
    const [pumpLubOilFlow, setpumpLubOilFlow] = useState(alarmManager.pumpLubOilFlow);
    const [pumpBilgeEngineRoom, setpumpBilgeEngineRoom] = useState(alarmManager.pumpBilgeEngineRoom);
    const [loadPanelSwitch, setloadPanelSwitch] = useState(alarmManager.loadPanelSwitch);
    const [lightingPanel, setlightingPanel] = useState(alarmManager.lightingPanel);
    const [battreyFault, setbattreyFault] = useState(alarmManager.battreyFault);

    const [engineOverspeed, setengineOverspeed] = useState(alarmManager.engineOverspeed);
    const [lubricatingOilPressureLow, setlubricatingOilPressureLow] = useState(alarmManager.lubricatingOilPressureLow);
    const [lubricatingOilTemperatureHigh, setlubricatingOilTemperatureHigh] = useState(alarmManager.lubricatingOilTemperatureHigh);
    const [fuelOilPressureFlow, setfuelOilPressureFlow] = useState(alarmManager.fuelOilPressureFlow);
    const [fuelOilLeakageFromHighPressurePipes, setfuelOilLeakageFromHighPressurePipes] = useState(alarmManager.fuelOilLeakageFromHighPressurePipes);
    const [coolingWaterPressureLow, setcoolingWaterPressureLow] = useState(alarmManager.coolingWaterPressureLow);
    const [coolingWaterTemperatureHigh, setcoolingWaterTemperatureHigh] = useState(alarmManager.coolingWaterTemperatureHigh);

    useEffect(() => {
        engineValue.socket.on('arduino-data', (data) => {
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
                setfuelOilLeakageFromHighPressurePipes(splitArray[5] == 1);
                setcoolingWaterPressureLow(splitArray[6] == 1);
                setcoolingWaterTemperatureHigh(splitArray[7] == 1);
                break;
            }
          });
          return () => {
                engineValue.socket.off('arduino-data');
          }
    }, []);

    return (
        <div className='displayContainer-shard'>
            <div style={{'textAlign': 'center', 'fontWeight': 'bold', color: '#FFFFFF', marginBottom: 30 }}>{side}</div>
            <div className='whiteBox-parameterSetting'>
                <ParameterSettingsToogle name={"Alarm Active"} activation={startCommandActive}  onClick={() => {
                    engineValue.startCommandActive = !engineValue.startCommandActive
                    setStartCommandActive(engineValue.startCommandActive);
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

export default ParameterDigitalSettings_ME;