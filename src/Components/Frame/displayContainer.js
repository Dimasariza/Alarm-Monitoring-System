import React, { useCallback, useEffect, useState } from 'react'

function DisplayContainer({name, state, content}) {
    const [selected, setSelected] = useState(false);
    useEffect(() => {
        if(state == name){
            setSelected(true);
        }else{
            setSelected(false);
        }
    }, [state]);
    return (
        <div className={selected ? 'displayContainer-activated' : 'displayContainer-deactivated'}>
            {content}
        </div>
    );
}

export default DisplayContainer;