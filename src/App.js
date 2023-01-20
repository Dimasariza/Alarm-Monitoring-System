import './App.css';
import Frame from './Components/Frame/frame.js';
import EngineDataManager from './Components/DataComponents/EngineControls/EngineDataManager';
import GPSDataControl from './Components/DataComponents/GPSControls/gpsDataControl';
import FrameLogin from './Components/Frame/frameLogin';
import LoginManager from './Components/DataComponents/LoginControls/LoginManager';
import AlarmManager from './Components/DataComponents/AlarmControls/AlarmManager';
import React, { useEffect, useState } from 'react';

// const { SerialPort } = require('serialport')
// const { ReadlineParser } = require('@serialport/parser-readline')

// var port = new SerialPort({ 
//   path: 'COM5',
//   baudRate: 9600
// });

// const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))
// parser.on('data', console.log)



// parser.on('data', function(data) {
    
//   console.log('Received data from port: ' + data);
  
//   // io.emit('data', data);
  
// });


function App() {

  const mainEngine = new EngineDataManager();
  const auxEngine = new EngineDataManager();
  const GPSData = new GPSDataControl();
  const alarmManager = new AlarmManager();
  const loginManager = new LoginManager(alarmManager);
  return (
    <div style={{position: 'absolute'}}>
      <FrameLogin loginManager={loginManager} showLogin={loginManager.showDisplay}/>
      <Frame mainEngine={mainEngine} auxEngine={auxEngine} GPSData={GPSData} loginManager={loginManager}/>
    </div>
    
  );
}

export default App;
