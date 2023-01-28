import {EventEmitter} from 'events'
import AlarmDetail from './Alarm';

export const AlarmStatus = {
    Active: 'Active',
    Acknowledged: 'Acknowledged',
    Inactive: 'Inactive'
};

export default class AlarmManager extends EventEmitter{

    constructor() {
        super()
        // this.redAlarm = [new AlarmDetail('Air Compress Pressure Low', 'Air Compress Pressure Low', "Main Engine", AlarmStatus.Active), new AlarmDetail('DUMMY2', 'DUMMY2', "Main Engine", AlarmStatus.Active)];
        // this.greyAlarm = [new AlarmDetail('DUMMY3', 'DUMMY3', "Main Engine", AlarmStatus.Acknowledged)];
        
        this.redAlarm = [];
        this.greyAlarm = [];

        this.activeHighTempLubOil = true;
        this.activeLowTempLubOil = true;
        this.activeLowPressureBoost = true;
        this.activeHighTempWC = true;
        this.activeLowTempWC = true;
        this.activeFullLeakageInspPipe = true;
        this.activeBattreyFault = true; 

        this.highTempLubOil = AlarmStatus.Inactive;
        this.lowTempLubOil = AlarmStatus.Inactive;
        this.lowPressureBoost = AlarmStatus.Inactive;
        this.highTempWC = AlarmStatus.Inactive;
        this.lowTempWC = AlarmStatus.Inactive;
        this.fullLeakageInspPipe = AlarmStatus.Inactive;
        this.battreyFault = AlarmStatus.Inactive; 
    }

    updateAlarmCommand(activeHighTempLubOil, activeLowTempLubOil, activeLowPressureBoost, activeHighTempWC, activeLowTempWC, activeFullLeakageInspPipe, activeBattreyFault ){
        this.activeHighTempLubOil = activeHighTempLubOil;
        this.activeLowTempLubOil = activeLowTempLubOil;
        this.activeLowPressureBoost = activeLowPressureBoost;
        this.activeHighTempWC = activeHighTempWC;
        this.activeLowTempWC = activeLowTempWC;
        this.activeFullLeakageInspPipe = activeFullLeakageInspPipe;
        this.activeBattreyFault = activeBattreyFault; 
    }

    acknowledgeAlarm(command, source) {
        var targets = this.redAlarm.filter(alarm => (alarm.command == command && alarm.source == source));
        if(targets == 0) return;
        this.redAlarm = this.redAlarm.filter(alarm => !(alarm.command == command && alarm.source == source));
        targets.forEach((newAlarm) => {
            newAlarm.status = AlarmStatus.Acknowledged;
            this.greyAlarm.push(newAlarm);
            this.changeAlarmStatus(command, AlarmStatus.Acknowledged, source)
        })
    }

    changeAlarmStatus(command, target, source){
        switch (command) {
            case 'highTempLubOil':
                this.highTempLubOil = target;
                break;
            case 'lowTempLubOil':
                this.lowTempLubOil = target;
                break;
            case 'lowPressureBoost':
                this.lowPressureBoost = target;
                this.emit('Alarm', new AlarmDetail('lowPressureBoost', 'Acknowledged', source, target));
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
        this.emit('Alarm', new AlarmDetail('highTempLubOil', 'Lub. Oil High Temp.', source, AlarmStatus.Active));
        this.highTempLubOil = AlarmStatus.Active;
    }

    highTempLubOil_OFF(source) {
        // if(!this.activeHighTempLubOil) return;
        // this.emit('Alarm', new Alarm('highTempLubOil', 'Lub. Oil High Temp.', source));
        this.highTempLubOil = true;
        this.greyAlarm.forEach((alarm) => {
            console.log(alarm);
        });
    }

    lowPressureBoost_ON(source) {
        if(!this.activeLowPressureBoost) return;
        if(this.lowPressureBoost == AlarmStatus.Inactive){
            console.log("Emit alarm pressure boost");
            let newAlarm = new AlarmDetail('lowPressureBoost', 'Low Boost Pressure', source, AlarmStatus.Active)
            this.lowPressureBoost = AlarmStatus.Active;
            this.redAlarm.push(newAlarm);
            // console.log(this.redAlarm);
            this.emit('Alarm', newAlarm);
        }
    }

    lowPressureBoost_OFF(source) {
        if(this.lowPressureBoost == AlarmStatus.Acknowledged){
            console.log('Emit low off')
            this.lowPressureBoost = AlarmStatus.Inactive;
            this.greyAlarm.forEach(() => {
                this.greyAlarm = this.greyAlarm.filter(alarm => !(alarm.command == 'lowPressureBoost' && alarm.source == source));
            });
            this.emit('Alarm', new AlarmDetail('lowPressureBoost', 'Low Boost Pressure', source, AlarmStatus.Inactive));
        }
    }

    
}