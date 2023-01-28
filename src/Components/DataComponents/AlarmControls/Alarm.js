import {EventEmitter} from 'events'
import { AlarmStatus } from './AlarmManager';

export default class AlarmDetail extends EventEmitter{

    constructor(command, desc, source, alarmStatus) {
        super()
        this.recordedTime= new Date();
        this.command = command;
        this.desc = desc;
        this.source = source;
        this.status = alarmStatus; 
    }


}
