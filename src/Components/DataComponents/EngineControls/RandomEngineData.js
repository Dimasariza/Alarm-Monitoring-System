import EngineData from "./EngineData";

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomFloatFromInterval(min, max) { // min and max included 
    return Math.random() * (max - min + 1) + min
}

export default class RandomEngineData extends EngineData{

    constructor() {
        super()
        this.engineTemperature = [
            randomIntFromInterval(0, 600),
            randomIntFromInterval(0, 600),
            randomIntFromInterval(0, 600),
            randomIntFromInterval(0, 600),
            randomIntFromInterval(0, 600),
            randomIntFromInterval(0, 600),
            randomIntFromInterval(0, 600),
            randomIntFromInterval(0, 600)];
        this.engineRev = randomIntFromInterval(0, 2000);
        this.shaftRev = randomIntFromInterval(0, 2000);
        this.lubOilPressure = Math.random();
        this.boostPressure = Math.random() * 0.3;
        this.coolingWaterTemp = randomIntFromInterval(0, 120);
        this.exhaustTemp = randomIntFromInterval(0, 700);
        this.runningHour = randomIntFromInterval(0, 10000);
        this.battreyVolt = randomFloatFromInterval(0, 30);
        this.battreyLife = randomIntFromInterval(0, 100);
    }

    updateEngineData(engineRPM, coolantTemp, OilPressure, HydraulicPressure){
        this.engineRev = engineRPM / 1023 * this.maxEngineRev;
        this.coolingWaterTemp = coolantTemp / 1023 * this.maxCoolingWaterTemp;
        this.lubOilPressure = OilPressure / 1023 * this.maxLubOilPressure;
        this.boostPressure = HydraulicPressure / 1023 * this.maxBoostPressure;
    }

    
}