import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')

const root = ReactDOM.createRoot(document.getElementById('root'));
// console.log("yes it runs")
const port = new SerialPort({path: 'COM5', 
    baudRate: 9600
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));
parser.on('data', (data) =>{
  // win.webContents.send('update-counter', data)
  // global.arduinoData = data;
  console.log(data);
});

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
