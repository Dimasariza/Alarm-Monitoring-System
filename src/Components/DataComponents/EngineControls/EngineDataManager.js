import {EventEmitter} from 'events'
import EngineData from './EngineData'
import RandomEngineData from './RandomEngineData';

export default class EngineDataManager extends EventEmitter {

    constructor() {
        super()
        this.stbd = new RandomEngineData();
        this.port = new RandomEngineData();
    }

    updateEngineData(engineRPM, coolantTemp, OilPressure, HydraulicPressure){
        this.stbd.updateEngineData(engineRPM, coolantTemp, OilPressure, HydraulicPressure);
        this.port.updateEngineData(engineRPM, coolantTemp, OilPressure, HydraulicPressure);
    }
}