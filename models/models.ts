export class Weather {
    constructor(public name: string, public craterMultiplier: number, public allowedVehicles: string[]) {}
}
export class Vehicle {
    constructor(public name: string, public maxSpeed: number, public minutesPerCrater: number) {}
}
export class Orbit {
    constructor(public name: string, public distance: number, public totalCraters: number, public orbitTrafficSpeed: number = 0) {}
    
    getAffectedOrbit(weather: Weather, orbitTrafficSpeed: number): Orbit {
        const affectedTotalCraters = this.totalCraters * weather.craterMultiplier;
        return new Orbit(this.name, this.distance, affectedTotalCraters, orbitTrafficSpeed);
    }
}