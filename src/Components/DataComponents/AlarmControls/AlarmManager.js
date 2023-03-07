import {EventEmitter} from 'events'
import { CurrentActiveEngine } from '../../../App';
import AlarmDetail from './Alarm';

export const AlarmStatus = {
    Active: 'Active',
    Acknowledged: 'Acknowledged',
    Inactive: 'Inactive'
};

export default class AlarmManager extends EventEmitter{

    constructor(socket) {
        super()
        this.redAlarm = [];
        this.greyAlarm = [];

        this.pumpRawWaterFlowEngine = [false, false]; 
        this.pumpFuelOilFlow = [false, false]; 
        this.pumpLubOilFlow = [false, false]; 
        this.pumpBilgeEngineRoom = [false, false]; 
        this.loadPanelSwitch = [false, false]; 
        this.lightingPanel = [false, false]; 
        this.battreyFault = [false, false]; 

        this.engineOverspeed = [false, false]; 
        this.lubricatingOilPressureLow = [false, false]; 
        this.lubricatingOilTemperatureHigh = [false, false]; 
        this.fuelOilPressureFlow = [false, false]; 
        this.fuelOilLeakageFromHighPressurePipes = [false, false]; 
        this.coolingWaterPressureLow = [false, false]; 
        this.coolingWaterTemperatureHigh = [false, false]; 

        this.ME_OverspeedShutdown = AlarmStatus.Inactive;
        this.ME_CoolingWaterHighTemperature = AlarmStatus.Inactive;
        this.ME_StartFailure = AlarmStatus.Inactive;
        this.ME_StopFailure = AlarmStatus.Inactive;
        this.ME_LubOilPressureLow = AlarmStatus.Inactive;
        this.ME_LubOilTemperatureHigh = AlarmStatus.Inactive;
        this.lubOilFilterDiffrentialPressureHigh = AlarmStatus.Inactive;
        this.lubOilSumpTankLevelLow = AlarmStatus.Inactive;
        this.lubOilSumpTankHighLevel = AlarmStatus.Inactive;
        this.lubOilGearTempHigh = AlarmStatus.Inactive;
        this.lubOilGearPressureLow = AlarmStatus.Inactive;
        this.SpeedGovernorFail = AlarmStatus.Inactive;
        this.RemoteControlFail = AlarmStatus.Inactive;
        this.VoltageFuseFail = AlarmStatus.Inactive;
        this.ME_FuelPumpFail = AlarmStatus.Inactive;
        this.ME_CoolingWaterTemperatureHigh = AlarmStatus.Inactive;
        this.ME_CoolingWaterPressureLow = AlarmStatus.Inactive;
        this.ME_FuelOilInjectPressureLow = AlarmStatus.Inactive;

        this.AE_CoolingWaterTempHigh = AlarmStatus.Inactive;
        this.AE_CoolingWaterPressureLow = AlarmStatus.Inactive;
        this.AE_FuelOilPressureLow = AlarmStatus.Inactive;
        this.AE_Overspeed = AlarmStatus.Inactive;
        this.AE_LubOilTemperatureHigh = AlarmStatus.Inactive;
        this.AE_LubOilPressureLow = AlarmStatus.Inactive;
        this.AE_FuelOilLeakage = AlarmStatus.Inactive;

        this.fullLeakageInspPipe = AlarmStatus.Inactive;

        this.alarmSound = AlarmStatus.Inactive;

        this.ME_InterimCondition = false;
        this.lastMassage = ''
        this.socket = socket;
        this.alarmSoundCond = [0, 0, 0, 0]

        this.setMaxListeners(40);
    }

    updateDigitalCommand(pumpRawWaterFlowEngine, pumpFuelOilFlow, pumpLubOilFlow, pumpBilgeEngineRoom, loadPanelSwitch, lightingPanel, battreyFault, activeEngine ){
        if(this.battreyFault[0] == true && (battreyFault == 1) && this.ME_InterimCondition && this.engineOverspeed[0]){
            // console.log("Yes interim VoltageFuseFail")
            this.alarm_ON('Main Engine', 'VoltageFuseFail', 'Voltage / Fuse Fail');
        }
        if(this.pumpFuelOilFlow[0] == true && (pumpFuelOilFlow == 1) && this.ME_InterimCondition && this.engineOverspeed[0]){
            // console.log("Yes interim ME_FuelOilInjectPressureLow")
            this.alarm_ON('Main Engine', 'ME_FuelOilInjectPressureLow', 'ME Fuel Oil Inject Pressure Low')
        }
        var index = 0;
        if(activeEngine == CurrentActiveEngine.AuxEngine) index = 1;
        this.pumpRawWaterFlowEngine[index] = (pumpRawWaterFlowEngine == 0); 
        this.pumpFuelOilFlow[index] = (pumpFuelOilFlow == 0); 
        this.pumpLubOilFlow[index] = (pumpLubOilFlow == 0); 
        this.pumpBilgeEngineRoom[index] = (pumpBilgeEngineRoom == 0); 
        this.loadPanelSwitch[index] = (loadPanelSwitch == 0); 
        this.lightingPanel[index] = (lightingPanel == 0); 
        this.battreyFault[index] = (battreyFault == 0); 
    }

