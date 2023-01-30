import React, { useEffect, useState } from 'react'
import ParameterSettingsNumber from './parameterSettingsNumber';
import ParameterSettingsToogle from './parameterSettingsToogle';

function ParameterSettings({side, engineValue, virtualKeyboardManager}) {
    const [startCommandActive, setStartCommandActive] = useState(engineValue.startCommandActive);
    const [valveOpenActive, setValveOpenActive] = useState(engineValue.valveOpenActive);
    const [stopRPM, setStopRPM] = useState(engineValue.stopRPM);
    const [restartRPM, setRestartRPM] = useState(engineValue.restartRPM);
    const [startStopTimeDelay, setStartStopTimeDelay] = useState(engineValue.startStopTimeDelay);
    const [lowPressureFO, setLowPressureFO] = useState(engineValue.lowPressureFO);
    const [lowTempCW, setLowTempCW] = useState(engineValue.lowTempCW);
    const [highTempCW, setHighTempCW] = useState(engineValue.highTempCW);
    const [lowPressLubOil, setLowTempExhGas] = useState(engineValue.lowPressLubOil);
    const [highPressLubOil, setHighTempExhGas] = useState(engineValue.highPressLubOil);

    useEffect(() =>{
        engineValue.highPressLubOil = highPressLubOil
    }, [highPressLubOil, engineValue])

    useEffect(() =>{
        engineValue.lowPressLubOil = lowPressLubOil
    }, [lowPressLubOil, engineValue])

    useEffect(() =>{
        engineValue.highTempCW = highTempCW
    }, [highTempCW, engineValue])

    useEffect(() =>{
        engineValue.lowTempCW = lowTempCW
    }, [lowTempCW, engineValue])

    useEffect(() =>{
        engineValue.stopRPM = stopRPM
    }, [stopRPM, engineValue])

    useEffect(() =>{
        engineValue.restartRPM = restartRPM
    }, [restartRPM, engineValue])

    useEffect(() =>{
        engineValue.startStopTimeDelay = startStopTimeDelay
    }, [startStopTimeDelay, engineValue])

    useEffect(() =>{
        engineValue.lowPressureFO = lowPressureFO
    }, [lowPressureFO, engineValue])

    return (
        <div className='displayContainer-shard'>
            <div style={{'textAlign': 'center', 'fontWeight': 'bold', color: '#FFFFFF', marginBottom: 30 }}>{side}</div>
            <div className='whiteBox-parameterSetting'>
                <ParameterSettingsToogle name={"Start Command"} activation={startCommandActive} onClick={() => {
                    engineValue.startCommandActive = !engineValue.startCommandActive
                    setStartCommandActive(engineValue.startCommandActive);
                }}/>
                <ParameterSettingsToogle name={"Valve Open Command"} activation={valveOpenActive} onClick={() => {
                    engineValue.valveOpenActive = !engineValue.valveOpenActive
                    setValveOpenActive(engineValue.valveOpenActive);
                }}/>
                <ParameterSettingsNumber name={"Stop RPM Set Point"}  value={stopRPM} onClick={() => {
                    virtualKeyboardManager.showKeyboard(setStopRPM, "Stop RPM Set Point:", false)
                }} />
                <ParameterSettingsNumber name={"Restart RPM Set Point"} value={restartRPM} onClick={() => {
                    virtualKeyboardManager.showKeyboard(setRestartRPM, "Restart RPM Set Point:", false)
                }}/>
                <ParameterSettingsNumber name={"Start Stop Time Delay"} value={startStopTimeDelay} onClick={() => {
                    virtualKeyboardManager.showKeyboard(setStartStopTimeDelay, "Start Stop Time Delay:", false)
                }}/>
                <ParameterSettingsNumber name={"High Pressure Lub. Oil Set Point"} value={highPressLubOil} onClick={() => {
                    virtualKeyboardManager.showKeyboard(setHighTempExhGas, "High Pressure Lub. Oil Set Point:", false)
                }}/>
                <ParameterSettingsNumber name={"Low Pressure Lub. Oil Set Point"} value={lowPressLubOil} onClick={() => {
                    virtualKeyboardManager.showKeyboard(setLowTempExhGas, "Low Pressure Lub. Oil Set Point:", false)
                }}/>
                <ParameterSettingsNumber name={"Low Pressure FO Set Point"} value={lowPressureFO.toFixed(2)} onClick={() => {
                    virtualKeyboardManager.showKeyboard(setLowPressureFO, "Low Pressure FO Set Point:", false)
                }}/>
                <ParameterSettingsNumber name={"High Temp CW Set Point"} value={highTempCW} onClick={() => {
                    virtualKeyboardManager.showKeyboard(setHighTempCW, "High Temp CW Set Point:", false)
                }}/>
                <ParameterSettingsNumber name={"Low Temp CW Set Point"} value={lowTempCW} onClick={() => {
                    virtualKeyboardManager.showKeyboard(setLowTempCW, "Low Temp CW Set Point:", false)
                }}/>
            </div>
        </div>
    );
}

export default ParameterSettings;