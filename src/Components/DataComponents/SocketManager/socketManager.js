import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const eventListeners = {};

socket.on('arduino-data', (data) => {
    Object.values(eventListeners).forEach((listener) => {
        const myArray = Array.from(listener);
        const target = myArray[0];
        target(data)});
});

function addEventListener(eventName, listener) {
    if (!eventListeners[eventName]) {
        eventListeners[eventName] = new Set();
    }
    eventListeners[eventName].add(listener);
}

function removeEventListener(eventName, listener) {
    if (eventListeners[eventName]) {
        eventListeners[eventName].delete(listener);
        if (eventListeners[eventName].size === 0) {
            delete eventListeners[eventName];
        }
    }
}

export { addEventListener, removeEventListener };
