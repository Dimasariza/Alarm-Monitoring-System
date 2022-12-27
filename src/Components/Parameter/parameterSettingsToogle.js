import React, { useEffect, useState } from 'react'

function ParameterSettingsToogle({name, activation}) {
    return (
        <div className='whiteBox-parameterSetting-settingContainer'>
            {name}
            <div className={activation ? 'whiteBox-parameterSetting-toogle-active' : 'whiteBox-parameterSetting-toogle-inactive'}>
                {activation ? "ACTIVE" : "DISABLED"}
            </div>
        </div>
    );
}

export default ParameterSettingsToogle;