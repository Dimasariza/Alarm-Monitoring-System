import React, { useCallback, useEffect } from 'react'
import LogoAMSIcon from '../../Assets/AMS-Modelling-Assets/LogoAMSIcon.png'
import SettingButton from '../../Assets/AMS-Modelling-Assets/UIENINButtonSetting.png'
import HeaderDate from './header-date';

function checkUniqueState(state){
    if(state == "ME STBD"){
        return "MAIN ENGINE STARBOARD";
    }else if(state == "ME PORT"){
        return "MAIN ENGINE PORT";
    }else{
        return state;
    }
}

function Header({state}) {

    return (
        <div className='headerContainer-inner'>
            <img src={LogoAMSIcon} width={120} height={50} alt="Logo"></img>
            <div className='whiteBoxUnspecHeightWidth-circle'/>
            <div className='whiteBoxUnspecHeightWidth-leftText' height={50}>
                <div className='tealText'>{checkUniqueState(state)}</div>
            </div>
            <div className='whiteBoxUnspecHeightWidth' height={50}/>
            <HeaderDate />
            <button className='whiteBoxUnspecHeightWidth-circle' height={50}>
                <img src={SettingButton} width={50} height={50} alt="Settings"></img>
            </button>
        </div>
    );
}

export default Header;