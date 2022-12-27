import React, { useCallback, useEffect } from 'react'

function ParameterSettingsNumber({name, value}) {
    return (
        <div className='whiteBox-parameterSetting-settingContainer'>
            {name}
            <div className='whiteBox-parameterSetting-number'>
                {value}
            </div>
        </div>
    );
}

export default ParameterSettingsNumber;