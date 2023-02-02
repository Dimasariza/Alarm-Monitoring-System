import {EventEmitter} from 'events'
import {AlarmStatus} from '../AlarmControls/AlarmManager.js'

export const EngineDirection = {
    Ahead: 'Ahead',
    Neutral: 'Neutral',
    Astern: 'Astern',
};

export const EngineControlStatus = {
    Remote: 'Remote',
    Local: 'Local',
};

export default class EngineData extends EventEmitter{
    
    constructor(alarmManager, source, codeSender, socket) {
        super()
        this.engineTemperature = [
            100,
            100,
            100,
            100,
            100,
            100,
            100,
            100];
        this.engineRev = 2000;
        this.shaftRev = 2000;
        this.lubOilPressure = 0.5;
        this.boostPressure = 0.2;
        this.coolingWaterTemp = 60;
        this.coolingWaterPressure = 0.5;
        this.exhaustTemp = 400;
        this.runningHour = 0;
        this.battreyVolt = 13.7;
        this.battreyLife = 100;

        this.engineDirection = EngineDirection.Neutral;
        this.engineControlStatus = EngineControlStatus.Local;
        this.emergencyStop = true;
        this.readyToStart = false;
        this.auxBlowerFailure = false;
        this.engineRunning = false;
        this.startingFailure = false;
        this.battreyCharging = false;
        this.buzzer = false;
        this.voltMeter = 383
        this.amp = 61;
        this.pf = 0.85;
        this.power = 19157;

        this.startCommandActive = true;
        this.valveOpenActive = false;
        this.stopRPM = 1654;
        this.restartRPM = 1406;
        this.startStopTimeDelay = 15;
        this.lowPressureFO = 0.01;
        this.highPressureFO = 0.25;
        this.lowTempCW = 88;
        this.highTempCW = 95;
        this.lowTempExhGas = 100;
        this.highTempExhGas = 498;
        this.highPressLubOil = 0.25;
        this.lowPressLubOil = 0.15;
        this.workloadMax = 75;
        this.workloadMin = 10;

        this.maxEngineRev = 3500;
        this.maxCoolingWaterTemp = 120;
        this.maxLubOilPressure = 1;
        this.maxBoostPressure = 0.3;
        this.shaftGearBox = 0.3;

        this.alarmManager = alarmManager;
        this.source = source;
        this.workload = 100
        this.engineTrip = false;
        this.engineStandby = false;
        this.codeSender = codeSender;
        this.socket = socket;
    }

    getEngineTemperature(){
        return this.engineTemperature;
    }

    getEngineTemperatureAverage(){
        var averageTemp = 0;
        this.engineTemperature.forEach(element => {
            averageTemp += element;
        });
        return averageTemp / this.engineTemperature.length;
    }

    setStopRPM(value){
        this.stopRPM = value;
    }

    setRestartRPM(value){
        this.restartRPM = value;
    }

    setStartStopTimeDelay(value){
        this.startStopTimeDelay = value;
    }

    setLowPressureFO(value){
        this.lowPressureFO = value;
    }

    setLowTempCW(value){
        this.lowTempCW = value;
    }
    
    setHighTempCW(value){
        this.highTempCW = value;
    }

    setLowTempExhGas(value){
        this.lowTempExhGas = value;
    }
        
    setHighTempExhGas(value){
        this.highTempExhGas = value;
    }

    setEngineTrip(){
        // this.engineRev = 0;
        // this.shaftRev = 0;
        // this.lubOilPressure = 0;
        // this.boostPressure = 0;
        // this.coolingWaterTemp = 0;
        // this.coolingWaterPressure = 0;
        // this.exhaustTemp = 0;
        // this.engineTrip = true
        // this.codeSender(this.socket, 'code')
    }
        
