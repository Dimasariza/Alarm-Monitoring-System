import {EventEmitter} from 'events'

export default class AlarmManager extends EventEmitter{

    constructor() {
        super()
        this.redAlarm = {};
        this.greyAlarm = {};
        this.engineRev = 2000;
        this.shaftRev = 2000;
        this.lubOilPressure = 0.5;
        this.boostPressure = 0.3;
        this.coolingWaterTemp = 120;
        this.exhaustTemp = 700;
        this.runningHour = 10000;
        this.battreyVolt = 30;
        this.battreyLife = 100;
    }
}