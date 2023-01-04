import React, { useCallback, useEffect, useState } from 'react'


function NavigatorButtons({name, onNameChange, icon, iconPadding, state}) {
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
                <div style={{ width: 200, fontSize : 18, fontWeight: 'bold'}}>{name}</div>
                <div width={iconPadding}> </div>
                <img src={icon} width={30} height={30} alt={name + " button"}></img>
            </button>
            
        </div>
    );
}

export default NavigatorButtons;