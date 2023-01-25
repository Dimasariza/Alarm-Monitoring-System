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

function App() {
  const mainEngine = new EngineDataManager();
  const auxEngine = new EngineDataManager();
  const GPSData = new GPSDataControl();
  const alarmManager = new AlarmManager();
  const loginManager = new LoginManager();
  const vkbm = new VirtualKeyboardManager();
  
  const [globalVariable, setArduinoData] = useState("UWU MATEY");
  const socket = io('http://localhost:3000');
  const [refresh, setRefresh] = useState(false);
  
  useEffect(() =>{
    vkbm.on('hide', () => {
        setRefresh(prev => !prev)
        console.log('refresh go! ', mainEngine)
    })

    socket.on('arduino-data', (data) => {
      var splitArray = data.split(',');
      switch(splitArray[0]){
        case "alarm":
          alarmManager.updateAlarmCommand(splitArray[1], splitArray[2], splitArray[3], splitArray[4], splitArray[5], splitArray[6], splitArray[7])
          break;
        case "ananlog":
          mainEngine.updateEngineData(splitArray[1], splitArray[2], splitArray[3], splitArray[4]);
          break;
        case "safety":
          // mainEngine.updateEngineData(splitArray[1], splitArray[2], splitArray[3], splitArray[4]);
          break;
      }
    });
    return () => {
        socket.off('arduino-data');
    }
    
  }, []);
  
  return (
    <div style={{position: 'absolute'}}>
      <KeyboardComponent virtualKeyboardManager={vkbm} keyboardDisplayState={vkbm.keyboardStatus}/>
      <FrameLogin loginManager={loginManager} showLogin={loginManager.showDisplay} virtualKeyboardManager={vkbm}/>
      <Frame mainEngine={mainEngine} auxEngine={auxEngine} GPSData={GPSData} loginManager={loginManager} virtualKeyboardManager={vkbm}/>
    </div>
  );
}

export default App;
