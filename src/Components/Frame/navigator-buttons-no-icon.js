import React, { useCallback, useEffect, useState } from 'react'

function NavigatorButtonsNoIcon({name, onNameChange, state}) {
    const [selected, setSelected] = useState(false);
    useEffect(() => {
        if(state == name){
            setSelected(true);
        }else{
            setSelected(false);
        }
    }, [state]);

    return (
        <div>
            <button className={selected ? 'selectionButton-selected' : 'selectionButton-unselected'} onClick={() => onNameChange(name)} value={name}>
                <div style={{ width: 200, 'font-size' : 18, fontWeight: 'bold'}}>{name}</div>
            </button>
            
        </div>
    );
}

export default NavigatorButtonsNoIcon;