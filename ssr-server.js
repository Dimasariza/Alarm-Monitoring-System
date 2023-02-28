const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const { spawn } = require('child_process');

const port = new SerialPort({
    path:'/dev/ttyACM0',
    baudRate: 9600,
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

io.on('connection', socket => {
    console.log('A client connected');

    // listening changes code here
    socket.on('change', (code) => {
        console.log(code)
        switch(code) {
            case 'INIT': {
                sendCode('ZR')
                sendCode('STP')
                break
            }
            default: sendCode(code)
        }
    })

    socket.on('shutdown', () => {
        const shutdownProcess = spawn('sudo', ['shutdown', '-h', 'now']);
        shutdownProcess.on('exit', () => {
            console.log('Shutting down...');
            res.status(200).send('Shutting down...');
          });
    })

    parser.on('data', (data) =>{
        socket.emit('arduino-data', data);
    });

    socket.on('disconnect', () => {
        console.log('A client disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});
