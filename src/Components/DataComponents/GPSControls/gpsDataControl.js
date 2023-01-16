import {EventEmitter} from 'events'

export default class GPSDataControl extends EventEmitter{

    constructor() {
        super()
        this.speed = 2.1;
        this.heading = 17;
        this.depth = 19.9;
        this.lat = "";
        this.long = "";
    }

    getHeading(){
        var conv = this.heading.toString();
        if(conv.length == 1){
            return "00" + conv;
        }else if(conv.length == 2){
            return "0" + conv;
        }
        return conv;
    }
}