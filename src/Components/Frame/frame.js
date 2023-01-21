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
// import io from 'socket.io-client';

function Frame({mainEngine, auxEngine, GPSData, loginManager}) {
    const[currentState, setCurrentState] = useState("MAIN. ENG.");
    const[activeIndicatorView, setActiveIndicatorView] = useState(0);
    const[activeParameterView, setActiveParameterView] = useState(0);
  
  // useEffect(() => {
  //   const socket = io('http://localhost:3000');

  //   socket.on('arduino-data', data => {
  //     console.log(`Received data: ${data}`);
  //     // Process the data here, such as updating the state or sending it to a server
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  return (
    <div className='mainContainer'>
        <div className="headerContainer">
            <Header state={currentState} stateIndicator={activeIndicatorView} loginManager={loginManager}/>
        </div>
        <div className="displayContainer">
          <DisplayContainer name="MAIN. ENG." state={currentState} content={<ME mainEngineValue={mainEngine} state={activeIndicatorView} setState={setActiveIndicatorView} />} />
          <DisplayContainer name="AUX. ENG." state={currentState} content={<AuxEngine auxEngineValue={auxEngine} state={activeIndicatorView} setState={setActiveIndicatorView}  />} />
          <DisplayContainer name="OVERVIEW" state={currentState} content={<DetailedOverview mainEngineValue={mainEngine} auxEngineValue={auxEngine} GPSData={GPSData} />} />
          <DisplayContainer name="ALARM" state={currentState}  content={<Alarm />} />
          <DisplayContainer name="ALARM SUMMARY" state={currentState}  content={<AlarmSummary  />} />
          <DisplayContainer name="PARAMETER" state={currentState}  content={<Parameter state={activeParameterView} setState={setActiveParameterView} />} />
        </div>
        <div className="mainButtonSelectionContainer">
                <NavigatorButtons name="MAIN. ENG." onNameChange={setCurrentState} icon={EngineIcon} iconPadding={60} state={currentState}/>
                <NavigatorButtons name="AUX. ENG."  onNameChange={setCurrentState} icon={EngineIcon} iconPadding={60} state={currentState}/>
                <NavigatorButtonsNoIcon name="OVERVIEW"  onNameChange={setCurrentState} state={currentState}/>
                <NavigatorButtons name="ALARM"  onNameChange={setCurrentState} icon={AlarmIcon} iconPadding={50} state={currentState}/>
                <NavigatorButtons name="ALARM SUMMARY"  onNameChange={setCurrentState} icon={AlarmSummaryIcon} iconPadding={50} state={currentState}/>
                <NavigatorButtons name="PARAMETER"  onNameChange={setCurrentState} icon={ParameterIcon} iconPadding={50} state={currentState}/>
        </div>
    </div>
  );
}

export default Frame;