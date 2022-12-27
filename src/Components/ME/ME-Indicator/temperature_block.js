import React, { useCallback, useEffect } from 'react'


function getColor(value){
    if(value <= 200){
        return '#0AFF0A'
    }else if(value <= 400){
        return '#ffbb00'
    }else{
        return '#fe0222'
    }
}

function getPercentage(value){
    return 100 - (100 * (value / 600))
}

function TemperatureBlock({name, temperature}) {
    return (
        <div className='TEMP-Block'>
            <div className='TEMP-Block-Text'> {name} </div>
            <div className='TEMP-Block-Graph'>
                <div className='TEMP-Fill-BG' style={{backgroundColor : getColor(temperature)}}/> 
                <div className='TEMP-Fill' style={{backgroundColor : '#000000', '--fill' : getPercentage(temperature)}}/> 
                <div className='TEMP-Frame'/> 
            </div>
            <div className='TEMP-Block-Text' style={{color: '#00FFE8', height : 20}}> {temperature} </div>
            <div className='TEMP-Block-Text' style={{height : 20}}> {name} </div>
        </div>
    );
}

export default TemperatureBlock;