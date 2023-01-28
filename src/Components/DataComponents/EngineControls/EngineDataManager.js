import {EventEmitter} from 'events'
import EngineData from './EngineData'
import RandomEngineData from './RandomEngineData';

export default class EngineDataManager extends EventEmitter {

    constructor(alarmManager, source) {
        super()
        this.stbd = new EngineData(alarmManager, source);
        this.port = new EngineData(alarmManager, source);
    }

    updateEngineData(engineRPM, coolantTemp, OilPressure, HydraulicPressure){
        this.stbd.updateEngineData(engineRPM, coolantTemp, OilPressure, HydraulicPressure);
        this.port.updateEngineData(engineRPM, coolantTemp, OilPressure, HydraulicPressure);
    }
}