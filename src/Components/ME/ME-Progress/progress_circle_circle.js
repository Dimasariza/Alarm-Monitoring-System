import React, { useCallback, useEffect } from 'react'

function ME_ProgressCircle_Circle({color, posX, posY, size}) {
    return (
        <div className='ME-process-container-circle' style={{ 
            top: posY, left: posX, 
            width: size, height: size, 
            backgroundColor: color}} />
    );
}

export default ME_ProgressCircle_Circle;