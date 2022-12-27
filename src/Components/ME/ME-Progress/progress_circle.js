import React from 'react'
import ME_ProgressCircle_Circle from './progress_circle_circle';
import ME_ProgressCircle_Line from './progress_circle_line';

function ME_ProgressCircle({parentData, data, active}) {
    return (
        <div className='ME-absoluteZone' style={{left: parentData[0], top: parentData[1]}}>
            <ME_ProgressCircle_Circle color={active ? '#00FF00' : '#FF0000'} posX={0} posY={0} size={parentData[2]} />
            {
                data.map((value, key) =>{
                    return(
                        <ME_ProgressCircle_Line color={active ? '#00FF00' : '#FF0000'} posX={value[0]} posY={value[1]} sizeX={value[2]} sizeY={value[3]} />
                    )
                })
            }
        </div>
    );
}

export default ME_ProgressCircle;