import NavigatorButtons from './navigator-buttons';
import NavigatorButtonsNoIcon from './navigator-buttons-no-icon';
import React, { useEffect, useState } from 'react';
import './frame.css'
import AlarmIcon from '../../Assets/AMS-Modelling-Assets/AlarmIcon.png'
import AlarmSummaryIcon from '../../Assets/AMS-Modelling-Assets/AlarmSummaryIcon.png'
import EngineIcon from '../../Assets/AMS-Modelling-Assets/EngineIcon.png'
import ParameterIcon from '../../Assets/AMS-Modelling-Assets/ParameterIcon.png'
import Header from '../Header/header';
import DisplayContainer from './displayContainer';
import ME from '../ME/me';
import Overview from '../Overview/overview.js'
import Alarm from '../Alarm/alarm.js'
import AlarmSummary from '../Alarm-Summary/alarm_summary.js'
import Parameter from '../Parameter/parameter.js'
import AuxEngine from '../AuxEngine/auxEngine';
import DetailedOverview from '../Overview/detailedOverview';
import RunningHourDisplay from './runningHour';
// import io from 'socket.io-client';

function Frame({mainEngine, auxEngine, GPSData, loginManager, virtualKeyboardManager, alarmManager, activeEngine, setActiveEngine}) {
    const[currentState, setCurrentState] = useState("MAIN. ENG.");
    const[activeIndicatorView, setActiveIndicatorView] = useState(0);
    const[activeParameterView, setActiveParameterView] = useState(0);
  
  useEffect(() => {
    switch(currentState){
      // case "MAIN. ENG.":
      //   mainEngine.updateActivation(true);
      //   auxEngine.updateActivation(false);
      //   break;
      // case "AUX. ENG.":
      //   mainEngine.updateActivation(false);
      //   auxEngine.updateActivation(true);
      //   break;
      default:
        mainEngine.updateActivation(true);
        auxEngine.updateActivation(true);
        break;
    }
  }, [currentState]);

  return (
    <div className='mainContainer'>
        <div className="headerContainer">
            <Header state={currentState} stateIndicator={activeIndicatorView} loginManager={loginManager} alarmManager={alarmManager} />
        </div>
        <div className="displayContainer">
          <DisplayContainer name="MAIN. ENG." state={currentState} content={<ME mainEngineValue={mainEngine} state={activeIndicatorView} setState={setActiveIndicatorView} alarmManager={alarmManager} />} />
          <DisplayContainer name="AUX. ENG." state={currentState} content={<AuxEngine auxEngineValue={auxEngine} state={activeIndicatorView} setState={setActiveIndicatorView} alarmManager={alarmManager} />} />
          <DisplayContainer name="OVERVIEW" state={currentState} content={<RunningHourDisplay mainEngineValue={mainEngine} auxEngineValue={auxEngine} state={activeIndicatorView} setState={setActiveIndicatorView} />} />
          <DisplayContainer name="ALARM" state={currentState}  content={<Alarm alarmManager={alarmManager} />} />
          <DisplayContainer name="ALARM SUMMARY" state={currentState}  content={<AlarmSummary alarmManager={alarmManager} />} />
          <DisplayContainer name="PARAMETER" state={currentState}  content={<Parameter state={activeParameterView} setState={setActiveParameterView} mainEngineValue={mainEngine} auxEngineValue={auxEngine} loginManager={loginManager} virtualKeyboardManager={virtualKeyboardManager} alarmManager={alarmManager} activeEngine={activeEngine} setActiveEngine={setActiveEngine}/>} />
        </div>
        <div className="mainButtonSelectionContainer">
                <NavigatorButtons name="MAIN. ENG." onNameChange={setCurrentState} icon={EngineIcon} iconPadding={60} state={currentState}/>
                <NavigatorButtons name="AUX. ENG."  onNameChange={setCurrentState} icon={EngineIcon} iconPadding={60} state={currentState}/>
                <NavigatorButtonsNoIcon name="OVERVIEW"  onNameChange={setCurrentState} state={currentState}/>
                <NavigatorButtons name="ALARM"  onNameChange={setCurrentState} icon={AlarmIcon} iconPadding={50} state={currentState}/>
                <NavigatorButtons name="ALARM SUMMARY"  onNameChange={setCurrentState} icon={AlarmSummaryIcon} iconPadding={50} state={currentState}/>
                <NavigatorButtons name="PARAMETER"  onNameChange={setCurrentState} icon={ParameterIcon} iconPadding={50} state={currentState} />
        </div>
    </div>
  );
}

export default Frame;