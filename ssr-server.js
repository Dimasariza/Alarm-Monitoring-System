// const express = require('express');
// const app = express();
// const server = require('http').Server(app);
// const io = require('socket.io')(server);
// const SerialPort = require('serialport');

// const port = new SerialPort('COM3', { baudRate: 9600 });

// io.on('connection', socket => {
//   console.log('A client connected');

//   port.on('data', data => {
//     socket.emit('arduino-data', data);
//   });

//   socket.on('disconnect', () => {
//     console.log('A client disconnected');
//   });
// });

// server.listen(3000, () => {
//   console.log('Server listening on port 3000');
// });
