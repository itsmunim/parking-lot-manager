import Car from './car';

export default class Slot {
  slotId: string;
  isFree: boolean;
  _car: Car;

  constructor(slotId: string, car: Car = null) {
    this.slotId = slotId;
    this.car = car;
  }

  get car() {
    return this._car;
  }

  set car(car: Car) {
    this._car = car;
    this.isFree = !this._car;
  }
}
