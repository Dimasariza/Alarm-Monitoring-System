import React, { useEffect, useState } from 'react'
import ParameterSettingsNumber from './parameterSettingsNumber';
import ParameterSettingsToogle from './parameterSettingsToogle';

function ParameterSettings2({side, engineValue, virtualKeyboardManager}) {
    const [lowTempExhGas, setLowTempExhGas] = useState(engineValue.lowTempExhGas);
    const [highTempExhGas, setHighTempExhGas] = useState(engineValue.highTempExhGas);

    useEffect(() =>{
        engineValue.highTempExhGas = highTempExhGas
    }, [highTempExhGas, engineValue])

    useEffect(() =>{
        engineValue.lowTempExhGas = lowTempExhGas
    }, [lowTempExhGas, engineValue])

    return (
        <div className='displayContainer-shard'>
            <div style={{'textAlign': 'center', 'fontWeight': 'bold', color: '#FFFFFF', marginBottom: 30 }}>{side}</div>
            <div className='whiteBox-parameterSetting'>
                <ParameterSettingsNumber name={"Low Temp Exh Gas Set Point"} value={lowTempExhGas} onClick={() => {
                    virtualKeyboardManager.showKeyboard(setLowTempExhGas, "Low Temp Exh Gas Set Point:", false)
                }}/>
                <ParameterSettingsNumber name={"High Temp Exh Gas Set Point"} value={highTempExhGas} onClick={() => {
                    virtualKeyboardManager.showKeyboard(setHighTempExhGas, "High Temp Exh Gas Set Point:", false)
                }}/>
            </div>
        </div>
    );
}

export default ParameterSettings2;