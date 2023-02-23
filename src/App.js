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

  let rots = 500
  let backward = false;
  
  useEffect(() =>{
    vkbm.on('hide', () => {
        setRefresh(prev => !prev)
        // console.log('refresh go! ', mainEngine)
    })

    // const timer = setInterval(() => {
    //   // console.log('you can see me every 1 seconds')
    //   // console.log(mainEngine.stbd.boostPressure);
    //   if(rots < 50 || rots > 1000) backward = !backward 
    //   if(backward){
    //     rots = rots - 20
    //   }else{
    //     rots = rots + 20
    //   }
      
    //   mainEngine.updateEngineData((rots), (rots), (rots), (rots));
    //   auxEngine.updateEngineData((rots), (rots), (rots), (rots));
    //   // console.log(loginManager);
    //   // setRefresh(prev => !prev);
    // }, 1000);

    socket.on('arduino-data', (data) => {
      var splitArray = data.split(',');
      // console.log(data)
      switch(splitArray[0]){
        case "digital":
          alarmManager.updateDigitalCommand(splitArray[1], splitArray[2], splitArray[3], splitArray[4], splitArray[5], splitArray[6], splitArray[7])
          break;
        case "analog": 
          mainEngine.updateEngineData(splitArray[1], splitArray[2], splitArray[3], splitArray[4]);
          auxEngine.updateEngineData(splitArray[1], splitArray[2], splitArray[3], splitArray[4]);
          break;
        case "safety":
          alarmManager.updateSafetyCommand(splitArray[1], splitArray[2], splitArray[3], splitArray[4], splitArray[5], splitArray[6], splitArray[7])
          break;
      }
      mainEngine.stbd.CheckAlarmsConditions();
      auxEngine.stbd.CheckAlarmsConditions();
    });
    return () => {
        socket.off('arduino-data');
        // clearInterval(timer);
    }
    
  }, []);
  
  return (
    <div style={{position: 'absolute'}}>
      <KeyboardComponent virtualKeyboardManager={vkbm} keyboardDisplayState={vkbm.keyboardStatus}/>
      <FrameLogin loginManager={loginManager} showLogin={loginManager.showDisplay} virtualKeyboardManager={vkbm}/>
      <Frame mainEngine={mainEngine} auxEngine={auxEngine} GPSData={GPSData} loginManager={loginManager} virtualKeyboardManager={vkbm} alarmManager={alarmManager}/>
    </div>
  );
}

export default App;
