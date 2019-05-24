import Slot from './slot';
import Car from './Car';

export default class ParkingLot {
  _lotMap: { [key: string]: Slot } = {};
  _lastSlotId: number = 0;

  constructor(size: number) {
    while (this._lastSlotId <= size) {
      this.addSlot();
    }
  }

  /**
   * Adds a new slot to the parking lot.
   */
  addSlot() {
    this._lastSlotId++;
    const slotId = `${this._lastSlotId}`;
    this._lotMap[slotId] = new Slot(slotId);
  }

  /**
   * Removes the specified slot.
   * @param {string} slotId The slot number
   */
  removeSlot(slotId: string) {
    delete this._lotMap[slotId];
  }

  /**
   * Parks the given car in an available slot and returns a
   * status message showing if parking happened or the lot
   * was full.
   * @param {Car} car The car to be parked
   * @returns {string} A simple status message
   */
  park(car: Car): string {
    let freeSlotId = '';
    for (let slotId of Object.keys(this._lotMap)) {
      if (this._lotMap[slotId].isFree) {
        freeSlotId = slotId;
        break;
      }
    }

    if (!freeSlotId) {
      return 'Sorry, parking lot is full';
    }

    this._lotMap[freeSlotId].car = car;
    return `Allocated slot number: ${freeSlotId}`;
  }

  /**
   * Makes a car in specified slot to leave.
   * @param {string} slotId The slot number to be freed
   */
  leave(slotId: string): string {
    this._lotMap[slotId].car = null;
    return `Slot number ${slotId} is free`;
  }

  /**
   * Shows the current status of the parking lot. Only
   * the occupied slots.
   */
  status(): string {
    const spaced = (count: number): string => ''.padEnd(count);
    let parkingLotStatus = `Slot No.${spaced(2)}Registration No${spaced(4)}Colour\n`;

    Object.keys(this._lotMap).forEach((slotId: string) => {
      if (!this._lotMap[slotId].isFree) {
        const {regNumber, bodyColor} = this._lotMap[slotId].car;
        parkingLotStatus += `${slotId}${spaced(9)}${regNumber}${spaced(6)}${bodyColor}\n`;
      }
    });

    return parkingLotStatus;
  }
}
