import React, { useCallback, useEffect } from 'react'
import IndicatorRevolutionEngine from '../Indicator/indicator_Revolution_Engine'
import IndicatorRevolutionPropeller from '../Indicator/indicator_Revolution_Propeller';
import OverviewButton from './overviewButton';
import BattreyIndicator from './battreyIndicator';
import RedOverviewButton from './redOverviewButton';
import GreenOverviewButton from './greenOverviewButton';
import HourIndicator from './hourIndicator';
import COMPASS_BG from '../../Assets/PMSOL/COMPASS_BG.png'


function CompassParemeter({parameter, value, unit}) {
    return (
        <div className='whiteBox-parameterSetting-settingContainer'>
            <div>
                {parameter}
            </div>
            <div style={{display: 'block', 'textAlign': 'right'}}>
                <div >
                    {value}
                </div>
                <div>
                    {unit}
                </div>
            </div>
        </div>
    );
}

export default CompassParemeter;