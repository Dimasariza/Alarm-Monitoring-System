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
        this.battreyLife = 90;

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
        this.minRPM = 200;
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
        this.maxWorkload = 100;
        this.shaftGearBox = 0.3;

        this.alarmManager = alarmManager;
        this.source = source;
        this.workload = 0
        this.engineTrip = false;
        this.engineStandby = false;
        this.codeSender = codeSender;
        this.socket = socket;
        this.standbyTreshold = 60;

        this.activeParemeter = false;
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

    updateEngineActiveStatus(status){
        this.activeParemeter = status;
    }
        
    updateEngineData(engineRPM, coolantTemp, OilPressure, workload){
        // if(!this.activeParemeter) return;
        this.engineStandby = (Math.abs((engineRPM / 1023) * this.maxEngineRev - this.engineRev) < this.standbyTreshold)
        this.engineRev = Math.min((engineRPM / 1023) * this.maxEngineRev, this.stopRPM);
        this.shaftRev = this.engineRev * this.shaftGearBox;
        this.coolingWaterTemp = (coolantTemp / 1023) * this.maxCoolingWaterTemp;
        this.lubOilPressure = (OilPressure / 1023) * this.maxLubOilPressure;
        if(this.source == "Aux Engine"){
            this.workload = (workload / 1023) * this.maxWorkload;
            console.log("Its aux allright")
        }
        // this.boostPressure = (HydraulicPressure / 1023) * this.maxBoostPressure;

        this.emit('Engine Rev', this.engineRev);
        this.emit('Shaft Rev', this.shaftRev);

        this.emit('Cooling Water Temp', this.coolingWaterTemp);
        this.emit('Lub Oil Pressure', this.lubOilPressure);
        this.emit('Boost Pressure', this.boostPressure);
        if(this.source == "Aux Engine"){
            console.log("Its aux workload emit");
            this.emit('Workload', this.workload);
        }
    }

    CheckAlarmsConditions_ME(){
        // if(!this.activeParemeter) return;
        this.CheckAlarmOff_ME();
        //engine decrease
        if(this.engineRev < this.minRPM){
            if(!this.alarmManager.pumpLubOilFlow[0] && this.alarmManager.lubricatingOilPressureLow[0] && this.alarmManager.checkAlarmStatus('ME_LubOilPressureLow', AlarmStatus.Inactive) ){
                this.alarmManager.alarm_ON(this.source, 'ME_LubOilPressureLow', 'ME Lub Oil Pressure Low');
                return;
            }
            if(!this.alarmManager.pumpFuelOilFlow[0] && this.alarmManager.fuelOilPressureFlow[0]  && this.alarmManager.checkAlarmStatus('ME_FuelPumpFail', AlarmStatus.Inactive) ){
                this.alarmManager.alarm_ON(this.source, 'ME_FuelPumpFail', 'ME Fuel Pump Fail');
                return;
            }
        }

        //engine decrease and lub oil pressure increase
        if(this.engineRev < this.minRPM && this.lubOilPressure > this.highPressLubOil){
            if(this.alarmManager.pumpLubOilFlow[0] && !this.alarmManager.lubricatingOilPressureLow[0]  && this.alarmManager.checkAlarmStatus('LubOilFilterDiffrentialPressureHigh', AlarmStatus.Inactive) ){
                this.alarmManager.alarm_ON(this.source, 'LubOilFilterDiffrentialPressureHigh', 'Lub Oil Filter Diffrential Pressure High');
                return;
            }
            if(this.alarmManager.pumpLubOilFlow[0] && this.alarmManager.pumpBilgeEngineRoom[0] && this.alarmManager.fuelOilLeakageFromHighPressurePipes[0] && this.alarmManager.checkAlarmStatus('LubOilSumpTankHighLevel', AlarmStatus.Inactive) ){
                this.alarmManager.alarm_ON(this.source, 'LubOilSumpTankHighLevel', 'Lub Oil Sump Tank High Level');
                return;
            }
        }

        //engine standby
        if(this.engineStandby && this.alarmManager.pumpFuelOilFlow[0] && this.alarmManager.fuelOilPressureFlow[0] && this.alarmManager.checkAlarmStatus('ME_StartFailure', AlarmStatus.Inactive) ){
            this.alarmManager.alarm_ON(this.source, 'ME_StartFailure', 'ME Start Failure');
            return;
        }

        //Increase engine
        if(this.engineRev > this.restartRPM){
            this.alarmManager.ME_InterimCondition = true
            if(this.alarmManager.pumpFuelOilFlow[0] && this.alarmManager.engineOverspeed[0] && this.alarmManager.checkAlarmStatus('ME_OverspeedShutdown', AlarmStatus.Inactive) ){
                this.alarmManager.alarm_ON(this.source, 'ME_OverspeedShutdown', 'ME Overspeed Shutdown');
                return;
            }

            if(this.alarmManager.pumpRawWaterFlowEngine[0] && !this.alarmManager.lubricatingOilPressureLow[0] && this.alarmManager.checkAlarmStatus('LubOilGearTempHigh', AlarmStatus.Inactive) ){
                this.alarmManager.alarm_ON(this.source, 'LubOilGearTempHigh', 'ME Lub Oil Gear Temp High');
                return;
            }

            if(!this.alarmManager.pumpRawWaterFlowEngine[0] && this.alarmManager.lubricatingOilPressureLow[0] && this.alarmManager.checkAlarmStatus('LubOilGearPressureLow', AlarmStatus.Inactive) ){
                this.alarmManager.alarm_ON(this.source, 'LubOilGearPressureLow', 'ME Lub Oil Gear Pressure Low');
                return;
            }

            if(this.alarmManager.pumpFuelOilFlow[0] && this.alarmManager.lubricatingOilTemperatureHigh[0] && this.alarmManager.checkAlarmStatus('SpeedGovernorFail', AlarmStatus.Inactive) ){
                this.alarmManager.alarm_ON(this.source, 'SpeedGovernorFail', 'Speed Governor Fail');
                return;
            }

            if(this.alarmManager.loadPanelSwitch[0] && this.alarmManager.engineOverspeed[0] && this.alarmManager.checkAlarmStatus('RemoteControlFail', AlarmStatus.Inactive) ){
                this.alarmManager.alarm_ON(this.source, 'RemoteControlFail', 'Remote Control Fail');
                return;
            }
            this.setEngineTrip();
        }else{
            this.alarmManager.ME_InterimCondition = false
        }

        if(this.boostPressure < this.lowPressureFO){
            this.setEngineTrip()
        }else{
            // this.alarmManager.alarm_OFF(this.source, 'lowPressureBoost', 'Low Boost Pressure')
            // console.log("Low Pressure OFF");
        }

        //lub oil decrease
        if(this.lubOilPressure < this.lowPressLubOil){
            // console.log("Lub oil decrease ", this.alarmManager.pumpLubOilFlow, !this.alarmManager.pumpBilgeEngineRoom, this.alarmManager.lubricatingOilPressureLow);
            if(this.alarmManager.pumpLubOilFlow[0] && this.alarmManager.lubricatingOilTemperatureHigh[0] && this.alarmManager.checkAlarmStatus('ME_LubOilTemperatureHigh', AlarmStatus.Inactive) ){
                this.alarmManager.alarm_ON(this.source, 'ME_LubOilTemperatureHigh', 'ME Lub Oil Temperature High');
                return;
            }
            if(this.alarmManager.pumpLubOilFlow[0] && !this.alarmManager.pumpBilgeEngineRoom[0] && this.alarmManager.lubricatingOilPressureLow[0] && this.alarmManager.checkAlarmStatus('LubOilSumpTankLevelLow', AlarmStatus.Inactive) ){
                // console.log("This alarm triggered");
                this.alarmManager.alarm_ON(this.source, 'LubOilSumpTankLevelLow', 'Lub Oil Sump Tank Level Low');
                return;
            }
            this.setEngineTrip()
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
            if(!this.alarmManager.pumpRawWaterFlowEngine[0] && this.alarmManager.coolingWaterPressureLow[0] && this.alarmManager.checkAlarmStatus('ME_CoolingWaterPressureLow', AlarmStatus.Inactive) ){
                this.alarmManager.alarm_ON(this.source, 'ME_CoolingWaterPressureLow', 'ME Cooling Water Pressure Low');
                return;
            }
        }
        
        //Increase cooling water temp
        if(this.coolingWaterTemp > this.highTempCW){
            // console.log("Temp exceed max ", this.alarmManager.pumpRawWaterFlowEngine, this.alarmManager.coolingWaterTemperatureHigh)
            if(this.alarmManager.pumpRawWaterFlowEngine[0] && this.alarmManager.coolingWaterTemperatureHigh[0] && this.alarmManager.checkAlarmStatus('ME_CoolingWaterHighTemperature', AlarmStatus.Inactive) ){
                this.alarmManager.alarm_ON(this.source, 'ME_CoolingWaterHighTemperature', 'ME Cooling Water High Temperature');
                return;
            }
            if(!this.alarmManager.pumpFuelOilFlow[0] && this.alarmManager.coolingWaterTemperatureHigh[0] && this.alarmManager.checkAlarmStatus('ME_StopFailure', AlarmStatus.Inactive) ){
                this.alarmManager.alarm_ON(this.source, 'ME_StopFailure', 'ME Stop Failure');
                return;
            }
            this.setEngineTrip()
        }
    }

    CheckAlarmsConditions_AE(){
        this.CheckAlarmOff_AE();
        //engine decrease
        if(this.engineRev < this.minRPM){
            if(!this.alarmManager.pumpFuelOilFlow[1] && this.alarmManager.fuelOilPressureFlow[1]  && this.alarmManager.checkAlarmStatus('AE_FuelOilPressureLow', AlarmStatus.Inactive) ){
                this.alarmManager.alarm_ON(this.source, 'AE_FuelOilPressureLow', 'AE Fuel Oil Pressure Low');
                return;
            }
        }

        //Increase engine
        if(this.engineRev > this.restartRPM){
            if(this.alarmManager.engineOverspeed[1] && this.alarmManager.checkAlarmStatus('AE_Overspeed', AlarmStatus.Inactive) ){
                this.alarmManager.alarm_ON(this.source, 'AE_Overspeed', 'AE Overspeed');
                return;
            }
            this.setEngineTrip();
        }

        if(this.workload > this.workloadMax){
            if(this.alarmManager.pumpRawWaterFlowEngine[1] && this.alarmManager.coolingWaterTemperatureHigh[1]  && this.alarmManager.checkAlarmStatus('AE_CoolingWaterTempHigh', AlarmStatus.Inactive) ){
                this.alarmManager.alarm_ON(this.source, 'AE_CoolingWaterTempHigh', 'AE Cooling Water Temp High');
                return;
            }
            if(this.alarmManager.pumpLubOilFlow[1] && this.alarmManager.lubricatingOilTemperatureHigh[1] && this.alarmManager.checkAlarmStatus('AE_LubOilTemperatureHigh', AlarmStatus.Inactive) ){
                this.alarmManager.alarm_ON(this.source, 'AE_LubOilTemperatureHigh', 'AE Lub Oil Temperature High');
                return;
            }
            if(!this.alarmManager.pumpLubOilFlow[1] && this.alarmManager.lubricatingOilPressureLow[1] && this.alarmManager.checkAlarmStatus('AE_LubOilPressureLow', AlarmStatus.Inactive) ){
                this.alarmManager.alarm_ON(this.source, 'AE_LubOilPressureLow', 'AE Lub Oil Pressure Low');
                return;
            }
        }
        
        //genset decrease
        if(this.workload < this.workloadMin){
            // console.log("Workload decrease ",!this.alarmManager.pumpRawWaterFlowEngine, this.alarmManager.coolingWaterPressureLow )
            if(!this.alarmManager.pumpRawWaterFlowEngine[1] && this.alarmManager.coolingWaterPressureLow[1] && this.alarmManager.checkAlarmStatus('AE_CoolingWaterPressureLow', AlarmStatus.Inactive) ){
                this.alarmManager.alarm_ON(this.source, 'AE_CoolingWaterPressureLow', 'AE Cooling Water Pressure Low');
                return;
            }
            if(!this.alarmManager.pumpBilgeEngineRoom[1] && this.alarmManager.fuelOilLeakageFromHighPressurePipes[1] && this.alarmManager.checkAlarmStatus('AE_FuelOilLeakage', AlarmStatus.Inactive) ){
                this.alarmManager.alarm_ON(this.source, 'AE_FuelOilLeakage', 'AE Fuel Oil Leakage');
                return;
            }
        }
    }
    
    CheckAlarmOff_ME(){
        //engine decrease
        if(this.alarmManager.checkAlarmStatus('ME_LubOilPressureLow', AlarmStatus.Acknowledged) && !(this.engineRev < this.minRPM && !this.alarmManager.pumpLubOilFlow[0] && this.alarmManager.lubricatingOilPressureLow[0] )){
            this.alarmManager.alarm_OFF(this.source, 'ME_LubOilPressureLow', 'ME Lub Oil Pressure Low');
        }
        if(this.alarmManager.checkAlarmStatus('ME_FuelPumpFail', AlarmStatus.Acknowledged) && !(this.engineRev < this.minRPM && !this.alarmManager.pumpFuelOilFlow[0] && this.alarmManager.fuelOilPressureFlow[0])){
            this.alarmManager.alarm_OFF(this.source, 'ME_FuelPumpFail', 'ME Fuel Pump Fail')
        }

        //engine decrease and lub oil pressure increase
        if(this.alarmManager.checkAlarmStatus('LubOilFilterDiffrentialPressureHigh', AlarmStatus.Acknowledged) && !(this.engineRev < this.minRPM && this.lubOilPressure > this.highPressLubOil && this.alarmManager.pumpLubOilFlow[0] && !this.alarmManager.lubricatingOilPressureLow[0])){
            // console.log("Off the diff")
            this.alarmManager.alarm_OFF(this.source, 'LubOilFilterDiffrentialPressureHigh', 'Lub Oil Filter Diffrential Pressure High')
        }
        if(this.alarmManager.checkAlarmStatus('LubOilSumpTankHighLevel', AlarmStatus.Acknowledged) && !(this.engineRev < this.minRPM && this.lubOilPressure > this.highPressLubOil && this.alarmManager.pumpLubOilFlow[0] && this.alarmManager.pumpBilgeEngineRoom[0] && this.alarmManager.fuelOilLeakageFromHighPressurePipes[0])){
            this.alarmManager.alarm_OFF(this.source, 'LubOilSumpTankHighLevel', 'Lub Oil Sump Tank High Level')
        }

        //engine standby
        if(this.alarmManager.checkAlarmStatus('ME_StartFailure', AlarmStatus.Acknowledged) && !(this.engineStandby && this.alarmManager.pumpFuelOilFlow[0] && this.alarmManager.fuelOilPressureFlow[0])){
            this.alarmManager.alarm_OFF(this.source, 'ME_StartFailure', 'ME StartFailure')
        }

        //Increase engine
        if(this.alarmManager.checkAlarmStatus('ME_OverspeedShutdown', AlarmStatus.Acknowledged) && !(this.engineRev > this.restartRPM && this.alarmManager.pumpFuelOilFlow[0] && this.alarmManager.engineOverspeed[0])){
            this.alarmManager.alarm_OFF(this.source, 'ME_OverspeedShutdown', 'ME Overspeed Shutdown')
        }
        if(this.alarmManager.checkAlarmStatus('LubOilGearTempHigh', AlarmStatus.Acknowledged) && !(this.engineRev > this.restartRPM && this.alarmManager.pumpRawWaterFlowEngine[0] && !this.alarmManager.lubricatingOilPressureLow[0])){
            this.alarmManager.alarm_OFF(this.source, 'LubOilGearTempHigh', 'ME Lub Oil Gear Temp High')
        }

        if(this.alarmManager.checkAlarmStatus('LubOilGearPressureLow', AlarmStatus.Acknowledged) && !(this.engineRev > this.restartRPM && !this.alarmManager.pumpRawWaterFlowEngine[0] && this.alarmManager.lubricatingOilPressureLow[0])){
            this.alarmManager.alarm_OFF(this.source, 'LubOilGearPressureLow', 'ME Lub Oil Gear Pressure Low')
        }

        if(this.alarmManager.checkAlarmStatus('SpeedGovernorFail', AlarmStatus.Acknowledged) && !(this.engineRev > this.restartRPM && this.alarmManager.pumpFuelOilFlow[0] && this.alarmManager.lubricatingOilTemperatureHigh[0])){
            this.alarmManager.alarm_OFF(this.source, 'SpeedGovernorFail', 'Speed Governor Fail')
        }

        if(this.alarmManager.checkAlarmStatus('RemoteControlFail', AlarmStatus.Acknowledged) && !(this.engineRev > this.restartRPM && this.alarmManager.loadPanelSwitch[0] && this.alarmManager.engineOverspeed[0])){
            this.alarmManager.alarm_OFF(this.source, 'RemoteControlFail', 'Remote Control Fail')
        }

        if(this.alarmManager.checkAlarmStatus('VoltageFuseFail', AlarmStatus.Acknowledged) && !(this.engineRev > this.restartRPM && this.alarmManager.ME_InterimCondition[0] && this.alarmManager.engineOverspeed[0])){
            this.alarmManager.alarm_OFF(this.source, 'VoltageFuseFail', 'Voltage / Fuse Fail')
        }

        if(this.alarmManager.checkAlarmStatus('ME_FuelOilInjectPressureLow', AlarmStatus.Acknowledged)  && !(this.engineRev > this.restartRPM && this.alarmManager.ME_InterimCondition[0] && this.alarmManager.engineOverspeed[0])){
            this.alarmManager.alarm_OFF(this.source, 'ME_FuelOilInjectPressureLow', 'ME Fuel Oil Inject Pressure Low')
        }

        //Lub oil decrease
        if(this.alarmManager.checkAlarmStatus('ME_LubOilTemperatureHigh', AlarmStatus.Acknowledged) && !(this.lubOilPressure < this.lowPressLubOil && this.alarmManager.pumpLubOilFlow[0] && this.alarmManager.lubricatingOilTemperatureHigh[0])){
            this.alarmManager.alarm_OFF(this.source, 'ME_LubOilTemperatureHigh', 'ME Lub Oil Temperature High')
        }
        if(this.alarmManager.checkAlarmStatus('LubOilSumpTankLevelLow', AlarmStatus.Acknowledged) && !(this.lubOilPressure < this.lowPressLubOil && this.alarmManager.pumpLubOilFlow[0] && !this.alarmManager.pumpBilgeEngineRoom[0] && this.alarmManager.lubricatingOilPressureLow[0])){
            this.alarmManager.alarm_OFF(this.source, 'LubOilSumpTankLevelLow', 'Lub Oil Sump Tank Level Low')
        }

        //cooling water temp decrease
        if(this.alarmManager.checkAlarmStatus('ME_CoolingWaterPressureLow', AlarmStatus.Acknowledged) && !(this.coolingWaterTemp < this.lowTempCW && !this.alarmManager.pumpRawWaterFlowEngine[0] && this.alarmManager.coolingWaterPressureLow[0])){
            this.alarmManager.alarm_OFF(this.source, 'ME_CoolingWaterPressureLow', 'ME Cooling Water Pressure Low')
        }

        //cooling water temp increase
        if(this.alarmManager.checkAlarmStatus('ME_CoolingWaterHighTemperature', AlarmStatus.Acknowledged) && !(this.coolingWaterTemp > this.highTempCW && this.alarmManager.pumpRawWaterFlowEngine[0] && this.alarmManager.coolingWaterTemperatureHigh[0])){
            this.alarmManager.alarm_OFF(this.source, 'ME_CoolingWaterHighTemperature', 'ME Cooling Water High Temperature')
        }
        if(this.alarmManager.checkAlarmStatus('ME_StopFailure', AlarmStatus.Acknowledged) && !(this.coolingWaterTemp > this.highTempCW && !this.alarmManager.pumpFuelOilFlow[0] && this.alarmManager.coolingWaterTemperatureHigh[0])){
            this.alarmManager.alarm_OFF(this.source, 'ME_StopFailure', 'ME Stop Failure')
        }
    }

    CheckAlarmOff_AE(){
        //engine decrease
        if(this.alarmManager.checkAlarmStatus('AE_FuelOilPressureLow', AlarmStatus.Acknowledged) && !(this.engineRev < this.minRPM && !this.alarmManager.pumpFuelOilFlow[1] && this.alarmManager.fuelOilPressureFlow[1])){
            this.alarmManager.alarm_OFF(this.source, 'AE_FuelOilPressureLow', 'AE Fuel Oil Pressure Low')
        }

        //Increase engine
        if(this.alarmManager.checkAlarmStatus('AE_Overspeed', AlarmStatus.Acknowledged) && !(this.engineRev > this.restartRPM && this.alarmManager.engineOverspeed[1])){
            this.alarmManager.alarm_OFF(this.source, 'AE_Overspeed', 'AE Overspeed')
        }

        //workload increase
        if(this.alarmManager.checkAlarmStatus('AE_CoolingWaterTempHigh', AlarmStatus.Acknowledged) && !(this.workload > this.workloadMax && this.alarmManager.pumpRawWaterFlowEngine[1] && this.alarmManager.coolingWaterTemperatureHigh[1])){
            this.alarmManager.alarm_OFF(this.source, 'AE_CoolingWaterTempHigh', 'AE Cooling Water Temp High')
        }
        if(this.alarmManager.checkAlarmStatus('AE_LubOilTemperatureHigh', AlarmStatus.Acknowledged) && !(this.workload > this.workloadMax && this.alarmManager.pumpLubOilFlow[1] && this.alarmManager.lubricatingOilTemperatureHigh[1])){
            this.alarmManager.alarm_OFF(this.source, 'AE_LubOilTemperatureHigh', 'AE Lub Oil Temperature High')
        }
        if(this.alarmManager.checkAlarmStatus('AE_LubOilPressureLow', AlarmStatus.Acknowledged) && !(this.workload > this.workloadMax && !this.alarmManager.pumpLubOilFlow[1] && this.alarmManager.lubricatingOilPressureLow[1])){
            this.alarmManager.alarm_OFF(this.source, 'AE_LubOilPressureLow', 'AE Lub Oil Pressure Low')
        }

        //workload decrease
        if(this.alarmManager.checkAlarmStatus('AE_CoolingWaterPressureLow', AlarmStatus.Acknowledged) && !(this.workload < this.workloadMin && !this.alarmManager.pumpRawWaterFlowEngine[1] && this.alarmManager.coolingWaterPressureLow[1])){
            this.alarmManager.alarm_OFF(this.source, 'AE_CoolingWaterPressureLow', 'AE Cooling Water Pressure Low')
        }
        if(this.alarmManager.checkAlarmStatus('AE_FuelOilLeakage', AlarmStatus.Acknowledged) && !(this.workload < this.workloadMin && !this.alarmManager.pumpBilgeEngineRoom[1] && this.alarmManager.fuelOilLeakageFromHighPressurePipes[1])){
            this.alarmManager.alarm_OFF(this.source, 'AE_FuelOilLeakage', 'AE Fuel Oil Leakage')
        }
    }

}