    updateSafetyCommand(engineOverspeed, lubricatingOilPressureLow, lubricatingOilTemperatureHigh, fuelOilPressureFlow, coolingWaterPressureLow, coolingWaterTemperatureHigh, fuelOilLeakageFromHighPressurePipes, activeEngine ){
        var index = 0;
        if(activeEngine == CurrentActiveEngine.AuxEngine) index = 1;
        this.engineOverspeed[index] = (engineOverspeed == 1); 
        this.lubricatingOilPressureLow[index] = (lubricatingOilPressureLow == 1); 
        this.lubricatingOilTemperatureHigh[index] = (lubricatingOilTemperatureHigh == 1); 
        this.fuelOilPressureFlow[index] = (fuelOilPressureFlow == 1); 
        this.fuelOilLeakageFromHighPressurePipes[index] = (fuelOilLeakageFromHighPressurePipes == 1); 
        this.coolingWaterPressureLow[index] = (coolingWaterPressureLow == 1); 
        this.coolingWaterTemperatureHigh[index] = (coolingWaterTemperatureHigh == 1); 
    }

    acknowledgeAlarm(command, source) {
        var targets = this.redAlarm.filter(alarm => (alarm.command == command && alarm.source == source));
        if(targets == 0) return;
        this.redAlarm = this.redAlarm.filter(alarm => !(alarm.command == command && alarm.source == source));
        targets.forEach((newAlarm) => {
            newAlarm.status = AlarmStatus.Acknowledged;
            this.greyAlarm.push(newAlarm);
            console.log("Acknowledge alarm ", source)
            this.changeAlarmStatus(command, AlarmStatus.Acknowledged, source)
            this.emit('Deactivate Header', newAlarm.desc)
        })
        this.emit('Alarm', new AlarmDetail(command, targets[0].desc, source, AlarmStatus.Acknowledged));
        // this.deactivateAlarm();
    }

    changeAlarmStatus(command, target, source){
        // console.log('changed', command, source, 'to', target)
        switch (command) {
            case 'ME_OverspeedShutdown':
                this.ME_OverspeedShutdown = target;
                break;
            case 'ME_CoolingWaterHighTemperature':
                this.ME_CoolingWaterHighTemperature = target;
                break;
            case 'ME_StartFailure':
                this.ME_StartFailure = target;
                break;
            case 'ME_StopFailure':
                this.ME_StopFailure = target;
                break;
            case 'ME_LubOilPressureLow':
                this.ME_LubOilPressureLow = target;
                break;
            case 'ME_LubOilTemperatureHigh':
                this.ME_LubOilTemperatureHigh = target;
                break;
            case 'LubOilFilterDiffrentialPressureHigh':
                this.lubOilFilterDiffrentialPressureHigh = target;
                break;
            case 'LubOilSumpTankLevelLow':
                this.lubOilSumpTankLevelLow = target;
                break;
            case 'LubOilSumpTankHighLevel':
                this.lubOilSumpTankHighLevel = target;
                break;
            case 'LubOilGearTempHigh':
                this.lubOilGearTempHigh = target;
                break;
            case 'LubOilGearPressureLow':
                this.lubOilGearPressureLow = target;
                break;
            case 'SpeedGovernorFail':
                this.SpeedGovernorFail = target;
                break;
            case 'RemoteControlFail':
                this.RemoteControlFail = target;
                break;
            case 'VoltageFuseFail':
                this.VoltageFuseFail = target;
                break;
            case 'ME_FuelPumpFail':
                this.ME_FuelPumpFail = target;
                break;
            case 'ME_CoolingWaterPressureLow':
                this.ME_CoolingWaterPressureLow = target;   
                break; 
            case 'ME_FuelOilInjectPressureLow':
                this.ME_FuelOilInjectPressureLow = target;  
                break;  
            case 'AE_CoolingWaterTempHigh':
                this.AE_CoolingWaterTempHigh = target;
                break;
            case 'AE_CoolingWaterPressureLow':
                this.AE_CoolingWaterPressureLow = target;
                break;
            case 'AE_FuelOilPressureLow':
                this.AE_FuelOilPressureLow = target;
                break;
            case 'AE_Overspeed':
                this.AE_Overspeed = target;
                break;
            case 'AE_LubOilTemperatureHigh':
                this.AE_LubOilTemperatureHigh = target;
                break;
            case 'AE_LubOilPressureLow':
                this.AE_LubOilPressureLow = target;
                break;
            case 'AE_FuelOilLeakage':
                this.AE_FuelOilLeakage = target;
                break;
            default:
                break;
        }
    }

