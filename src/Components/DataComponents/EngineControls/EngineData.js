import {EventEmitter} from 'events'

export const EngineDirection = {
    Ahead: 'Ahead',
    Neutral: 'Neutral',
    Astern: 'Astern',
};

export const EngineControlStatus = {
    Remote: 'Remote',
    Local: 'Local',
};

export default class EngineData extends EventEmitter{

    constructor() {
        super()
        this.engineTemperature = [
            600,
            600,
            600,
            600,
            600,
            600,
            600,
            600];
        this.engineRev = 2000;
        this.shaftRev = 2000;
        this.lubOilPressure = 0.5;
        this.boostPressure = 0.3;
        this.coolingWaterTemp = 120;
        this.exhaustTemp = 700;
        this.runningHour = 10000;
        this.battreyVolt = 30;
        this.battreyLife = 100;
        this.engineDirection = EngineDirection.Neutral;
        this.engineControlStatus = EngineControlStatus.Remote;
        this.emergencyStop = false;
        this.readyToStart = true;
        this.auxBlowerFailure = false;
        this.engineRunning = true;
    }

    getEngineTemperature(){
        return this.engineTemperature;
    }

    getEngineTemperatureAverage(){
        var averageTemp = 0;
        this.engineTemperature.forEach(element => {
            averageTemp += element;
        });
        return averageTemp / this.engineTemperature.length;
    }

    getEngineRev(){
        return this.engineRev;
    }

    getShaftRev(){
        return this.shaftRev;
    }

    getLubOilPressure(){
        return this.lubOilPressure;
    }

    getCoolingWaterTemp(){
        return this.coolingWaterTemp;
    }

    getExhaustTemp(){
        return this.exhaustTemp;
    }

    getRunningHour(){
        return this.runningHour;
    }

    getBattreyVolt(){
        return this.battreyVolt;
    }

    getBattreyLife(){
        return this.battreyLife;
    }
}