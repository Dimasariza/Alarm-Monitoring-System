import React, { useEffect, useState } from 'react'
import ParameterSettingsNumber from './parameterSettingsNumber';
import ParameterSettingsToogle from './parameterSettingsToogle';
import ParameterSettingsToogleAUX from './parameterSettingsToogleAux';

function checkME(engineValue){
    if(engineValue.source.includes("Main")){
        return 'block'
    }else{
        return 'none'
    }
}

function checkAux(engineValue){
    if(engineValue.source.includes("Aux")){
        return 'block'
    }else{
        return 'none'
    }
}

function ParameterSettings({side, engineValue, virtualKeyboardManager}) {
    const [startCommandActive, setStartCommandActive] = useState(engineValue.startCommandActive);
    const [valveOpenActive, setValveOpenActive] = useState(engineValue.valveOpenActive);
    const [stopRPM, setStopRPM] = useState(engineValue.stopRPM);
    const [restartRPM, setRestartRPM] = useState(engineValue.restartRPM);
    const [minRPM, setMinRPM] = useState(engineValue.minRPM);
    const [startStopTimeDelay, setStartStopTimeDelay] = useState(engineValue.startStopTimeDelay);
    const [lowTempCW, setLowTempCW] = useState(engineValue.lowTempCW);
    const [highTempCW, setHighTempCW] = useState(engineValue.highTempCW);
    const [lowPressLubOil, setLowPressLubOil] = useState(engineValue.lowPressLubOil);
    const [highPressLubOil, setHighPressLubOil] = useState(engineValue.highPressLubOil);

    const [frequency, setFrequency] = useState(50);
    const fiftyhzTolerance = 1575;
    const sixtyhzTolerance = 1890;

    useEffect(() =>{
        if(engineValue.source.includes("Main")) return
        setStopRPM(fiftyhzTolerance + 100);
        setRestartRPM(fiftyhzTolerance);
    }, [])

    useEffect(() =>{
        engineValue.minRPM = minRPM
    }, [minRPM, engineValue])

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

    const handleChangeAux = () =>{
        if(engineValue.source.includes("Main")) return 
        if(frequency == 50){
            setFrequency(60);
            setStopRPM(sixtyhzTolerance + 100);
            setRestartRPM(sixtyhzTolerance);
        }else{
            setFrequency(50);
            setStopRPM(fiftyhzTolerance + 100);
            setRestartRPM(fiftyhzTolerance);
        }
    }

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
                
                <div style={{display: checkME(engineValue)}}>
                    <ParameterSettingsNumber name={"Stop RPM Set Point"}  value={stopRPM} onClick={() => {
                        virtualKeyboardManager.showKeyboard(setStopRPM, "Stop RPM Set Point:", false)
                    }} />
                    <ParameterSettingsNumber name={"Restart RPM Set Point"} value={restartRPM} onClick={() => {
                        virtualKeyboardManager.showKeyboard(setRestartRPM, "Restart RPM Set Point:", false)
                    }}/>
                    <ParameterSettingsNumber name={"Minimal RPM Set Point"} value={minRPM} onClick={() => {
                        virtualKeyboardManager.showKeyboard(setMinRPM, "Minimal RPM Set Point:", false)
                    }}/>
                </div>
                <div style={{display: checkAux(engineValue)}}>
                    <ParameterSettingsNumber name={"Frequency"}  value={frequency + ' HZ'} onClick={() =>{
                        handleChangeAux();
                    }} />
                    <ParameterSettingsNumber name={"Restart RPM Set Point"} value={restartRPM} />
                    <ParameterSettingsNumber name={"Minimal RPM Set Point"} value={minRPM} onClick={() => {
                        virtualKeyboardManager.showKeyboard(setMinRPM, "Minimal RPM Set Point:", false)
                    }}/>
                </div>
                <ParameterSettingsNumber name={"Start Stop Time Delay"} value={startStopTimeDelay} onClick={() => {
                    virtualKeyboardManager.showKeyboard(setStartStopTimeDelay, "Start Stop Time Delay:", false)
                }}/>
                <ParameterSettingsNumber name={"High Pressure Lub. Oil Set Point"} value={highPressLubOil} onClick={() => {
                    virtualKeyboardManager.showKeyboard(setHighPressLubOil, "High Pressure Lub. Oil Set Point:", false)
                }}/>
                <ParameterSettingsNumber name={"Low Pressure Lub. Oil Set Point"} value={lowPressLubOil} onClick={() => {
                    virtualKeyboardManager.showKeyboard(setLowPressLubOil, "Low Pressure Lub. Oil Set Point:", false)
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