    checkAlarmStatus(command, target){
        switch (command) {
            case 'ME_OverspeedShutdown':
                return this.ME_OverspeedShutdown == target;
            case 'ME_CoolingWaterHighTemperature':
                return this.ME_CoolingWaterHighTemperature == target;
            case 'ME_StartFailure':
                return this.ME_StartFailure == target;
            case 'ME_StopFailure':
                return this.ME_StopFailure == target;
            case 'ME_LubOilPressureLow':
                return this.ME_LubOilPressureLow == target;
            case 'ME_LubOilTemperatureHigh':
                return this.ME_LubOilTemperatureHigh == target;
            case 'LubOilFilterDiffrentialPressureHigh':
                return this.lubOilFilterDiffrentialPressureHigh == target;
            case 'LubOilSumpTankLevelLow':
                return this.lubOilSumpTankLevelLow == target;
            case 'LubOilSumpTankHighLevel':
                return this.lubOilSumpTankHighLevel == target;
            case 'LubOilGearTempHigh':
                return this.lubOilGearTempHigh == target;
            case 'LubOilGearPressureLow':
                return this.lubOilGearPressureLow == target;
            case 'SpeedGovernorFail':
                return this.SpeedGovernorFail == target;
            case 'RemoteControlFail':
                return this.RemoteControlFail == target;
            case 'VoltageFuseFail':
                return this.VoltageFuseFail == target;
            case 'ME_FuelPumpFail':
                return this.ME_FuelPumpFail == target;
            case 'ME_CoolingWaterPressureLow':
                return this.ME_CoolingWaterPressureLow == target;    
            case 'ME_FuelOilInjectPressureLow':
                return this.ME_FuelOilInjectPressureLow == target;    
            case 'AE_CoolingWaterTempHigh':
                return this.AE_CoolingWaterTempHigh == target;
            case 'AE_CoolingWaterPressureLow':
                return this.AE_CoolingWaterPressureLow == target;
            case 'AE_FuelOilPressureLow':
                return this.AE_FuelOilPressureLow == target;
            case 'AE_Overspeed':
                return this.AE_Overspeed == target;
            case 'AE_LubOilTemperatureHigh':
                return this.AE_LubOilTemperatureHigh == target;
            case 'AE_LubOilPressureLow':
                return this.AE_LubOilPressureLow == target;
            case 'AE_FuelOilLeakage':
                return this.AE_FuelOilLeakage == target;
            default:
                console.log('OUTLAWWW!!!')
                return false;
        }
    }

    checkActive(command){
        switch (command) {
            case 'ME_OverspeedShutdown':
                return this.ME_OverspeedShutdown;
            case 'ME_CoolingWaterHighTemperature':
                return this.ME_CoolingWaterHighTemperature;
            case 'ME_StartFailure':
                return this.ME_StartFailure;
            case 'ME_StopFailure':
                return this.ME_StopFailure;
            case 'ME_LubOilPressureLow':
                return this.ME_LubOilPressureLow;
            case 'ME_LubOilTemperatureHigh':
                return this.ME_LubOilTemperatureHigh;
            case 'LubOilFilterDiffrentialPressureHigh':
                return this.lubOilFilterDiffrentialPressureHigh;
            case 'LubOilSumpTankLevelLow':
                return this.lubOilSumpTankLevelLow;
            case 'LubOilSumpTankHighLevel':
                return this.lubOilSumpTankHighLevel;
            case 'LubOilGearTempHigh':
                return this.lubOilGearTempHigh;
            case 'LubOilGearPressureLow':
                return this.lubOilGearPressureLow;
            case 'SpeedGovernorFail':
                return this.SpeedGovernorFail;
            case 'RemoteControlFail':
                return this.RemoteControlFail;
            case 'VoltageFuseFail':
                return this.VoltageFuseFail;
            case 'ME_FuelPumpFail':
                return this.ME_FuelPumpFail;
            case 'ME_CoolingWaterPressureLow':
                return this.ME_CoolingWaterPressureLow;    
            case 'ME_FuelOilInjectPressureLow':
                return this.ME_FuelOilInjectPressureLow;    
            case 'AE_CoolingWaterTempHigh':
                return this.AE_CoolingWaterTempHigh;
            case 'AE_CoolingWaterPressureLow':
                return this.AE_CoolingWaterPressureLow;
            case 'AE_FuelOilPressureLow':
                return this.AE_FuelOilPressureLow;
            case 'AE_Overspeed':
                return this.AE_Overspeed;
            case 'AE_LubOilTemperatureHigh':
                return this.AE_LubOilTemperatureHigh;
            case 'AE_LubOilPressureLow':
                return this.AE_LubOilPressureLow;
            case 'AE_FuelOilLeakage':
                return this.AE_FuelOilLeakage;
            default:
                break;
        }
        return false;
    }

