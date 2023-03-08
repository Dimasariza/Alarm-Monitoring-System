import React, { useEffect, useState } from 'react'
import ParameterSettingsNumber from './parameterSettingsNumber';
import ParameterSettingsToogle from './parameterSettingsToogle';

function checkAux(engineValue){
    if(engineValue.source.includes("Aux")){
        return 'block'
    }else{
        return 'none'
    }
}

function ParameterSettings2({side, engineValue, virtualKeyboardManager}) {
    const [highPressureFO, setHighPressureFO] = useState(engineValue.highPressureFO);
    const [lowPressureFO, setLowPressureFO] = useState(engineValue.lowPressureFO);
    const [workloadMax, setWorkloadMax] = useState(engineValue.workloadMax);
    const [workloadMin, setWorkloadMin] = useState(engineValue.workloadMin);
    const [highTempExhGas, setHighTempExhGas] = useState(engineValue.highTempExhGas);
    const [worloadPowerMax, setWorkloadPowerMax] = useState(engineValue.worloadPowerMax);

    useEffect(() =>{
        engineValue.worloadPowerMax = worloadPowerMax
    }, [worloadPowerMax, engineValue])

    useEffect(() =>{
        engineValue.highTempExhGas = highTempExhGas
    }, [highTempExhGas, engineValue])

    useEffect(() =>{
        engineValue.lowPressureFO = lowPressureFO
    }, [lowPressureFO, engineValue])

    useEffect(() =>{
        engineValue.highPressureFO = highPressureFO
    }, [highPressureFO, engineValue])

    useEffect(() =>{
        engineValue.workloadMax = workloadMax
    }, [workloadMax, engineValue])

    useEffect(() =>{
        engineValue.workloadMin = workloadMin
    }, [workloadMin, engineValue])


    return (
        <div className='displayContainer-shard'>
            <div style={{'textAlign': 'center', 'fontWeight': 'bold', color: '#FFFFFF', marginBottom: 30 }}>{side}</div>
            <div className='whiteBox-parameterSetting'>
                <ParameterSettingsNumber name={"High Temp Exh Gas Set Point"} value={highTempExhGas} onClick={() => {
                    virtualKeyboardManager.showKeyboard(setHighTempExhGas, "High Temp Exh Gas Set Point:", false)
                }}/>
                <ParameterSettingsNumber name={"High Pressure FO Set Point"} value={highPressureFO.toFixed(2)} onClick={() => {
                    virtualKeyboardManager.showKeyboard(setHighPressureFO, "High Pressure FO Set Point:", false)
                }}/>
                <ParameterSettingsNumber name={"Low Pressure FO Set Point"} value={lowPressureFO.toFixed(2)} onClick={() => {
                    virtualKeyboardManager.showKeyboard(setLowPressureFO, "Low Pressure FO Set Point:", false)
                }}/>
                <div style={{display: checkAux(engineValue)}}>
                    <ParameterSettingsNumber name={"High Working Load Set Point"} value={workloadMax.toFixed(0) + ' %'} onClick={() => {
                        virtualKeyboardManager.showKeyboard(setWorkloadMax, "High Working Load Set Point:", false)
                    }}/>
                    <ParameterSettingsNumber name={"Low Working Load Set Point"} value={workloadMin.toFixed(0) + ' %'} onClick={() => {
                        virtualKeyboardManager.showKeyboard(setWorkloadMin, "Low Working Load Set Point:", false)
                    }}/>
                    <ParameterSettingsNumber name={"Maximum Workload Power"} value={worloadPowerMax.toFixed(1) + ' KW'} onClick={() => {
                        virtualKeyboardManager.showKeyboard(setWorkloadPowerMax, "Set Maximum Workload Power:", false)
                    }}/>
                </div>
            </div>
        </div>
    );
}

export default ParameterSettings2;