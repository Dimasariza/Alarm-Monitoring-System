import './App.css';
import Frame from './Components/Frame/frame.js';
import EngineDataManager from './Components/DataComponents/EngineControls/EngineDataManager';
import GPSDataControl from './Components/DataComponents/GPSControls/gpsDataControl';
import FrameLogin from './Components/Frame/frameLogin';
import LoginManager from './Components/DataComponents/LoginControls/LoginManager';
import AlarmManager from './Components/DataComponents/AlarmControls/AlarmManager';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import KeyboardComponent from './Components/Frame/keyboardComponent';
import VirtualKeyboardManager from './Components/DataComponents/VirtualKeyboardControls/VirtualKeyboardManager';

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
  const alarmManager = new AlarmManager();
  const mainEngine = new EngineDataManager(alarmManager, "Main Engine", sendCode, socket);
  const auxEngine = new EngineDataManager(alarmManager, "Aux Engine", sendCode, socket);
  const GPSData = new GPSDataControl();
  const loginManager = new LoginManager();
  const vkbm = new VirtualKeyboardManager();
  
  const [globalVariable, setArduinoData] = useState("UWU MATEY");
  const [refresh, setRefresh] = useState(false);
  const [activeEngine, setActiveEngine] = useState(CurrentActiveEngine.MainEngine);
  
  useEffect(() =>{
    vkbm.on('hide', () => {
        setRefresh(prev => !prev)
        // console.log('refresh go! ', mainEngine)
    })

    socket.on('arduino-data', (data) => {
      var splitArray = data.split(',');
      // console.log(data)
      switch(splitArray[0]){
        case "digital":
          alarmManager.updateDigitalCommand(splitArray[1], splitArray[2], splitArray[3], splitArray[4], splitArray[5], splitArray[6], splitArray[7], activeEngine)
          break;
        case "analog": 
            mainEngine.updateEngineData(splitArray[1], splitArray[2], splitArray[3], splitArray[4]);
            auxEngine.updateEngineData(splitArray[1], splitArray[2], splitArray[3], splitArray[4]);
          break;
        case "safety":
          alarmManager.updateSafetyCommand(splitArray[1], splitArray[2], splitArray[3], splitArray[4], splitArray[5], splitArray[6], splitArray[7], activeEngine)
          break;
      }
      mainEngine.stbd.CheckAlarmsConditions_ME();
      auxEngine.stbd.CheckAlarmsConditions_AE();
    });
    return () => {
        socket.off('arduino-data');
        // clearInterval(timer);
    }
  }, []);

  // useEffect(() =>{
  //     mainEngine.updateEngineActiveStatus(activeEngine == CurrentActiveEngine.MainEngine);
  //     auxEngine.updateEngineActiveStatus(activeEngine == CurrentActiveEngine.AuxEngine);
  // }, [activeEngine])
  
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
