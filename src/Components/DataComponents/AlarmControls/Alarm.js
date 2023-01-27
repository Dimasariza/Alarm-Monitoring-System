import {EventEmitter} from 'events'

export default class Alarm extends EventEmitter{

    constructor(command, desc, source) {
        super()
        this.recordedTime= new Date();
        this.command = command;
        this.desc = desc;
        this.source = source;
        this.acknowledge = true; 
    }


}