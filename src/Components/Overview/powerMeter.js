import React, { useEffect, useState } from 'react'

function getBoxWidth(boxWidth){
    if(boxWidth == null) return 100
    return boxWidth
}

function getBoxHeight(boxHeight){
    if(boxHeight == null) return 40
    return boxHeight
}

function PowerMeterIndicator({engine, boxWidth, boxHeight}) {
    const[rawValue, setRawValue] = useState(engine.power);

    useEffect(() => {
        const updatePowerMeter = (value) => {
            setRawValue(value);
        }
        engine.on('Workload Power', updatePowerMeter);
        return () =>{
            engine.off('Workload Power', updatePowerMeter);
        }
    }, [engine]);
    return (
        <div className='tealBox' style={{width: getBoxWidth(boxWidth), height: getBoxHeight(boxHeight), display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
            <div style={{'display': 'flex', fontWeight: 'bold', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}> 
                POWER
                <div className='battreyText-value'> {rawValue.toFixed(1) + ' KW'} </div> 
            </div>
            
        </div>
    );
}

export default PowerMeterIndicator;