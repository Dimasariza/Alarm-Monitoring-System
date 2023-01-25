import React, { useCallback, useEffect, useState } from 'react'
import ParameterSettingsNumber from './parameterSettingsNumber';
import ParameterSettingsToogle from './parameterSettingsToogle';

function ParameterSettings({side, engineValue, virtualKeyboardManager}) {
    const [startCommandActive, setStartCommandActive] = useState(engineValue.startCommandActive);
    const [valveOpenActive, setValveOpenActive] = useState(engineValue.valveOpenActive);
    const [stopRPM, setStopRPM] = useState(engineValue.stopRPM);
    const [restartRPM, setRestartRPM] = useState(engineValue.restartRPM);
    const [startStopTimeDelay, setStartStopTimeDelay] = useState(engineValue.startStopTimeDelay);
    const [lowPressureFO, setLowPressureFO] = useState(engineValue.lowPressureFO);
    const [lowPressureCW, setLowPressureCW] = useState(engineValue.lowPressureCW);
    const [highTempCW, setHighTempCW] = useState(engineValue.highTempCW);
    const [lowPressExhGas, setLowPressExhGas] = useState(engineValue.lowPressExhGas);
    const [highPressExhGas, setHighPressExhGas] = useState(engineValue.highPressExhGas);
    
    useEffect(() =>{
        engineValue.lowPressExhGas = lowPressExhGas
    }, [lowPressExhGas])

    useEffect(() =>{
        engineValue.highTempCW = highTempCW
    }, [highTempCW])

    useEffect(() =>{
        engineValue.lowPressureCW = lowPressureCW
    }, [lowPressureCW])

    useEffect(() =>{
        engineValue.stopRPM = stopRPM
    }, [stopRPM])

    useEffect(() =>{
        engineValue.restartRPM = restartRPM
    }, [restartRPM])

    useEffect(() =>{
        engineValue.startStopTimeDelay = startStopTimeDelay
    }, [startStopTimeDelay])

    useEffect(() =>{
        engineValue.lowPressureFO = lowPressureFO
    }, [lowPressureFO])

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
                <ParameterSettingsNumber name={"Low Pressure FO Set Point"} value={lowPressureFO} onClick={() => {
                    virtualKeyboardManager.showKeyboard(setLowPressureFO, "Low Pressure FO Set Point:", false)
                }}/>
                <ParameterSettingsNumber name={"Low Pressure CW Set Point"} value={lowPressureCW} onClick={() => {
                    virtualKeyboardManager.showKeyboard(setLowPressureCW, "Low Pressure CW Set Point:", false)
                }}/>
                <ParameterSettingsNumber name={"High Temp CW Set Point"} value={highTempCW} onClick={() => {
                    virtualKeyboardManager.showKeyboard(setHighTempCW, "High Temp CW Set Point:", false)
                }}/>
                <ParameterSettingsNumber name={"Low Press Exh Gas Set Point"} value={lowPressExhGas} onClick={() => {
                    virtualKeyboardManager.showKeyboard(setLowPressExhGas, "Low Press Exh Gas Set Point:", false)
                }}/>
                <ParameterSettingsNumber name={"High Press Exh Gas Set Point"} value={highPressExhGas} onClick={() => {
                    virtualKeyboardManager.showKeyboard(setHighPressExhGas, "High Press Exh Gas Set Point:", false)
                }}/>
            </div>
        </div>
    );
}

export default ParameterSettings;