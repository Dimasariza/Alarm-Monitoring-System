import React, { useCallback, useEffect } from 'react'

function ME_ProgressCircle_Line({color, posX, posY, sizeX, sizeY}) {
    return (
        <div className='ME-process-container-line' style={{ 
            top: posY, left: posX, 
            width: sizeX, height: sizeY, 
            backgroundColor: color}}/>
    );
}

export default ME_ProgressCircle_Line;