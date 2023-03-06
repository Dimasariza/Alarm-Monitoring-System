import React, { useCallback, useEffect, useState } from 'react'

function getBoxWidth(boxWidth){
    if(boxWidth == null) return 100
    return boxWidth
}

function getBoxHeight(boxHeight){
    if(boxHeight == null) return 40
    return boxHeight
}

function RevolutionMeterIndicator({engine, boxWidth, boxHeight}) {

    const[rawValue, setRawValue] = useState(engine.engineRev);

    useEffect(() => {
        const updateEngineRev = (value) => {
            setRawValue(value);
        }
        engine.on('Engine Rev', updateEngineRev);
        return () =>{
            engine.off('Engine Rev', updateEngineRev);
        }
    }, [engine]);

    return (
        <div className='tealBox' style={{width: getBoxWidth(boxWidth), height: getBoxHeight(boxHeight), display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
            <div style={{'display': 'flex', fontWeight: 'bold', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}> 
                REV
                <div className='battreyText-value'> {rawValue.toFixed(0) + ' RPM'} </div> 
            </div>
            
        </div>
    );
}

export default RevolutionMeterIndicator;