    updateEngineData(engineRPM, coolantTemp, OilPressure, workload){
        if(this.engineTrip) return;
        this.engineStandby = ((engineRPM / 1023) * this.maxEngineRev == this.engineRev)
        this.engineRev = (engineRPM / 1023) * this.maxEngineRev;
        this.shaftRev = this.engineRev * this.shaftGearBox;
        this.coolingWaterTemp = (coolantTemp / 1023) * this.maxCoolingWaterTemp;
        this.lubOilPressure = (OilPressure / 1023) * this.maxLubOilPressure;
        if(this.source == "Aux Engine") this.workload = workload
        // this.boostPressure = (HydraulicPressure / 1023) * this.maxBoostPressure;

        this.emit('Engine Rev', this.engineRev);
        this.emit('Shaft Rev', this.shaftRev);

        this.emit('Cooling Water Temp', this.coolingWaterTemp);
        this.emit('Lub Oil Pressure', this.lubOilPressure);
        this.emit('Boost Pressure', this.boostPressure);

        //engine decrease
        if(this.engineRev < this.restartRPM){
            if(this.source == "Main Engine" ){
                if(!this.alarmManager.pumpFuelOilFlow && this.alarmManager.lubricatingOilPressureLow){
                    this.alarmManager.alarm_ON(this.source, 'ME_LubOilPressureLow', 'ME Lub Oil Pressure Low')
                }
                if(!this.alarmManager.pumpFuelOilFlow && this.alarmManager.fuelOilPressureFlow){
                    this.alarmManager.alarm_ON(this.source, 'ME_FuelPumpFail', 'ME Fuel Pump Fail')
                }
            }else{
                if(!this.alarmManager.pumpFuelOilFlow && this.fuelOilPressureFlow){
                    this.alarmManager.alarm_ON(this.source, 'AE_FuelOilPressureLow', 'AE Fuel Oil Pressure Low')
                }
            }
            
        }else{
            if(this.source == "Main Engine"){
                if(this.alarmManager.checkAlarmStatus('ME_LubOilPressureLow', AlarmStatus.Acknowledged)){
                    this.alarmManager.alarm_OFF(this.source, 'ME_LubOilPressureLow', 'ME Lub Oil Pressure Low')
                }
                if(this.alarmManager.checkAlarmStatus('ME_FuelPumpFail', AlarmStatus.Acknowledged)){
                    this.alarmManager.alarm_OFF(this.source, 'ME_FuelPumpFail', 'ME Fuel Pump Fail')
                }
            }else{
                if(this.alarmManager.checkAlarmStatus('AE_FuelOilPressureLow', AlarmStatus.Acknowledged)){
                    this.alarmManager.alarm_OFF(this.source, 'AE_FuelOilPressureLow', 'AE Fuel Oil Pressure Low')
                }
            }
        }

        //engine decrease and lub oil pressure increase
        if(this.engineRev < this.restartRPM && this.lubOilPressure > this.highPressLubOil){
            if(this.source == "Main Engine"){
                if(this.alarmManager.pumpFuelOilFlow && !this.alarmManager.pumpLubOilFlow){
                    this.alarmManager.alarm_ON(this.source, 'LubOilFilterDiffrentialPressureHigh', 'Lub Oil Filter Diffrential Pressure High')
                }
                if(this.alarmManager.pumpFuelOilFlow && this.alarmManager.pumpBilgeEngineRoom && !this.alarmManager.fuelOilLeakageFromHighPressurePipes){
                    this.alarmManager.alarm_ON(this.source, 'LubOilSumpTankHighLevel', 'Lub Oil Filter Diffrential Pressure High')
                }
            }
        }else{
            if(this.source == "Main Engine"){
                if(this.alarmManager.checkAlarmStatus('LubOilFilterDiffrentialPressureHigh', AlarmStatus.Acknowledged)){
                    this.alarmManager.alarm_OFF(this.source, 'LubOilFilterDiffrentialPressureHigh', 'Lub Oil Filter Diffrential Pressure High')
                }
                if(this.alarmManager.checkAlarmStatus('LubOilSumpTankHighLevel', AlarmStatus.Acknowledged)){
                    this.alarmManager.alarm_OFF(this.source, 'LubOilSumpTankHighLevel', 'Lub Oil Sump Tank High Level')
                }
            }
        }

        //engine standby
        if(this.engineStandby && this.source == "Main Engine"){
            if(this.alarmManager.pumpFuelOilFlow && this.alarmManager.fuelOilPressureFlow){
                this.alarmManager.alarm_ON(this.source, 'ME_StartFailure', 'ME Start Failure')
            }
        }else{
            if(this.alarmManager.checkAlarmStatus('ME_StartFailure', AlarmStatus.Acknowledged)){
                this.alarmManager.alarm_OFF(this.source, 'ME_StartFailure', 'ME StartFailure')
            }
        }

        //Increase engine
        if(this.engineRev > this.stopRPM){
            if(this.source == "Main Engine"){
                // this.alarmManager.pumpFuelOilFlow = true
                // this.alarmManager.engineOverspeed = true
                if(this.alarmManager.pumpFuelOilFlow && this.alarmManager.engineOverspeed){
                    this.alarmManager.alarm_ON(this.source, 'ME_OverspeedShutdown', 'ME Overspeed Shutdown')
                }

                // this.alarmManager.pumpRawWaterFlowEngine = true
                // this.alarmManager.lubricatingOilPressureLow = false
                if(this.alarmManager.pumpRawWaterFlowEngine && !this.alarmManager.lubricatingOilPressureLow){
                    this.alarmManager.alarm_ON(this.source, 'LubOilGearTempHigh', 'ME Lub Oil Gear Temp High')
                }

                // this.alarmManager.pumpRawWaterFlowEngine = false
                // this.alarmManager.lubricatingOilPressureLow = true
                if(!this.alarmManager.pumpRawWaterFlowEngine && this.alarmManager.lubricatingOilPressureLow){
                    this.alarmManager.alarm_ON(this.source, 'LubOilGearPressureLow', 'ME Lub Oil Gear Pressure Low')
                }

                // this.alarmManager.pumpFuelOilFlow = true
                // this.alarmManager.lubricatingOilTemperatureHigh = true
                if(this.alarmManager.pumpFuelOilFlow && this.alarmManager.lubricatingOilTemperatureHigh){
                    this.alarmManager.alarm_ON(this.source, 'SpeedGovernorFail', 'Speed Governor Fail')
                }

                // this.alarmManager.loadPanelSwitch = true
                // this.alarmManager.engineOverspeed = true
                if(this.alarmManager.loadPanelSwitch && this.alarmManager.engineOverspeed){
                    this.alarmManager.alarm_ON(this.source, 'RemoteControlFail', 'Remote Control Fail')
                }

                this.ME_InterimCondition = true
            }else{
                if(this.alarmManager.pumpFuelOilFlow && this.fuelOilPressureFlow){
                    this.alarmManager.alarm_ON(this.source, 'AE_FuelOilTemperatureHigh', 'AE Fuel Oil Temperature High')
                }

                if(this.alarmManager.engineOverspeed){
                    this.alarmManager.alarm_ON(this.source, 'AE_Overspeed', 'AE Overspeed')
                }
            }
            this.setEngineTrip();
        }else{
            if(this.source == "Main Engine"){
                if(this.alarmManager.checkAlarmStatus('ME_OverspeedShutdown', AlarmStatus.Acknowledged)){
                    this.alarmManager.alarm_OFF(this.source, 'ME_OverspeedShutdown', 'ME Overspeed Shutdown')
                }
                if(this.alarmManager.checkAlarmStatus('LubOilGearTempHigh', AlarmStatus.Acknowledged)){
                    this.alarmManager.alarm_OFF(this.source, 'LubOilGearTempHigh', 'ME Lub Oil Gear Temp High')
                }

                if(this.alarmManager.checkAlarmStatus('LubOilGearPressureLow', AlarmStatus.Acknowledged)){
                    this.alarmManager.alarm_OFF(this.source, 'LubOilGearPressureLow', 'ME Lub Oil Gear Pressure Low')
                }

                if(this.alarmManager.checkAlarmStatus('SpeedGovernorFail', AlarmStatus.Acknowledged)){
                    this.alarmManager.alarm_OFF(this.source, 'SpeedGovernorFail', 'Speed Governor Fail')
                }

                if(this.alarmManager.checkAlarmStatus('RemoteControlFail', AlarmStatus.Acknowledged)){
                    this.alarmManager.alarm_OFF(this.source, 'RemoteControlFail', 'Remote Control Fail')
                }

                if(this.alarmManager.checkAlarmStatus('VoltageFuseFail', AlarmStatus.Acknowledged)){
                    this.alarmManager.alarm_OFF(this.source, 'VoltageFuseFail', 'Voltage / Fuse Fail')
                }

                if(this.alarmManager.checkAlarmStatus('ME_FuelOilInjectPressureLow', AlarmStatus.Acknowledged)){
                    this.alarmManager.alarm_OFF(this.source, 'ME_FuelOilInjectPressureLow', 'ME Fuel Oil Inject Pressure Low')
                }
                this.ME_InterimCondition = false
            }else{
                if(this.alarmManager.checkAlarmStatus('AE_FuelOilTemperatureHigh', AlarmStatus.Acknowledged)){
                    this.alarmManager.alarm_OFF(this.source, 'AE_FuelOilTemperatureHigh', 'AE Fuel Oil Temperature High')
                }
                if(this.alarmManager.checkAlarmStatus('AE_Overspeed', AlarmStatus.Acknowledged)){
                    this.alarmManager.alarm_OFF(this.source, 'AE_Overspeed', 'AE Overspeed')
                }
            }
            // this.alarmManager.alarm_OFF(this.source, 'lowPressureBoost', 'Low Boost Pressure')
            // console.log("Low Pressure OFF");
        }

        if(this.boostPressure < this.lowPressureFO){
            this.setEngineTrip()
        }else{
            // this.alarmManager.alarm_OFF(this.source, 'lowPressureBoost', 'Low Boost Pressure')
            // console.log("Low Pressure OFF");
        }

        //lub oil decrease
        if(this.lubOilPressure < this.lowPressLubOil){
            if(this.source == "Main Engine" ){
                if(this.alarmManager.pumpLubOilFlow && this.alarmManager.lubricatingOilTemperatureHigh){
                    this.alarmManager.alarm_ON(this.source, 'ME_LubOilTemperatureHigh', 'ME Lub Oil Temperature High')
                }
                if(this.alarmManager.pumpLubOilFlow && this.alarmManager.pumpBilgeEngineRoom && this.alarmManager.lubricatingOilPressureLow){
                    this.alarmManager.alarm_ON(this.source, 'LubOilSumpTankLevelLow', 'Lub Oil Sump Tank Level Low')
                }
            }
            this.setEngineTrip()
        }else{
            if(this.source == "Main Engine"){
                if(this.alarmManager.checkAlarmStatus('ME_LubOilTemperatureHigh', AlarmStatus.Acknowledged)){
                    this.alarmManager.alarm_OFF(this.source, 'ME_LubOilTemperatureHigh', 'ME Lub Oil Temperature High')
                }
                if(this.alarmManager.checkAlarmStatus('LubOilSumpTankLevelLow', AlarmStatus.Acknowledged)){
                    this.alarmManager.alarm_OFF(this.source, 'LubOilSumpTankLevelLow', 'Lub Oil Sump Tank Level Low')
                }
            }
        }
        
        //lub oil increase
        if(this.lubOilPressure > this.highPressLubOil){
            // console.log("Higher");
            // this.alarmManager.alarm_ON(this.source, 'highPressureLubOil', 'High Lub. Oil Pressure')
        }else{
            // console.log("Neither");
            // this.alarmManager.alarm_OFF(this.source, 'highPressureLubOil', 'High Lub. Oil Pressure')
        }

        //Decrease cooling water temp
        if(this.coolingWaterTemp < this.lowTempCW){
            // console.log("Lower");
            if(this.source == "Main Engine" ){
                if(this.alarmManager.pumpRawWaterFlowEngine && this.alarmManager.coolingWaterPressureLow){
                    this.alarmManager.alarm_ON(this.source, 'ME_CoolingWaterPressureLow', 'ME Cooling Water Pressure Low')
                }
            }
            // this.alarmManager.alarm_ON(this.source, 'lowTempWC', 'Low Cooling Water Temperature')
        }else{
            if(this.source == "Main Engine"){
                if(this.alarmManager.checkAlarmStatus('ME_CoolingWaterPressureLow', AlarmStatus.Acknowledged)){
                    this.alarmManager.alarm_OFF(this.source, 'ME_CoolingWaterPressureLow', 'ME Cooling Water Pressure Low')
                }
            }
        }
        
        //Increase cooling water temp
        if(this.coolingWaterTemp > this.highTempCW){
            // this.alarmManager.pumpFuelOilFlow = false
            // this.alarmManager.coolingWaterTemperatureHigh = true
            if(this.source == "Main Engine" ){
                if(this.alarmManager.pumpRawWaterFlowEngine && this.alarmManager.coolingWaterTemperatureHigh){
                    this.alarmManager.alarm_ON(this.source, 'ME_CoolingWaterHighTemperature', 'ME Cooling Water High Temperature')
                }
                if(!this.alarmManager.pumpFuelOilFlow && this.alarmManager.coolingWaterTemperatureHigh){
                    this.alarmManager.alarm_ON(this.source, 'ME_StopFailure', 'ME Stop Failure')
                }
                if(this.alarmManager.pumpRawWaterFlowEngine && this.alarmManager.coolingWaterTemperatureHigh){
                    this.alarmManager.alarm_ON(this.source, 'ME_CoolingWaterTemperatureHigh', 'ME Cooling Water Temperature High')
                }
            }
            this.setEngineTrip()
        }else{
            if(this.source == "Main Engine"){
                if(this.alarmManager.checkAlarmStatus('ME_CoolingWaterHighTemperature', AlarmStatus.Acknowledged)){
                    this.alarmManager.alarm_OFF(this.source, 'ME_CoolingWaterHighTemperature', 'ME Cooling Water High Temperature')
                }
                if(this.alarmManager.checkAlarmStatus('ME_StopFailure', AlarmStatus.Acknowledged)){
                    this.alarmManager.alarm_OFF(this.source, 'ME_StopFailure', 'ME Stop Failure')
                }
                if(this.alarmManager.checkAlarmStatus('ME_CoolingWaterTemperatureHigh', AlarmStatus.Acknowledged)){
                    this.alarmManager.alarm_OFF(this.source, 'ME_CoolingWaterTemperatureHigh', 'ME Cooling Water Temperature High')
                }
            }
        }

        //workload
        if(this.source == "Aux Engine"){
            //genset increase
            if(this.workload > this.workloadMax){
                // this.alarmManager.pumpRawWaterFlowEngine = true
                // this.alarmManager.coolingWaterTemperatureHigh = true
                if(this.alarmManager.pumpRawWaterFlowEngine && this.alarmManager.coolingWaterTemperatureHigh){
                    this.alarmManager.alarm_ON(this.source, 'AE_CoolingWaterTempHigh', 'AE Cooling Water Temp High')
                }
                if(this.alarmManager.pumpLubOilFlow && this.alarmManager.lubricatingOilTemperatureHigh){
                    this.alarmManager.alarm_ON(this.source, 'AE_LubOilTemperatureHigh', 'AE Lub Oil Temperature High')
                }
                if(!this.alarmManager.pumpLubOilFlow && this.alarmManager.lubricatingOilPressureLow){
                    this.alarmManager.alarm_ON(this.source, 'AE_LubOilPressureLow', 'AE Lub Oil Pressure Low')
                }
            }else{
                // this.alarmManager.pumpRawWaterFlowEngine = false
                // this.alarmManager.coolingWaterTemperatureHigh = true
                if(this.alarmManager.checkAlarmStatus('AE_CoolingWaterTempHigh', AlarmStatus.Acknowledged)){
                    this.alarmManager.alarm_OFF(this.source, 'AE_CoolingWaterTempHigh', 'AE Cooling Water Temp High')
                }
                if(this.alarmManager.checkAlarmStatus('AE_LubOilTemperatureHigh', AlarmStatus.Acknowledged)){
                    this.alarmManager.alarm_OFF(this.source, 'AE_LubOilTemperatureHigh', 'AE Lub Oil Temperature High')
                }
                if(this.alarmManager.checkAlarmStatus('AE_LubOilPressureLow', AlarmStatus.Acknowledged)){
                    this.alarmManager.alarm_OFF(this.source, 'AE_LubOilPressureLow', 'AE Lub Oil Pressure Low')
                }
            }
            
            //genset decrease
            if(this.workload < this.workloadMin){
                if(!this.alarmManager.pumpRawWaterFlowEngine && this.alarmManager.coolingWaterPressureLow){
                    this.alarmManager.alarm_ON(this.source, 'AE_CoolingWaterPressureLow', 'AE Cooling Water Pressure Low')
                }
                if(!this.alarmManager.pumpBilgeEngineRoom && this.alarmManager.fuelOilLeakageFromHighPressurePipes){
                    this.alarmManager.alarm_ON(this.source, 'AE_FuelOilLeakage', 'AE Fuel Oil Leakage')
                }
            }else{
                if(this.alarmManager.checkAlarmStatus('AE_CoolingWaterPressureLow', AlarmStatus.Acknowledged)){
                    this.alarmManager.alarm_OFF(this.source, 'AE_CoolingWaterPressureLow', 'AE Cooling Water Pressure Low')
                }
                if(this.alarmManager.checkAlarmStatus('AE_FuelOilLeakage', AlarmStatus.Acknowledged)){
                    this.alarmManager.alarm_OFF(this.source, 'AE_FuelOilLeakage', 'AE Fuel Oil Leakage')
                }
            }
        }

        
    }
}