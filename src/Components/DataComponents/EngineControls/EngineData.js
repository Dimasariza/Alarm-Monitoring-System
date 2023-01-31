import {EventEmitter} from 'events'

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
    
    constructor(alarmManager, source) {
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
        this.engineTrip = false
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
    }
        
    updateEngineData(engineRPM, coolantTemp, OilPressure, workload){
        if(this.engineTrip) return;
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

        if(this.engineRev > this.stopRPM){
            if(this.source == "Main Engine"){
                // this.alarmManager.pumpFuelOilFlow = true
                // this.alarmManager.engineOverspeed = true
                if(this.alarmManager.pumpFuelOilFlow && this.alarmManager.engineOverspeed){
                    this.alarmManager.alarm_ON(this.source, 'ME_OverspeedShutdown', 'ME Overspeed Shutdown')
                }

                if(this.alarmManager.pumpRawWaterFlowEngine && !this.alarmManager.lubricatingOilPressureLow){
                    this.alarmManager.alarm_ON(this.source, 'MELubOilGearTempHigh', 'ME Lub Oil Gear Temp High')
                }

                if(!this.alarmManager.pumpRawWaterFlowEngine && this.alarmManager.lubricatingOilPressureLow){
                    this.alarmManager.alarm_ON(this.source, 'MELubOilGearPressureLow', 'ME Lub Oil Gear Pressure Low')
                }

                if(this.alarmManager.pumpFuelOilFlow && this.alarmManager.lubricatingOilTemperatureHigh){
                    this.alarmManager.alarm_ON(this.source, 'SpeedGovernorFail', 'Speed Governor Fail')
                }

                if(this.alarmManager.loadPanelSwitch && this.alarmManager.engineOverspeed){
                    this.alarmManager.alarm_ON(this.source, 'RemoteControlFail', 'Remote Control Fail')
                }


                // // Interm
                // // this.alarmManager.battreyFault = false
                // // this.alarmManager.engineOverspeed = true
                // if(!this.alarmManager.battreyFault && this.alarmManager.engineOverspeed){
                //     this.alarmManager.alarm_ON(this.source, 'VoltageFuseFail', 'Voltage / Fuse Fail')
                // }

                // if(!this.alarmManager.pumpFuelOilFlow && this.alarmManager.engineOverspeed){
                //     this.alarmManager.alarm_ON(this.source, 'MEFuelOilInjectPressureLow', 'ME Fuel Oil Inject Pressure Low')
                // }
                this.ME_InterimCondition = true
            }
            this.setEngineTrip();
        }else{
            if(this.source == "Main Engine"){
                if(this.alarmManager.pumpFuelOilFlow && this.alarmManager.engineOverspeed){
                    this.alarmManager.alarm_OFF(this.source, 'ME_OverspeedShutdown', 'ME Overspeed Shutdown')
                }
                if(this.alarmManager.pumpRawWaterFlowEngine && !this.alarmManager.lubricatingOilPressureLow){
                    this.alarmManager.alarm_OFF(this.source, 'MELubOilGearTempHigh', 'ME Lub Oil Gear Temp High')
                }

                if(!this.alarmManager.pumpRawWaterFlowEngine && this.alarmManager.lubricatingOilPressureLow){
                    this.alarmManager.alarm_OFF(this.source, 'MELubOilGearPressureLow', 'ME Lub Oil Gear Pressure Low')
                }

                if(this.alarmManager.pumpFuelOilFlow && this.alarmManager.lubricatingOilTemperatureHigh){
                    this.alarmManager.alarm_OFF(this.source, 'SpeedGovernorFail', 'Speed Governor Fail')
                }

                if(this.alarmManager.loadPanelSwitch && this.alarmManager.engineOverspeed){
                    this.alarmManager.alarm_OFF(this.source, 'RemoteControlFail', 'Remote Control Fail')
                }

                if(!this.alarmManager.battreyFault && this.alarmManager.engineOverspeed){
                    this.alarmManager.alarm_OFF(this.source, 'VoltageFuseFail', 'Voltage / Fuse Fail')
                }

                if(!this.alarmManager.pumpFuelOilFlow && this.alarmManager.engineOverspeed){
                    this.alarmManager.alarm_OFF(this.source, 'MEFuelOilInjectPressureLow', 'ME Fuel Oil Inject Pressure Low')
                }
                this.ME_InterimCondition = false
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

        if(this.lubOilPressure < this.lowPressLubOil){
            // console.log("Lower");
            // this.alarmManager.alarm_ON(this.source, 'lowPressureLubOil', 'Low Lub. Oil Pressure')
            this.setEngineTrip()
        }else{
            // this.alarmManager.alarm_OFF(this.source, 'lowPressureLubOil', 'Low Lub. Oil Pressure')
        }
        
        if(this.lubOilPressure > this.highPressLubOil){
            // console.log("Higher");
            // this.alarmManager.alarm_ON(this.source, 'highPressureLubOil', 'High Lub. Oil Pressure')
        }else{
            // console.log("Neither");
            // this.alarmManager.alarm_OFF(this.source, 'highPressureLubOil', 'High Lub. Oil Pressure')
        }

        if(this.coolingWaterTemp < this.lowTempCW){
            // console.log("Lower");
            // this.alarmManager.alarm_ON(this.source, 'lowTempWC', 'Low Cooling Water Temperature')
        }else{
            // this.alarmManager.alarm_OFF(this.source, 'lowTempWC', 'Low Cooling Water Temperature')
        }
        
        // console.log(this.coolingWaterTemp, this.highTempCW)
        if(this.coolingWaterTemp > this.highTempCW){
            // this.alarmManager.pumpFuelOilFlow = false
            // this.alarmManager.coolingWaterTemperatureHigh = true
            if(this.source == "Main Engine" && !this.alarmManager.pumpFuelOilFlow && this.alarmManager.coolingWaterTemperatureHigh){
                this.alarmManager.alarm_ON("Main Engine", 'ME_StopFailure', 'ME Stop Failure')
            }
            this.setEngineTrip()
        }else{
            if(this.source == "Main Engine" && !this.alarmManager.pumpFuelOilFlow && this.alarmManager.coolingWaterTemperatureHigh){
                this.alarmManager.alarm_OFF("Main Engine", 'ME_StopFailure', 'ME Stop Failure')
            }
        }

        if(this.source == "Aux Engine"){
            // this.alarmManager.pumpRawWaterFlowEngine = true
            // this.alarmManager.coolingWaterTemperatureHigh = true
            if(this.workload > this.workloadLimit){
                if(this.alarmManager.pumpRawWaterFlowEngine && this.alarmManager.coolingWaterTemperatureHigh){
                    this.alarmManager.alarm_ON("Aux Engine", 'AE_CoolingWaterTempHigh', 'AE Cooling Water Temp High')
                }
            }else{
                // this.alarmManager.pumpRawWaterFlowEngine = false
                // this.alarmManager.coolingWaterTemperatureHigh = true
                if(!this.alarmManager.pumpRawWaterFlowEngine && this.alarmManager.coolingWaterTemperatureHigh){
                    this.alarmManager.alarm_OFF("Aux Engine", 'AE_CoolingWaterTempHigh', 'AE Cooling Water Temp High')
                }
            }
    
            if(this.workload < this.workloadLimit){
                if(this.alarmManager.pumpRawWaterFlowEngine && this.alarmManager.coolingWaterTemperatureHigh){
                    this.alarmManager.alarm_ON(this.source, 'AE_CoolingWaterPressureLow', 'AE Cooling Water Pressure Low')
                }
            }else{
                if(!this.alarmManager.pumpRawWaterFlowEngine && this.alarmManager.coolingWaterTemperatureHigh){
                    this.alarmManager.alarm_OFF(this.source, 'AE_CoolingWaterPressureLow', 'AE Cooling Water Pressure Low')
                }
            }
        }

        
    }
}