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
        this.redAlarm = [];
        this.greyAlarm = [];

        this.activeHighPressLubOil = true;
        this.activeLowPressLubOil = true;
        this.activeLowPressureBoost = true;
        this.activeHighTempWC = true;
        this.activeLowTempWC = true;
        this.activeFullLeakageInspPipe = true;
        this.activeBattreyFault = true; 

        this.ME_highPressLubOil = AlarmStatus.Inactive;
        this.ME_lowPressLubOil = AlarmStatus.Inactive;
        this.ME_lowPressureBoost = AlarmStatus.Inactive;
        this.ME_highTempWC = AlarmStatus.Inactive;
        this.ME_lowTempWC = AlarmStatus.Inactive;

        this.AE_highPressLubOil = AlarmStatus.Inactive;
        this.AE_lowPressLubOil = AlarmStatus.Inactive;
        this.AE_lowPressureBoost = AlarmStatus.Inactive;
        this.AE_highTempWC = AlarmStatus.Inactive;
        this.AE_lowTempWC = AlarmStatus.Inactive;

        this.fullLeakageInspPipe = AlarmStatus.Inactive;
        this.battreyFault = AlarmStatus.Inactive; 

        this.setMaxListeners(40);
    }

    updateAlarmCommand(activeHighPressLubOil, activeLowPressLubOil, activeLowPressureBoost, activeHighTempWC, activeLowTempWC, activeFullLeakageInspPipe, activeBattreyFault ){
        this.activeHighPressLubOil = activeHighPressLubOil;
        this.activeLowPressLubOil = activeLowPressLubOil;
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
            // console.log("Acknowledge alarm")
            this.changeAlarmStatus(command, AlarmStatus.Acknowledged, source)
        })

    }

    changeAlarmStatus(command, target, source){
        // console.log('changed', command, source, 'to', target)
        switch (command) {
            case 'highPressureLubOil':
                if(source =='Main Engine'){
                    this.ME_highPressLubOil = target;
                }else{
                    this.AE_highPressLubOil = target;
                }
                break;
            case 'lowPressureLubOil':
                if(source =='Main Engine'){
                    this.ME_lowPressLubOil = target;
                }else{
                    this.AE_lowPressLubOil = target;
                }
                break;
            case 'lowPressureBoost':
                if(source =='Main Engine'){
                    this.ME_lowPressureBoost = target;
                }else{
                    this.AE_lowPressureBoost = target;
                }
                break;
            case 'highTempWC':
                if(source =='Main Engine'){
                    this.ME_highTempWC = target;
                }else{
                    this.AE_highTempWC = target;
                }
                break;
            case 'lowTempWC':
                if(source =='Main Engine'){
                    this.ME_lowTempWC = target;
                }else{
                    this.AE_lowTempWC = target;
                }
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
        if(target == AlarmStatus.Acknowledged){
            this.emit('Alarm', new AlarmDetail(command, 'Acknowledged', source, target));
        }
    }

    checkAlarmStatus(command, target, source){
        switch (command) {
            case 'highPressureLubOil':
                if(source =='Main Engine'){
                    return this.ME_highPressLubOil == target;
                }else{
                    return this.AE_highPressLubOil == target;
                }
            case 'lowPressureLubOil':
                if(source =='Main Engine'){
                    return this.ME_lowPressLubOil == target;
                }else{
                    return this.AE_lowPressLubOil == target;
                }
            case 'lowPressureBoost':
                if(source =='Main Engine'){
                    return this.ME_lowPressureBoost == target;
                }else{
                    return this.AE_lowPressureBoost == target;
                }
                break;
            case 'highTempWC':
                if(source =='Main Engine'){
                    return this.ME_highTempWC == target;
                }else{
                    return this.AE_highTempWC == target;
                }
            case 'lowTempWC':
                if(source =='Main Engine'){
                    return this.ME_lowTempWC == target;
                }else{
                    return this.AE_lowTempWC == target;
                }
            case 'fullLeakageInspPipe':
                return this.fullLeakageInspPipe == target;
            case 'battreyFault':
                return this.battreyFault = target;
            default:
                console.log('OUTLAWWW!!!')
                return false;
        }
    }

    checkActive(command){
        switch (command) {
            case 'highPressureLubOil':
                return this.activeHighPressLubOil;
            case 'lowPressureLubOil':
                return this.activeLowPressLubOil;
            case 'lowPressureBoost':
                return this.activeLowPressureBoost;
            case 'highTempWC':
                return this.activeHighTempWC;
            case 'lowTempWC':
                return this.activeLowTempWC;
            case 'fullLeakageInspPipe':
                return this.activeFullLeakageInspPipe;
            case 'battreyFault':
                return this.activeBattreyFault;
            default:
                break;
        }
        return false;
    }

    checkAvaliableInAlarmSummary(source, command){
        let list = this.greyAlarm.concat(this.redAlarm)
        let target = list.filter(alarm => alarm.command == command && alarm.source == source);
        return target.length == 0;
    }

    alarm_ON(source, command, desc) {
        if(!this.checkActive(command)) return;
        if(this.checkAlarmStatus(command, AlarmStatus.Inactive, source)){
            // console.log("Emit ", desc);
            let newAlarm = new AlarmDetail(command, desc, source, AlarmStatus.Active)
            // console.log("alarm ON")
            this.changeAlarmStatus(command, AlarmStatus.Active, source);
            if(this.checkAvaliableInAlarmSummary(source, command)){
                this.redAlarm.push(newAlarm);
            }
            this.emit('Alarm', newAlarm);
        }
    }

    alarm_OFF(source, command, desc) {
        // if(source=='Aux Engine') console.log("Target Aux", command, AlarmStatus.Acknowledged, "result", this.AE_lowPressLubOil)
        // if(source == 'Main Engine') console.log("Target Main", command, AlarmStatus.Acknowledged, "result", this.ME_lowPressLubOil)
        if(this.checkAlarmStatus(command, AlarmStatus.Acknowledged, source)){
            // console.log('Emit low off')
            // console.log("alarm off");
            this.changeAlarmStatus(command, AlarmStatus.Inactive, source)
            this.greyAlarm.forEach(() => {
                this.greyAlarm = this.greyAlarm.filter(alarm => !(alarm.command == command && alarm.source == source));
            });
            this.emit('Alarm', new AlarmDetail(command, desc, source, AlarmStatus.Inactive));
        }
    }

    
}