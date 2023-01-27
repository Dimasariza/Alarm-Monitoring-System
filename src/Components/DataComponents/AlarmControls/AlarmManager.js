import {EventEmitter} from 'events'
import Alarm from './Alarm';

export const AlarmStatus = {
    Active: 'Active',
    Acknowledged: 'Acknowledged',
    Inactive: 'Inactive'
};

export default class AlarmManager extends EventEmitter{

    constructor() {
        super()
        this.redAlarm = [];
        this.greyAlarm = [];
        
        this.activeHighTempLubOil = false;
        this.activeLowTempLubOil = false;
        this.activeLowPressureBoost = false;
        this.activeHighTempWC = false;
        this.activeLowTempWC = false;
        this.activeFullLeakageInspPipe = false;
        this.activeBattreyFault = false; 

        this.highTempLubOil = AlarmStatus.Inactive;
        this.lowTempLubOil = AlarmStatus.Inactive;
        this.lowPressureBoost = AlarmStatus.Inactive;
        this.highTempWC = AlarmStatus.Inactive;
        this.lowTempWC = AlarmStatus.Inactive;
        this.fullLeakageInspPipe = AlarmStatus.Inactive;
        this.battreyFault = AlarmStatus.Inactive; 
    }

    acknowledgeAlarm(command, source) {
        var targets = this.redAlarm.filter(alarm => (alarm.command == command && alarm.source == source));
        if(targets == 0) return;
        this.redAlarm = this.redAlarm.filter(alarm => !(alarm.command == command && alarm.source == source));
        targets.forEach((newAlarm) => {
            newAlarm.acknowledge = true;
            this.greyAlarm.push(newAlarm);
        })
    }

    changeAlarmStatus(command, target){
        switch (command) {
            case 'highTempLubOil':
                this.highTempLubOil = target;
                break;
            case 'lowTempLubOil':
                this.lowTempLubOil = target;
                break;
            case 'lowPressureBoost':
                this.lowPressureBoost = target;
                break;
            case 'highTempWC':
                this.highTempWC = target;
                break;
            case 'lowTempWC':
                this.lowTempWC = target;
                break;
            case 'fullLeakageInspPipe':
                this.fullLeakageInspPipe = target;
                break;
            case 'battreyFault':
                this.battreyFault = target;
                break;
            default:
                break;
        }
    }

    highTempLubOil_ON(source) {
        if(!this.activeHighTempLubOil) return;
        this.emit('Alarm', new Alarm('highTempLubOil', 'Lub. Oil High Temp.', source));
        this.highTempLubOil = true;
    }

    highTempLubOil_OFF(source) {
        // if(!this.activeHighTempLubOil) return;
        this.emit('Alarm', new Alarm('highTempLubOil', 'Lub. Oil High Temp.', source));
        this.highTempLubOil = true;
        this.greyAlarm.forEach((alarm) => {
            console.log(alarm);
        });
    }

    
}