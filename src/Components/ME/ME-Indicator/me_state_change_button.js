import React, { useCallback, useEffect, useState } from 'react'

function getNewStateValue(current, change){
    var newVal = current + change;
    if(newVal > 2) return 0;
    if(newVal < 0) return 2;
    return newVal;
}

function MEStateButton({icon, state, setState, stateValueChange}) {
    return (
        <button className='StateChangeButton' onClick={() => setState(getNewStateValue(state, stateValueChange))} value={"State change button"}>
            <img src={icon} width={30} height={30} alt={"State change button"}></img>
        </button>
    );
}

export default MEStateButton;