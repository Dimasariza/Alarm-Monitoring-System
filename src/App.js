import './App.css';
import Frame from './Components/Frame/frame.js';
import EngineDataManager from './Components/DataComponents/EngineControls/EngineDataManager';
import GPSDataControl from './Components/DataComponents/GPSControls/gpsDataControl';
import FrameLogin from './Components/Frame/frameLogin';
import LoginManager from './Components/DataComponents/LoginControls/LoginManager';
import AlarmManager from './Components/DataComponents/AlarmControls/AlarmManager';
import React, { useEffect, useState } from 'react';
// import {uwuTest} from './renderer'

function App() {
  const mainEngine = new EngineDataManager();
  const auxEngine = new EngineDataManager();
  const GPSData = new GPSDataControl();
  const alarmManager = new AlarmManager();
  const loginManager = new LoginManager(alarmManager);
  
  const [globalVariable, setArduinoData] = useState("UWU MATEY");
  const myValue = global.myVariable;
  // const WebSocket = require('ws');
  // const socket = new WebSocket('ws://localhost:8080');
  
  useEffect(() =>{
    console.log(myValue);
    // socket.onmessage = (event) => {
    //   setGlobalVariable(event.data);
    //   console.log(event.data);
    // }
  }, []);
  
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // console.log(globalThis.wuwu);
  //   }, 1000);
  //   return () => clearInterval(globalThis.wuwu);
  // }, []);

  // useEffect(() => {
  //   setArduinoData(global.arduinoData);
  //   console.log(global.arduinoData);
  // }, [global.arduinoData]);

  
  return (
    <div style={{position: 'absolute'}}>
      <FrameLogin loginManager={loginManager} showLogin={loginManager.showDisplay}/>
      <Frame mainEngine={mainEngine} auxEngine={auxEngine} GPSData={GPSData} loginManager={loginManager}/>
      <div id='UWU' style={{background: '#000000', color: '#FFFFFF'}}>{myValue}</div>
      {/* <script src='./renderer.js'></script> */}
      
    </div>
  );
}

export default App;
