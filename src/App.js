import './App.css';
import Frame from './Components/Frame/frame.js';
import EngineDataManager from './Components/DataComponents/EngineControls/EngineDataManager';
import GPSDataControl from './Components/DataComponents/GPSControls/gpsDataControl';
import FrameLogin from './Components/Frame/frameLogin';
import LoginManager from './Components/DataComponents/LoginControls/LoginManager';
import AlarmManager from './Components/DataComponents/AlarmControls/AlarmManager';
import React, { useEffect, useState, useMemo } from 'react';
import io from 'socket.io-client';
import KeyboardComponent from './Components/Frame/keyboardComponent';
import VirtualKeyboardManager from './Components/DataComponents/VirtualKeyboardControls/VirtualKeyboardManager';
import { addEventListener, removeEventListener } from './Components/DataComponents/SocketManager/socketManager';

function sendCode(socket, code){
  // send code to throttle or steer wheel
  console.log(code)
  socket.emit('change', code.toString().toUpperCase())
}

export const CurrentActiveEngine = {
  MainEngine: 'MainEngine',
  AuxEngine: 'AuxEngine'
};

function App() {
  const socket = io('http://localhost:3000');
  const alarmManager = useMemo(() => new AlarmManager(), []);
  const mainEngine = useMemo(() => new EngineDataManager(alarmManager, "Main Engine", sendCode, socket), []);
  const auxEngine = useMemo(() => new EngineDataManager(alarmManager, "Aux Engine", sendCode, socket), []);
  const GPSData = useMemo(() => new GPSDataControl(), []);
  const loginManager = useMemo(() => new LoginManager(), []);
  const vkbm = useMemo(() => new VirtualKeyboardManager(), []);
  
  const [globalVariable, setArduinoData] = useState("UWU MATEY");
  const [refresh, setRefresh] = useState(false);
  const [activeEngine, setActiveEngine] = useState(CurrentActiveEngine.MainEngine);
  
  useEffect(() =>{
    // socket.emit('activateAlarm')
    vkbm.on('hide', () => {
        setRefresh(prev => !prev)
        // console.log('refresh go! ', mainEngine)
    })
  }, []);

  useEffect(() =>{
    const listener = (data) => {
      // console.log("Before, ME Overspeed " + alarmManager.ME_OverspeedShutdown)
      var splitArray = data.split(',');
      // console.log(data)
      switch(splitArray[0]){
        case "digital":
          alarmManager.updateDigitalCommand(splitArray[1], splitArray[2], splitArray[3], splitArray[4], splitArray[5], splitArray[6], splitArray[7], activeEngine)
          break;
        case "analog": 
            if(activeEngine == CurrentActiveEngine.MainEngine){
              // console.log('Update main engine');
              mainEngine.updateEngineData(splitArray[1], splitArray[2], splitArray[3], splitArray[4]);
            }else{
              // console.log('Update aux engine');
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
      // console.log("After, ME Overspeed " + alarmManager.ME_OverspeedShutdown)
    };

    addEventListener('arduino-data-mainAppUpdater', listener);
    return () => {
        removeEventListener('arduino-data-mainAppUpdater', listener);
    }
  }, [activeEngine, alarmManager, auxEngine, mainEngine])
  
  return (
    <div style={{position: 'absolute'}}>
      <KeyboardComponent virtualKeyboardManager={vkbm} keyboardDisplayState={vkbm.keyboardStatus}/>
      <FrameLogin loginManager={loginManager} showLogin={loginManager.showDisplay} virtualKeyboardManager={vkbm} socket={socket}/>
      <Frame mainEngine={mainEngine} auxEngine={auxEngine} 
             GPSData={GPSData} loginManager={loginManager} 
             virtualKeyboardManager={vkbm} alarmManager={alarmManager}
             activeEngine={activeEngine}
             setActiveEngine={setActiveEngine}/>
    </div>
  );
}

export default App;
