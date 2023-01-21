import './App.css';
import Frame from './Components/Frame/frame.js';
import EngineDataManager from './Components/DataComponents/EngineControls/EngineDataManager';
import GPSDataControl from './Components/DataComponents/GPSControls/gpsDataControl';
import FrameLogin from './Components/Frame/frameLogin';
import LoginManager from './Components/DataComponents/LoginControls/LoginManager';
import AlarmManager from './Components/DataComponents/AlarmControls/AlarmManager';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

function App() {
  const mainEngine = new EngineDataManager();
  const auxEngine = new EngineDataManager();
  const GPSData = new GPSDataControl();
  const alarmManager = new AlarmManager();
  const loginManager = new LoginManager(alarmManager);
  
  const [globalVariable, setArduinoData] = useState("UWU MATEY");
  const socket = io('http://localhost:3000');
  
  useEffect(() =>{
    socket.on('arduino-data', (data) => {
      setArduinoData(data);
    });
    return () => {
        socket.off('arduino-data');
    }
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      console.log(globalVariable);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   setArduinoData(global.arduinoData);
  //   console.log(global.arduinoData);
  // }, [global.arduinoData]);

  
  return (
    <div style={{position: 'absolute'}}>
      <FrameLogin loginManager={loginManager} showLogin={loginManager.showDisplay}/>
      <Frame mainEngine={mainEngine} auxEngine={auxEngine} GPSData={GPSData} loginManager={loginManager}/>
      <div id='UWU' style={{background: '#000000', color: '#FFFFFF'}}>{globalVariable}</div>
      {/* <script src='./renderer.js'></script> */}
      
    </div>
  );
}

export default App;
