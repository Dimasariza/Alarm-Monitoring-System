import React, { useCallback, useEffect, useState } from 'react'
import LogoAMSIcon from '../../Assets/AMS-Modelling-Assets/LogoAMSIcon.png'
import SettingButton from '../../Assets/AMS-Modelling-Assets/UIENINButtonSetting.png'
import HeaderDate from './header-date';
import { AlarmStatus } from '../DataComponents/AlarmControls/AlarmManager';

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

function Header({state, stateIndicator, loginManager, alarmManager}) {
    const[newestAlarm, setHeaderWarning] = useState("placeholder")

    useEffect(() => {
        alarmManager.on('Alarm', (value)=>{
            if(value.status == AlarmStatus.Active){
                setHeaderWarning(value.desc);;
            }
        });

        alarmManager.on('Deactivate Header', (value) =>{
            // console.log("Acknowlede Desc is " +  value, alarmManager.lastMassage)
            if(value == alarmManager.lastMassage){
                alarmManager.lastMassage=''
                setHeaderWarning('');
            }
        });
      }, []);

    return (
        <div className='headerContainer-inner'>
            <img src={LogoAMSIcon} width={120} height={50} alt="Logo"></img>
            <div className='whiteBoxUnspecHeightWidth-circle'/>
            <div className='whiteBoxUnspecHeightWidth-leftText' height={50}>
                <div className={state == "OVERVIEW" ? 'mainContainer-login-off' : ''}>
                    <div className='tealText' style={{display:'block'}}>{checkUniqueState(state)}</div>
                    <div className='tealText' style={{display:showSecondary(state)}}>{checkSecondaryState(stateIndicator)}</div>
                </div>
                <div className={state != "OVERVIEW" ? 'mainContainer-login-off' : ''} >
                    <div className='tealText' style={{display:'block', fontSize: 30, fontWeight: 'bold'}}>{'R/H MONITORING'}</div>
                </div>
            </div>
            <div className='whiteBoxUnspecHeightWidth' height={50}>
                <div className={state == "OVERVIEW" ? 'mainContainer-login-off' : ''}>
                    <div style={{display:'block', fontSize: 15, fontWeight: 'bold', color: '#FF0000'}}>{alarmManager.lastMassage}</div>
                </div>
                <div className={state != "OVERVIEW" ? 'mainContainer-login-off' : ''}>
                    <div className='tealText' style={{display:'block', fontSize: 25, fontWeight: 'bold'}}>{'MV. TRANSKO BETET'}</div>
                </div>
            </div>
            <HeaderDate />
            <button className='whiteBoxUnspecHeightWidth-circle' height={50} onClick={() => loginManager.showHideDisplay()}>
                <img src={SettingButton} width={50} height={50} alt="Settings"></img>
            </button>
        </div>
    );
}

export default Header;