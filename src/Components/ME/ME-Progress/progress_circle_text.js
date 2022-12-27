import React from 'react'

function ME_ProgressCircle_Text({parentData, text}) {
    return (
        <div className='ME-absoluteZone-text' style={{width: parentData[2], left: parentData[0], top: parentData[1]}}>
            <div style={{color: '#00FFE8'}} >{text}</div>
        </div>
    );
}

export default ME_ProgressCircle_Text;