import React, { useEffect, useState } from 'react';
import {open, close, read} from '@serialport/binding-abstract';

function MyComponent() {
    const [arduinoData, setArduinoData] = useState('');

    useEffect(() => {
        open("COM5", {baudRate: 9600}).then(port => {
            read(port, (data) => {
                setArduinoData(data.toString());
            });
        }).catch(console.error);
        return () => {
            close();
        }
    }, []);

    return (
        <div>
            <p>{arduinoData}</p>
        </div>
    );
}
