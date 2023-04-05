import './App.css';
import Frame from './Components/Frame/frame.js';
import EngineDataManager from './Components/DataComponents/EngineControls/EngineDataManager';
import GPSDataControl from './Components/DataComponents/GPSControls/gpsDataControl';
import FrameLogin from './Components/Frame/frameLogin';
import LoginManager from './Components/DataComponents/LoginControls/LoginManager';
import AlarmManager, { AlarmStatus } from './Components/DataComponents/AlarmControls/AlarmManager';
import React, { useEffect, useState, useMemo } from 'react';
import io from 'socket.io-client';
import KeyboardComponent from './Components/Frame/keyboardComponent';
import VirtualKeyboardManager from './Components/DataComponents/VirtualKeyboardControls/VirtualKeyboardManager';
import { addEventListener, removeEventListener } from './Components/DataComponents/SocketManager/socketManager';

export const CurrentActiveEngine = {
  MainEngine: 'MainEngine',
  AuxEngine: 'AuxEngine'
};

function App() {
  const socket = useMemo(() => io('http://localhost:3000'), []);
  const alarmManager = useMemo(() => new AlarmManager(socket), []);
  const mainEngine = useMemo(() => new EngineDataManager(alarmManager, "Main Engine", sendCode, socket), []);
  const auxEngine = useMemo(() => new EngineDataManager(alarmManager, "Aux Engine", sendCode, socket), []);
  const GPSData = useMemo(() => new GPSDataControl(), []);
  const loginManager = useMemo(() => new LoginManager(), []);
  const vkbm = useMemo(() => new VirtualKeyboardManager(), []);
  
  const [globalVariable, setArduinoData] = useState("UWU MATEY");
  const [refresh, setRefresh] = useState(false);
  const [activeEngine, setActiveEngine] = useState(CurrentActiveEngine.MainEngine);
  
  useEffect(() =>{
    vkbm.on('hide', () => {
        setRefresh(prev => !prev)
    })
  }, []);

  useEffect(() =>{
    const listener = (data) => {
      var splitArray = data.split(',');
      // console.log(data)
      switch(splitArray[0]){
        case "digital":
          alarmManager.updateDigitalCommand(splitArray[1], splitArray[2], splitArray[3], splitArray[4], splitArray[5], splitArray[6], splitArray[7], activeEngine)
          break;
        case "analog": 
            if(activeEngine == CurrentActiveEngine.MainEngine){
              mainEngine.updateEngineData(splitArray[1], splitArray[2], splitArray[3], splitArray[4]);
            }else{
              auxEngine.updateEngineData(splitArray[1], splitArray[2], splitArray[3], splitArray[4]);
            }
          break;
        case "safety":
          alarmManager.updateSafetyCommand(splitArray[1], splitArray[2], splitArray[3], splitArray[4], splitArray[5], splitArray[6], splitArray[7], activeEngine)
          break;
      }
      if(activeEngine == CurrentActiveEngine.MainEngine){
        mainEngine.stbd.CheckAlarmsConditions_ME();
      }else{
        auxEngine.stbd.CheckAlarmsConditions_AE();
      }
      if(alarmManager.alarmSound == AlarmStatus.Active){
        socket.emit('activateAlarm')
      }else if(alarmManager.alarmSound == AlarmStatus.Inactive){
        socket.emit('deactivateAlarm')
      }
    };

    addEventListener('arduino-data-mainAppUpdater', listener);
    return () => {
        removeEventListener('arduino-data-mainAppUpdater', listener);
    }
  }, [activeEngine, alarmManager, auxEngine, mainEngine])
  
  return (
    <div style={{position: 'absolute'}}>
      <KeyboardComponent 
      virtualKeyboardManager={vkbm} 
      keyboardDisplayState={vkbm.keyboardStatus}
      />
      <FrameLogin 
      loginManager={loginManager} 
      showLogin={loginManager.showDisplay} 
      virtualKeyboardManager={vkbm} 
      socket={socket}
      />
      <Frame  
      mainEngine={mainEngine} 
      auxEngine={auxEngine} 
      GPSData={GPSData} 
      loginManager={loginManager} 
      virtualKeyboardManager={vkbm} 
      alarmManager={alarmManager}
      activeEngine={activeEngine}
      setActiveEngine={setActiveEngine}
      />
    </div>
  );
}

export default App;
