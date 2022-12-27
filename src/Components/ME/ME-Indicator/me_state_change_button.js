import React, { useCallback, useEffect, useState } from 'react'

function getNewStateValue(current, change, max, min){
    var newVal = current + change;
    if(newVal > max) return min;
    if(newVal < min) return max;
    return newVal;
}

function MEStateButton({icon, state, setState, stateValueChange, max, min}) {
    return (
        <button className='StateChangeButton' onClick={() => setState(getNewStateValue(state, stateValueChange, max, min))} value={"State change button"}>
            <img src={icon} width={30} height={30} alt={"State change button"}></img>
        </button>
    );
}

export default MEStateButton;