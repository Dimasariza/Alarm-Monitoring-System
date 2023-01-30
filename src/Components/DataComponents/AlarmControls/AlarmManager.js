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

        this.setMaxListeners(40);
    }

    updateSafetyCommand(pumpRawWaterFlowEngine, pumpFuelOilFlow, pumpLubOilFlow, pumpBilgeEngineRoom, loadPanelSwitch, lightingPanel, battreyFault ){
        this.pumpRawWaterFlowEngine = pumpRawWaterFlowEngine; 
        this.pumpFuelOilFlow = pumpFuelOilFlow; 
        this.pumpLubOilFlow = pumpLubOilFlow; 
        this.pumpBilgeEngineRoom = pumpBilgeEngineRoom; 
        this.loadPanelSwitch = loadPanelSwitch; 
        this.lightingPanel = lightingPanel; 
        this.battreyFault = battreyFault; 
    }

    updateDigitalCommand(engineOverspeed, lubricatingOilPressureLow, lubricatingOilTemperatureHigh, fuelOilPressureFlow, fuelOilLeakageFromHighPressurePipes, coolingWaterPressureLow, coolingWaterTemperatureHigh ){
        this.engineOverspeed = engineOverspeed; 
        this.lubricatingOilPressureLow = lubricatingOilPressureLow; 
        this.lubricatingOilTemperatureHigh = lubricatingOilTemperatureHigh; 
        this.fuelOilPressureFlow = fuelOilPressureFlow; 
        this.fuelOilLeakageFromHighPressurePipes = fuelOilLeakageFromHighPressurePipes; 
        this.coolingWaterPressureLow = coolingWaterPressureLow; 
        this.coolingWaterTemperatureHigh = coolingWaterTemperatureHigh; 
    }

    acknowledgeAlarm(command, source) {
        console.log(command, source)
        var targets = this.redAlarm.filter(alarm => (alarm.command == command && alarm.source == source));
        console.log(targets)
        if(targets == 0) return;
        this.redAlarm = this.redAlarm.filter(alarm => !(alarm.command == command && alarm.source == source));
        targets.forEach((newAlarm) => {
            newAlarm.status = AlarmStatus.Acknowledged;
            this.greyAlarm.push(newAlarm);
            console.log("Acknowledge alarm")
            this.changeAlarmStatus(command, AlarmStatus.Acknowledged, source)
        })

    }

    changeAlarmStatus(command, target, source){
        // console.log('changed', command, source, 'to', target)
        switch (command) {
            case 'ME_OverspeedShutdown':
                return this.ME_OverspeedShutdown = target;
            case 'ME_CoolingWaterHighTemperature':
                return this.ME_CoolingWaterHighTemperature = target;
            case 'ME_StartFailure':
                return this.ME_StartFailure = target;
            case 'ME_StopFailure':
                return this.ME_StopFailure = target;
            case 'ME_LubOilPressureLow':
                return this.ME_LubOilPressureLow = target;
            case 'ME_LubOilTemperatureHigh':
                return this.ME_LubOilTemperatureHigh = target;
            case 'lubOilFilterDiffrentialPressureHigh':
                return this.lubOilFilterDiffrentialPressureHigh = target;
            case 'VoltageFuseFail':
                return this.VoltageFuseFail = target;
            case 'AE_CoolingWaterTempHigh':
                return this.lubOilFilterDiffrentialPressureHigh = target;
            case 'AE_CoolingWaterPressureLow':
                return this.AE_CoolingWaterPressureLow = target;
            default:
                break;
        }
        if(target == AlarmStatus.Acknowledged){
            this.emit('Alarm', new AlarmDetail(command, 'Acknowledged', source, target));
        }
    }

    checkAlarmStatus(command, target, source){
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
            case 'lubOilFilterDiffrentialPressureHigh':
                return this.lubOilFilterDiffrentialPressureHigh == target;
            case 'VoltageFuseFail':
                return this.VoltageFuseFail == target;
            case 'AE_CoolingWaterTempHigh':
                return this.lubOilFilterDiffrentialPressureHigh == target;
            case 'AE_CoolingWaterPressureLow':
                return this.AE_CoolingWaterPressureLow == target;
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
            case 'lubOilFilterDiffrentialPressureHigh':
                return this.lubOilFilterDiffrentialPressureHigh;
            case 'VoltageFuseFail':
                return this.VoltageFuseFail;
            case 'AE_CoolingWaterTempHigh':
                return this.lubOilFilterDiffrentialPressureHigh;
            case 'AE_CoolingWaterPressureLow':
                return this.AE_CoolingWaterPressureLow;
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
            console.log("alarm ON")
            console.log(newAlarm)
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
            console.log("alarm off");
            this.changeAlarmStatus(command, AlarmStatus.Inactive, source)
            this.greyAlarm.forEach(() => {
                this.greyAlarm = this.greyAlarm.filter(alarm => !(alarm.command == command && alarm.source == source));
            });
            this.emit('Alarm', new AlarmDetail(command, desc, source, AlarmStatus.Inactive));
        }
    }

    
}