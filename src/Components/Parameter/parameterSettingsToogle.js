import React, { useEffect, useState } from 'react'

function ParameterSettingsToogle({name, activation, onClick}) {
    return (
        <div className='whiteBox-parameterSetting-settingContainer'>
            {name}
            <div className={activation ? 'whiteBox-parameterSetting-toogle-active' : 'whiteBox-parameterSetting-toogle-inactive'} onClick={onClick}>
                {activation ? "ACTIVE" : "DISABLED"}
            </div>
        </div>
    );
}

export default ParameterSettingsToogle;