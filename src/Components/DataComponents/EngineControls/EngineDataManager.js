import {EventEmitter} from 'events'
import EngineData from './EngineData'
import RandomEngineData from './RandomEngineData';

export default class EngineDataManager extends EventEmitter {

    constructor(alarmManager, source) {
        super()
        this.stbd = new EngineData(alarmManager, source);
        this.port = new EngineData(alarmManager, source);
        this.active = false;
    }

    updateEngineData(engineRPM, coolantTemp, lubOilPressure, workingLoad){
        if(!this.active) return;
        this.stbd.updateEngineData(engineRPM, coolantTemp, lubOilPressure, workingLoad);
        this.port.updateEngineData(engineRPM, coolantTemp, lubOilPressure, workingLoad);
    }

    updateActivation(newState){
        this.active = newState
    }
}