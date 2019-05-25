import ParkingLot from '../domains/parking.lot';
import Car from '../domains/car';

export default class ParkingLotManager {
  _parkingLot: ParkingLot = null;
  constructor(lotSize: number) {
    if (!lotSize) {
      throw new Error('A size for parking lot has to be given');
    }
    this._parkingLot = new ParkingLot(lotSize);
  }

  get parkingLot() {
    return this._parkingLot;
  }

  park(carRegNumber: string, carBodyColor: string): string {
    return this._parkingLot.park(new Car(carRegNumber, carBodyColor));
  }

  leave(slotNo: string): string {
    return this._parkingLot.leave(slotNo);
  }

  status(): string {
    return this._parkingLot.status();
  }

  registrationNumbersForCarsWithColor(bodyColor: string): string {
    return this._parkingLot.registrationNumbersForCarsWithColor(bodyColor);
  }

  slotNumbersForCarsWithColour(bodyColor: string): string {
    return this._parkingLot.slotNumbersForCarsWithColour(bodyColor);
  }

  slotNumberForRegistrationNumber(regNumber: string): string {
    return this._parkingLot.slotNumberForRegistrationNumber(regNumber);
  }
}
