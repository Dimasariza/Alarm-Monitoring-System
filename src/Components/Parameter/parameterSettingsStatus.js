import React, { useCallback, useEffect } from 'react'

function ParameterSettingsStatus({name1, name2, selected1, selected2}) {
    return (
        <div className='whiteBox-parameterSetting-settingContainer' style={{height: '45px'}}>
            <div className={name1!="" ? (selected1 ? 'selectionButton-selected' : 'selectionButton-unselected') : ('')} style={{height: '100%'}}>
                <div style={{ width: '100%', fontSize : 15, fontWeight: 'bold'}}>{name1}</div>
            </div>
            <div className={selected2 ? 'selectionButton-selected' : 'selectionButton-unselected'} style={{height: '100%'}}>
                <div style={{ width: '100%', fontSize : 15, fontWeight: 'bold'}}>{name2}</div>
            </div>
        </div>
    );
}

export default ParameterSettingsStatus;