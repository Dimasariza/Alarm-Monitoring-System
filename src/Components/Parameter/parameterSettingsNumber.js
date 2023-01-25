import React, { useCallback, useEffect } from 'react'

function ParameterSettingsNumber({name, value, onClick}) {
    return (
        <div className='whiteBox-parameterSetting-settingContainer'>
            {name}
            <div className='whiteBox-parameterSetting-number' onClick={onClick}>
                {value}
            </div>
        </div>
    );
}

export default ParameterSettingsNumber;