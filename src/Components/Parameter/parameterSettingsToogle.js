import React, { useEffect, useState } from 'react'

function ParameterSettingsToogle({name}) {
    const [activation, setActivation] = new useState(true);
    return (
        <div className='whiteBox-parameterSetting-settingContainer'>
            {name}
            <div className='whiteBox-parameterSetting-toogle'>
                {activation ? "ACTIVE" : "DISABLED"}
            </div>
        </div>
    );
}

export default ParameterSettingsToogle;