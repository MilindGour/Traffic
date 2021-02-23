import { Orbit, Vehicle, Weather } from "./models";

type ListObject<T> = { [key: string]: T };
type ComboTriplet = [ string, string, number ];

export class TrafficManager {
    allWeathers: ListObject<Weather> = {
        'SUNNY': new Weather('SUNNY', 0.9, ['BIKE', 'TUKTUK', 'CAR']),
        'RAINY': new Weather('RAINY', 1.2, ['TUKTUK', 'CAR']),
        'WINDY': new Weather('SUNNY', 1.0, ['BIKE', 'CAR'])
    };
    allVehicles: ListObject<Vehicle> = {
        'BIKE': new Vehicle('BIKE', 10, 2),
        'TUKTUK': new Vehicle('TUKTUK', 12, 1),
        'CAR': new Vehicle('CAR', 20, 3)
    };
    allOrbits: ListObject<Orbit> = {
        'ORBIT1': new Orbit('ORBIT1', 18, 20),
        'ORBIT2': new Orbit('ORBIT2', 20, 10)
    };

    getFastestOption(weatherName: string, orbit1TrafficSpeed: number, orbit2TrafficSpeed: number) {
        const weather: Weather = this.allWeathers[weatherName.toUpperCase()];
        const allowedVehicleNames: string[] = weather.allowedVehicles;
        
        const affectedOrbit1 = this.allOrbits['ORBIT1'].getAffectedOrbit(weather, orbit1TrafficSpeed);
        const affectedOrbit2 = this.allOrbits['ORBIT2'].getAffectedOrbit(weather, orbit2TrafficSpeed);

        const [resultVehicleName, resultOrbitName, ] = this.computeFastestCombo(affectedOrbit1, affectedOrbit2, allowedVehicleNames);

        return `${resultVehicleName} ${resultOrbitName}`;
    }
    private computeFastestCombo(affectedOrbit1: Orbit, affectedOrbit2: Orbit, allowedVehicleNames: string[]) {
        let minCombo: ComboTriplet = ['', '', 999999];
        allowedVehicleNames.forEach(v => {
            const triplet1 = this.getComboTripet(v, affectedOrbit1);
            const triplet2 = this.getComboTripet(v, affectedOrbit2);
            minCombo = this.min(minCombo, triplet1, triplet2);
        });
        return minCombo;
    }
    private getComboTripet(vehicleName: string, orbit: Orbit): ComboTriplet {
        const vehicle = this.allVehicles[vehicleName];
        const vehicleSpeed = Math.min(vehicle.maxSpeed, orbit.orbitTrafficSpeed);
        const craterTime = vehicle.minutesPerCrater * orbit.totalCraters; // in minutes
        const travelTime = (orbit.distance / vehicleSpeed) * 60; // hour to minute convert
        const totalTime = craterTime + travelTime;

        return [vehicleName, orbit.name, totalTime];
    }
    private min(...triplets: ComboTriplet[]): ComboTriplet {
        return triplets.reduce((min, curr) => this.minComparer(min, curr));
    }
    private minComparer(a: ComboTriplet, b: ComboTriplet): ComboTriplet {
        return b[2] < a[2] ? b : a; 
    }
}