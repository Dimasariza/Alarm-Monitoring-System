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
            100,
            100,
            100,
            100,
            100,
            100,
            100,
            100];
        this.engineRev = 2000;
        this.shaftRev = 2000;
        this.lubOilPressure = 0.5;
        this.boostPressure = 0.3;
        this.coolingWaterTemp = 120;
        this.coolingWaterPressure = 0.5;
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
        this.startingFailure = false;
        this.battreyCharging = false;
        this.buzzer = true;
        this.amp = 80;
        this.pf = 0.85;
        this.power = 80;
        this.halfCircle = 100;

        this.startCommandActive = false;
        this.valveOpenActive = false;
        this.stopRPM = 1546;
        this.restartRPM = 1406;
        this.startStopTimeDelay = 15;
        this.lowPressureFO = 0.2;
        this.lowTempCW = 40;
        this.highTempCW = 80;
        this.lowTempExhGas = 100;
        this.highTempExhGas = 485;

        this.maxEngineRev = 3500;
        this.maxCoolingWaterTemp = 120;
        this.maxLubOilPressure = 1;
        this.maxBoostPressure = 0.3;
        this.shaftGearBox = 0.3;
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

    setStopRPM(value){
        this.stopRPM = value;
        console.log(this.stopRPM);
    }

    setRestartRPM(value){
        this.restartRPM = value;
    }

    setStartStopTimeDelay(value){
        this.startStopTimeDelay = value;
    }

    setLowPressureFO(value){
        this.lowPressureFO = value;
    }

    setLowTempCW(value){
        this.lowTempCW = value;
    }
    
    setHighTempCW(value){
        this.highTempCW = value;
    }

    setLowTempExhGas(value){
        this.lowTempExhGas = value;
    }
        
    setHighTempExhGas(value){
        this.highTempExhGas = value;
    }
        
    updateEngineData(engineRPM, coolantTemp, OilPressure, HydraulicPressure){
        this.engineRev = (engineRPM / 1023) * this.maxEngineRev;
        this.shaftRev = this.engineRev * this.shaftGearBox
        this.coolingWaterTemp = (coolantTemp / 1023) * this.maxCoolingWaterTemp;
        this.lubOilPressure = (OilPressure / 1023) * this.maxLubOilPressure;
        this.boostPressure = (HydraulicPressure / 1023) * this.maxBoostPressure;

        this.emit('Engine Rev', this.engineRev);
        this.emit('Shaft Rev', this.shaftRev);

        this.emit('Cooling Water Temp', this.coolingWaterTemp);
        this.emit('Lub Oil Pressure', this.lubOilPressure);
        this.emit('Boost Pressure', this.boostPressure);

    }
}