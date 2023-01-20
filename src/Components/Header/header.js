import React, { useCallback, useEffect } from 'react'
import LogoAMSIcon from '../../Assets/AMS-Modelling-Assets/LogoAMSIcon.png'
import SettingButton from '../../Assets/AMS-Modelling-Assets/UIENINButtonSetting.png'
import HeaderDate from './header-date';

function checkUniqueState(state){
    if(state == "MAIN. ENG." || state == "AUX. ENG."){
        return "STATUS";
    }else{
        return state;
    }
}

function checkSecondaryState(stateIndicator){
    if(stateIndicator == 0){
        return 'Main Engine - Starboard';
    }else if(stateIndicator == 1){
        return "Main Engine - Port";
    }else if(stateIndicator == 2){
        return "Main Engine - Overview";
    }
}

function showSecondary(state){
    if(state == "MAIN. ENG." || state == "AUX. ENG."){
        return 'block';
    }else{
        return 'none';
    }
}

function Header({state, stateIndicator, loginManager}) {

    return (
        <div className='headerContainer-inner'>
            <img src={LogoAMSIcon} width={120} height={50} alt="Logo"></img>
            <div className='whiteBoxUnspecHeightWidth-circle'/>
            <div className='whiteBoxUnspecHeightWidth-leftText' height={50}>
                <div className='tealText' style={{display:'block'}}>{checkUniqueState(state)}</div>
                <div className='tealText' style={{display:showSecondary(state)}}>{checkSecondaryState(stateIndicator)}</div>
            </div>
            <div className='whiteBoxUnspecHeightWidth' height={50}/>
            <HeaderDate />
            <button className='whiteBoxUnspecHeightWidth-circle' height={50} onClick={() => loginManager.showHideDisplay()}>
                <img src={SettingButton} width={50} height={50} alt="Settings"></img>
            </button>
        </div>
    );
}

export default Header;