    checkME_RPM_AlarmActive(){
        return (
            this.checkAlarmStatus('ME_OverspeedShutdown', AlarmStatus.Active) ||
            this.checkAlarmStatus('ME_StartFailure', AlarmStatus.Active) ||
            this.checkAlarmStatus('ME_LubOilPressureLow', AlarmStatus.Active) ||
            this.checkAlarmStatus('LubOilGearTempHigh', AlarmStatus.Active) ||
            this.checkAlarmStatus('LubOilGearPressureLow', AlarmStatus.Active) ||
            this.checkAlarmStatus('SpeedGovernorFail', AlarmStatus.Active) ||
            this.checkAlarmStatus('RemoteControlFail', AlarmStatus.Active) ||
            this.checkAlarmStatus('VoltageFuseFail', AlarmStatus.Active) ||
            this.checkAlarmStatus('ME_FuelPumpFail', AlarmStatus.Active) ||
            this.checkAlarmStatus('LubOilFilterDiffrentialPressureHigh', AlarmStatus.Active) ||
            this.checkAlarmStatus('LubOilSumpTankHighLevel', AlarmStatus.Active) ||
            this.checkAlarmStatus('ME_FuelOilInjectPressureLow', AlarmStatus.Active) 
            )
    }

    checkLubOilAlarmActive(){
        return(
            this.checkAlarmStatus('ME_LubOilTemperatureHigh', AlarmStatus.Active) ||
            this.checkAlarmStatus('LubOilFilterDiffrentialPressureHigh', AlarmStatus.Active) ||
            this.checkAlarmStatus('LubOilSumpTankLevelLow', AlarmStatus.Active) ||
            this.checkAlarmStatus('LubOilSumpTankHighLevel', AlarmStatus.Active) 
        )
    }

    checkCoolantAlarmActive(){
        return(
            this.checkAlarmStatus('ME_CoolingWaterHighTemperature', AlarmStatus.Active) ||
            this.checkAlarmStatus('ME_StopFailure', AlarmStatus.Active) ||
            this.checkAlarmStatus('ME_CoolingWaterPressureLow', AlarmStatus.Active) 
        )
    }

    checkAE_EngineAlarmActive(){
        return(
            this.checkAlarmStatus('AE_FuelOilPressureLow', AlarmStatus.Active) ||
            this.checkAlarmStatus('AE_Overspeed', AlarmStatus.Active) 
        )
    }

    checkLoadGensetAlarmActive(){
        return(
            this.checkAlarmStatus('AE_CoolingWaterTempHigh', AlarmStatus.Active) ||
            this.checkAlarmStatus('AE_CoolingWaterPressureLow', AlarmStatus.Active) ||
            this.checkAlarmStatus('AE_LubOilTemperatureHigh', AlarmStatus.Active) ||
            this.checkAlarmStatus('AE_LubOilPressureLow', AlarmStatus.Active) ||
            this.checkAlarmStatus('AE_FuelOilLeakage', AlarmStatus.Active) 
        )
    }

