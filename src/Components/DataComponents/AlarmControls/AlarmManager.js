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

        this.pumpRawWaterFlowEngine = false; 
        this.pumpFuelOilFlow = false; 
        this.pumpLubOilFlow = false; 
        this.pumpBilgeEngineRoom = false; 
        this.loadPanelSwitch = false; 
        this.lightingPanel = false; 
        this.battreyFault = false; 

        this.engineOverspeed = false; 
        this.lubricatingOilPressureLow = false; 
        this.lubricatingOilTemperatureHigh = false; 
        this.fuelOilPressureFlow = false; 
        this.fuelOilLeakageFromHighPressurePipes = false; 
        this.coolingWaterPressureLow = false; 
        this.coolingWaterTemperatureHigh = false; 

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
        this.AE_FuelOilTemperatureHigh = AlarmStatus.Inactive;
        this.AE_Overspeed = AlarmStatus.Inactive;
        this.AE_LubOilTemperatureHigh = AlarmStatus.Inactive;
        this.AE_LubOilPressureLow = AlarmStatus.Inactive;
        this.AE_FuelOilLeakage = AlarmStatus.Inactive;

        this.fullLeakageInspPipe = AlarmStatus.Inactive;
        this.battreyFault = AlarmStatus.Inactive; 

        this.ME_InterimCondition = false;
        this.lastMassage = ''

        this.setMaxListeners(40);
    }

    updateDigitalCommand(pumpRawWaterFlowEngine, pumpFuelOilFlow, pumpLubOilFlow, pumpBilgeEngineRoom, loadPanelSwitch, lightingPanel, battreyFault ){
        if(this.battreyFault == true && battreyFault == false && this.ME_InterimCondition){
            this.alarm_ON('Main Engine', 'VoltageFuseFail', 'Voltage / Fuse Fail');
        }
        if(this.pumpFuelOilFlow == true && pumpFuelOilFlow == false && this.ME_InterimCondition){
            this.alarm_ON('Main Engine', 'MEFuelOilInjectPressureLow', 'ME Fuel Oil Inject Pressure Low')
        }
        this.pumpRawWaterFlowEngine = pumpRawWaterFlowEngine; 
        this.pumpFuelOilFlow = pumpFuelOilFlow; 
        this.pumpLubOilFlow = pumpLubOilFlow; 
        this.pumpBilgeEngineRoom = pumpBilgeEngineRoom; 
        this.loadPanelSwitch = loadPanelSwitch; 
        this.lightingPanel = lightingPanel; 
        this.battreyFault = battreyFault; 
    }

    updateSafetyCommand(engineOverspeed, lubricatingOilPressureLow, lubricatingOilTemperatureHigh, fuelOilPressureFlow, fuelOilLeakageFromHighPressurePipes, coolingWaterPressureLow, coolingWaterTemperatureHigh ){
        this.engineOverspeed = engineOverspeed; 
        this.lubricatingOilPressureLow = lubricatingOilPressureLow; 
        this.lubricatingOilTemperatureHigh = lubricatingOilTemperatureHigh; 
        this.fuelOilPressureFlow = fuelOilPressureFlow; 
        this.fuelOilLeakageFromHighPressurePipes = fuelOilLeakageFromHighPressurePipes; 
        this.coolingWaterPressureLow = coolingWaterPressureLow; 
        this.coolingWaterTemperatureHigh = coolingWaterTemperatureHigh; 
    }

    acknowledgeAlarm(command, source) {
        // console.log(command, source)
        var targets = this.redAlarm.filter(alarm => (alarm.command == command && alarm.source == source));
        // console.log(targets)
        if(targets == 0) return;
        this.redAlarm = this.redAlarm.filter(alarm => !(alarm.command == command && alarm.source == source));
        targets.forEach((newAlarm) => {
            newAlarm.status = AlarmStatus.Acknowledged;
            this.greyAlarm.push(newAlarm);
            console.log("Acknowledge alarm")
            this.changeAlarmStatus(command, AlarmStatus.Acknowledged, source)
            console.log(newAlarm.desc)
            this.emit('Deactivate Header', newAlarm.desc)
        })

    }

    changeAlarmStatus(command, target, source){
        // console.log('changed', command, source, 'to', target)
        switch (command) {
            case 'ME_OverspeedShutdown':
                this.ME_OverspeedShutdown = target;
            case 'ME_CoolingWaterHighTemperature':
                this.ME_CoolingWaterHighTemperature = target;
            case 'ME_StartFailure':
                this.ME_StartFailure = target;
            case 'ME_StopFailure':
                this.ME_StopFailure = target;
            case 'ME_LubOilPressureLow':
                this.ME_LubOilPressureLow = target;
            case 'ME_LubOilTemperatureHigh':
                this.ME_LubOilTemperatureHigh = target;
            case 'LubOilFilterDiffrentialPressureHigh':
                this.lubOilFilterDiffrentialPressureHigh = target;
            case 'LubOilSumpTankLevelLow':
                this.lubOilSumpTankLevelLow = target;
            case 'LubOilSumpTankHighLevel':
                this.lubOilSumpTankHighLevel = target;
            case 'LubOilSumpGearTempHigh':
                this.lubOilGearTempHigh = target;
            case 'LubOilSumpGearPressureLow':
                this.lubOilGearPressureLow = target;
            case 'SpeedGovernorFail':
                this.SpeedGovernorFail = target;
            case 'RemoteGovernorFail':
                this.RemoteControlFail = target;
            case 'VoltageFuseFail':
                this.VoltageFuseFail = target;
            case 'ME_FuelPumpFail':
                this.ME_FuelPumpFail = target;
            case 'ME_CoolingWaterTemperatureHigh':
                this.ME_CoolingWaterTemperatureHigh = target;
            case 'ME_CoolingWaterPressureLow':
                this.ME_CoolingWaterPressureLow = target;    
            case 'ME_FuelOilInjectPressureLow':
                this.ME_FuelOilInjectPressureLow = target;    
            case 'AE_CoolingWaterTempHigh':
                this.lubOilFilterDiffrentialPressureHigh = target;
            case 'AE_CoolingWaterPressureLow':
                this.AE_CoolingWaterPressureLow = target;
            case 'AE_FuelOilPressureLow':
                this.AE_FuelOilPressureLow = target;
            case 'AE_FuelOilTemperatureHigh':
                this.AE_FuelOilTemperatureHigh = target;
            case 'AE_Overspeed':
                this.AE_Overspeed = target;
            case 'AE_LubOilTemperatureHigh':
                this.AE_LubOilTemperatureHigh = target;
            case 'AE_LubOilPressureLow':
                this.AE_LubOilPressureLow = target;
            case 'AE_FuelOilLeakage':
                this.AE_FuelOilLeakage = target;
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
            case 'LubOilSumpGearTempHigh':
                return this.lubOilGearTempHigh == target;
            case 'LubOilSumpGearPressureLow':
                return this.lubOilGearPressureLow == target;
            case 'SpeedGovernorFail':
                return this.SpeedGovernorFail == target;
            case 'RemoteGovernorFail':
                return this.RemoteControlFail == target;
            case 'VoltageFuseFail':
                return this.VoltageFuseFail == target;
            case 'ME_FuelPumpFail':
                return this.ME_FuelPumpFail == target;
            case 'ME_CoolingWaterTemperatureHigh':
                return this.ME_CoolingWaterTemperatureHigh == target;
            case 'ME_CoolingWaterPressureLow':
                return this.ME_CoolingWaterPressureLow == target;    
            case 'ME_FuelOilInjectPressureLow':
                return this.ME_FuelOilInjectPressureLow == target;    
            case 'AE_CoolingWaterTempHigh':
                return this.lubOilFilterDiffrentialPressureHigh == target;
            case 'AE_CoolingWaterPressureLow':
                return this.AE_CoolingWaterPressureLow == target;
            case 'AE_FuelOilPressureLow':
                return this.AE_FuelOilPressureLow == target;
            case 'AE_FuelOilTemperatureHigh':
                return this.AE_FuelOilTemperatureHigh == target;
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
            case 'LubOilSumpGearTempHigh':
                return this.lubOilGearTempHigh;
            case 'LubOilSumpGearPressureLow':
                return this.lubOilGearPressureLow;
            case 'SpeedGovernorFail':
                return this.SpeedGovernorFail;
            case 'RemoteGovernorFail':
                return this.RemoteControlFail;
            case 'VoltageFuseFail':
                return this.VoltageFuseFail;
            case 'ME_FuelPumpFail':
                return this.ME_FuelPumpFail;
            case 'ME_CoolingWaterTemperatureHigh':
                return this.ME_CoolingWaterTemperatureHigh;
            case 'ME_CoolingWaterPressureLow':
                return this.ME_CoolingWaterPressureLow;    
            case 'ME_FuelOilInjectPressureLow':
                return this.ME_FuelOilInjectPressureLow;    
            case 'AE_CoolingWaterTempHigh':
                return this.lubOilFilterDiffrentialPressureHigh;
            case 'AE_CoolingWaterPressureLow':
                return this.AE_CoolingWaterPressureLow;
            case 'AE_FuelOilPressureLow':
                return this.AE_FuelOilPressureLow;
            case 'AE_FuelOilTemperatureHigh':
                return this.AE_FuelOilTemperatureHigh;
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
            this.checkAlarmStatus('ME_CoolingWaterTemperatureHigh', AlarmStatus.Active) ||
            this.checkAlarmStatus('ME_CoolingWaterPressureLow', AlarmStatus.Active) 
        )
    }

    checkAE_EngineAlarmActive(){
        return(
            this.checkAlarmStatus('AE_FuelOilPressureLow', AlarmStatus.Active) ||
            this.checkAlarmStatus('AE_FuelOilTemperatureHigh', AlarmStatus.Active) ||
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
            this.checkAlarmStatus('ME_CoolingWaterTemperatureHigh', AlarmStatus.Active) ||
            this.checkAlarmStatus('ME_CoolingWaterPressureLow', AlarmStatus.Active) ||
            this.checkAlarmStatus('ME_FuelOilInjectPressureLow', AlarmStatus.Active) ||
            this.checkAlarmStatus('AE_CoolingWaterTempHigh', AlarmStatus.Active) ||
            this.checkAlarmStatus('AE_CoolingWaterPressureLow', AlarmStatus.Active) ||
            this.checkAlarmStatus('AE_FuelOilTemperatureHigh', AlarmStatus.Active) ||
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
        // if(!this.checkActive(command)) return;
        if(this.checkAlarmStatus(command, AlarmStatus.Inactive)){
            // console.log("Emit ", desc);
            let newAlarm = new AlarmDetail(command, desc, source, AlarmStatus.Active)
            console.log("alarm ON")
            console.log(newAlarm)
            this.changeAlarmStatus(command, AlarmStatus.Active, source);
            if(this.checkAvaliableInAlarmSummary(source, command)){
                this.redAlarm.push(newAlarm);
            }
            this.lastMassage = desc
            this.emit('Alarm', newAlarm);
            
        }
    }

    alarm_OFF(source, command, desc) {
        // if(source=='Aux Engine') console.log("Target Aux", command, AlarmStatus.Acknowledged, "result", this.AE_lowPressLubOil)
        // if(source == 'Main Engine') console.log("Target Main", command, AlarmStatus.Acknowledged, "result", this.ME_lowPressLubOil)
        if(this.checkAlarmStatus(command, AlarmStatus.Acknowledged)){
            // console.log('Emit low off')
            console.log("alarm off");
            this.changeAlarmStatus(command, AlarmStatus.Inactive, source)
            this.greyAlarm.forEach(() => {
                this.greyAlarm = this.greyAlarm.filter(alarm => !(alarm.command == command && alarm.source == source));
            });
            this.emit('Alarm', new AlarmDetail(command, desc, source, AlarmStatus.Inactive));
        }
    }

    
}