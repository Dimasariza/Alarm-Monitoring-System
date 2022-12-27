import React, { useCallback, useEffect } from 'react'
import ParameterSettingsNumber from './parameterSettingsNumber';
import ParameterSettingsToogle from './parameterSettingsToogle';

function ParameterSettings({side}) {
    return (
        <div className='displayContainer-shard'>
            <div style={{'textAlign': 'center', 'fontWeight': 'bold', color: '#FFFFFF', marginBottom: 30 }}>{side}</div>
            <div className='whiteBox-parameterSetting'>
                <ParameterSettingsToogle name={"Start Command"} activation={true}/>
                <ParameterSettingsToogle name={"Valve Open Command"} activation={true}/>
                <ParameterSettingsNumber name={"Stop RPM Set Point"}    value={"1546"}/>
                <ParameterSettingsNumber name={"Restart RPM Set Point"} value={"1406"}/>
                <ParameterSettingsNumber name={"Start Stop Time Delay"} value={"15"}/>
                <ParameterSettingsNumber name={"Low Pressure FO Set Point"} value={"0.38"}/>
                <ParameterSettingsNumber name={"Low Pressure CW Set Point"} value={"0.28"}/>
                <ParameterSettingsNumber name={"High Temp CW Set Point"} value={"48"}/>
                <ParameterSettingsNumber name={"Low Press Exh Gas Set Point"} value={"0.38"}/>
                <ParameterSettingsNumber name={"High Press Exh Gas Set Point"} value={"485"}/>
            </div>
        </div>
    );
}

export default ParameterSettings;