    checkAnyAlarmActive(){
        return(
            this.checkAlarmStatus('ME_OverspeedShutdown', AlarmStatus.Active) ||
            this.checkAlarmStatus('ME_CoolingWaterHighTemperature', AlarmStatus.Active) ||
            this.checkAlarmStatus('ME_StartFailure', AlarmStatus.Active) ||
            this.checkAlarmStatus('ME_StopFailure', AlarmStatus.Active) ||
            this.checkAlarmStatus('ME_LubOilPressureLow', AlarmStatus.Active) ||
            this.checkAlarmStatus('ME_LubOilTemperatureHigh', AlarmStatus.Active) ||
            this.checkAlarmStatus('LubOilFilterDiffrentialPressureHigh', AlarmStatus.Active) ||
            this.checkAlarmStatus('LubOilSumpTankLevelLow', AlarmStatus.Active) ||
            this.checkAlarmStatus('LubOilSumpTankHighLevel', AlarmStatus.Active) ||
            this.checkAlarmStatus('LubOilGearTempHigh', AlarmStatus.Active) ||
            this.checkAlarmStatus('LubOilGearPressureLow', AlarmStatus.Active) ||
            this.checkAlarmStatus('SpeedGovernorFail', AlarmStatus.Active) ||
            this.checkAlarmStatus('RemoteControlFail', AlarmStatus.Active) ||
            this.checkAlarmStatus('VoltageFuseFail', AlarmStatus.Active) ||
            this.checkAlarmStatus('ME_FuelPumpFail', AlarmStatus.Active) ||
            this.checkAlarmStatus('ME_CoolingWaterPressureLow', AlarmStatus.Active) ||
            this.checkAlarmStatus('ME_FuelOilInjectPressureLow', AlarmStatus.Active) ||
            this.checkAlarmStatus('AE_CoolingWaterTempHigh', AlarmStatus.Active) ||
            this.checkAlarmStatus('AE_CoolingWaterPressureLow', AlarmStatus.Active) ||
            this.checkAlarmStatus('AE_FuelOilPressureLow', AlarmStatus.Active) ||
            this.checkAlarmStatus('AE_Overspeed', AlarmStatus.Active) ||
            this.checkAlarmStatus('AE_LubOilPressureLow', AlarmStatus.Active) ||
            this.checkAlarmStatus('AE_LubOilTemperatureHigh', AlarmStatus.Active) ||
            this.checkAlarmStatus('AE_FuelOilLeakage', AlarmStatus.Active) 
        )
    }

    checkAvaliableInAlarmSummary(source, command){
        let list = this.greyAlarm.concat(this.redAlarm)
        let target = list.filter(alarm => alarm.command == command && alarm.source == source);
        return target.length == 0;
    }

    alarm_ON(source, command, desc) {
        // console.log("Checking", source, desc)
        if(this.checkAlarmStatus(command, AlarmStatus.Inactive)){
            // console.log("Emit ", desc);
            let newAlarm = new AlarmDetail(command, desc, source, AlarmStatus.Active)
            console.log("alarm ON ", command)
            // console.log(newAlarm)
            this.changeAlarmStatus(command, AlarmStatus.Active, source);
            if(this.checkAvaliableInAlarmSummary(source, command)){
                this.redAlarm.push(newAlarm);
            }
            this.lastMassage = desc
            this.emit('Alarm', newAlarm);
        }
        // this.activateAlarm();
    }

    alarm_OFF(source, command, desc) {
        if(this.checkAlarmStatus(command, AlarmStatus.Acknowledged)){
            // console.log('Emit low off')
            console.log("alarm off", command);
            this.changeAlarmStatus(command, AlarmStatus.Inactive, source)
            this.greyAlarm.forEach(() => {
                this.greyAlarm = this.greyAlarm.filter(alarm => !(alarm.command == command && alarm.source == source));
            });
            this.emit('Alarm', new AlarmDetail(command, desc, source, AlarmStatus.Inactive));
            // this.deactivateAlarm();
        }
    }

    checkAlarmSoundCondForDeactivate(){
        return (this.alarmSoundCond[0] == 0 && 
                this.alarmSoundCond[1] == 0 && 
                this.alarmSoundCond[2] == 0 &&
                this.alarmSoundCond[3] == 0);
    }

    //0 Lub oil pressure
    //1 CW temp high
    //2 ME Overspeed
    //3 AE Overspeed
    activateAlarm(target){
        this.alarmSoundCond[target] = 1;
        if(this.alarmSound == AlarmStatus.Inactive){
            this.socket.emit('activateAlarm')
            this.alarmSound = AlarmStatus.Active;
        }
    }

    deactivateAlarm(target){
        this.alarmSoundCond[target] = 0;
        if(this.alarmSound == AlarmStatus.Active && checkAlarmSoundCondForDeactivate()){
            this.socket.emit('deactivateAlarm');
            this.alarmSound = AlarmStatus.Inactive
        }
    }

    
}