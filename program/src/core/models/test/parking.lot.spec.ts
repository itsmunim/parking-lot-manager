import {expect} from 'chai';
import ParkingLot from '../parking.lot';
import Slot from '../slot';
import Car from '../car';

describe('ParkingLot', () => {
  it('can be initialized with a specific size', () => {
    const parkingLot = new ParkingLot(5);
    expect(parkingLot.size()).to.equal(5);
  });
});


