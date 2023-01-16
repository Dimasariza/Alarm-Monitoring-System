import {EventEmitter} from 'events'
import EngineData from './EngineData'
import RandomEngineData from './RandomEngineData';

export default class EngineDataManager extends EventEmitter {

    constructor() {
        super()
        this.stbd = new EngineData();
        this.port = new RandomEngineData();
    }
}