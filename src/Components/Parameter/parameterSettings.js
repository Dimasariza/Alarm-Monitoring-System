import React, { useCallback, useEffect } from 'react'
import ParameterSettingsNumber from './parameterSettingsNumber';
import ParameterSettingsToogle from './parameterSettingsToogle';

function ParameterSettings({side}) {
    return (
        <div className='displayContainer-shard'>
            <div className='tealText'>AUX. BLOWER SETTINGS - {side}</div>
            <div className='whiteBox-parameterSetting'>
                <ParameterSettingsToogle name={"AUX. BLOWER START COMMAND"}/>
                <ParameterSettingsToogle name={"AUX. BLOWER VALVE OPEN COMMAND"}/>
            </div>
            <div className='whiteBox-parameterSetting'>
                <ParameterSettingsNumber name={"AUX. BLOWER STOP RPM SET POINT"}    value={"+550.000"}/>
                <ParameterSettingsNumber name={"AUX. BLOWER RESTART RPM SET POINT"} value={"+520.000"}/>
                <ParameterSettingsNumber name={"AUX. BLOWER START STOP TIME DELAY"} value={"+5.000"}/>
            </div>
        </div>
    );
}

export default ParameterSettings;