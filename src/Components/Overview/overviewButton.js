import React, { useCallback, useEffect } from 'react'

function OverviewButton({name, active}) {
    return (
        <button className={active ? 'whiteBox-OverviewButton-Red' : 'whiteBox-OverviewButton-Green'}>
            {name}
        </button>
    );
}

export default OverviewButton;