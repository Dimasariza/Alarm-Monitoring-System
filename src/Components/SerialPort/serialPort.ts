// const SerialPort = require("serialport");
// const ReadLine = require("@serialport/parser-readline");

// const deviceLocation = "/dev/tty.usbmodem";
// const baudRate = 9600;
// const matched = false;

// SerialPort.list().then((devices) => {
//     console.log(devices);
//     if(matched){
//         const SP = new SerialPort(deviceLocation, {
//             baudRate: baudRate,
//         });

//         SP.on("open", () => this.onConnectionOpened());
//         SP.on("close", () => this.onConnectionClosed());

//         const parser = SP.pipe(new ReadLine({ delimiter: "\n"}));
//         parser.on("data", (data) => this.onDataReceived(data));

//         SP.write("message", (err) =>{
//             if(err){
//                 return console.log("Error on write: ", err.message);
//             }
//             console.log("message written");
//         });
//     }
// });