import NavigatorButtons from './navigator-buttons';
import NavigatorButtonsNoIcon from './navigator-buttons-no-icon';
import React, { useState } from 'react';
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

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomFloatFromInterval(min, max) { // min and max included 
  return Math.random() * (max - min + 1) + min
}

function Frame() {
    const[currentState, setCurrentState] = useState("MAIN. ENG.");
    const[activeIndicatorView, setActiveIndicatorView] = useState(0);
    const[activeParameterView, setActiveParameterView] = useState(0);
    const[mainEngine, setMainEngine] = useState({stbd: {
      engineTemperature: [
        randomIntFromInterval(0, 600),
        randomIntFromInterval(0, 600),
        randomIntFromInterval(0, 600),
        randomIntFromInterval(0, 600),
        randomIntFromInterval(0, 600),
        randomIntFromInterval(0, 600),
        randomIntFromInterval(0, 600),
        randomIntFromInterval(0, 600)],
      engineRev: randomIntFromInterval(0, 2000),
      shaftRev: randomIntFromInterval(0, 2000),
      lubOilPressure: Math.random(),
      boostPressure: Math.random() * 0.3,
      coolingWaterTemp: randomIntFromInterval(0, 120),
      exhaustTemp: randomIntFromInterval(0, 700),
      runningHour: randomIntFromInterval(0, 10000),
      battreyVolt: randomFloatFromInterval(0, 30),
      battreyLife: randomIntFromInterval(0, 100),
    }, port:
    {engineTemperature: [
      100,
      200,
      100,
      100,
      100,
      100,
      100,
      100],
      engineRev: 1500,
      shaftRev: 1000,
      lubOilPressure: 0.6,
      boostPressure: 0.15,
      coolingWaterTemp: 60,
      exhaustTemp: 700,
      runningHour: 1000,
      battreyVolt: 13.5,
      battreyLife: 30,
    }}
    );
    const[auxEngine, setAuxEngine] = useState({stbd: {
      engineRev: 1000,
      shaftRev: 1000,
      lubOilPressure: 0.6,
      boostPressure: 0.15,
      coolingWaterTemp: 60,
      exhaustTemp: 700,
      runningHour: 1000,
      battreyVolt: 13.5,
      battreyLife: 50,
    }, port:
    { engineRev: 2000,
      shaftRev: 2000,
      lubOilPressure: 0.6,
      boostPressure: 0.15,
      coolingWaterTemp: 60,
      exhaustTemp: 700,
      runningHour: 1000,
      battreyVolt: 13.5,
      battreyLife: 50,
    }}
    );

  return (
    <div className='mainContainer'>
        <div className="headerContainer">
            <Header state={currentState} stateIndicator={activeIndicatorView}/>
        </div>
        <div className="displayContainer">
          <DisplayContainer name="MAIN. ENG." state={currentState} content={<ME mainEngineValue={mainEngine} state={activeIndicatorView} setState={setActiveIndicatorView} />} />
          <DisplayContainer name="AUX. ENG." state={currentState} content={<AuxEngine auxEngineValue={auxEngine} state={activeIndicatorView} setState={setActiveIndicatorView}  />} />
          <DisplayContainer name="OVERVIEW" state={currentState} content={<DetailedOverview mainEngineValue={mainEngine} auxEngineValue={auxEngine} />} />
          <DisplayContainer name="ALARM" state={currentState}  content={<Alarm  />} />
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