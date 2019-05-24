import {expect} from 'chai';
import ParkingLot from '../parking.lot';
import Slot from '../slot';
import Car from '../car';

describe('ParkingLot', () => {
  it('can be initialized with a specific size', () => {
    const parkingLot = new ParkingLot(5);
    expect(parkingLot.size()).to.equal(5);
  });

  describe('addSlot', () => {
    it ('can add a new slot', () => {
      const parkingLot = new ParkingLot(5);
      expect(parkingLot.size()).to.equal(5);
      parkingLot.addSlot();
      expect(parkingLot.size()).to.equal(6);
    });
  });

  describe('removeSlot', () => {
    it ('can remove a slot if the slot number exists', () => {
      const parkingLot = new ParkingLot(5);
      expect(parkingLot.size()).to.equal(5);
      parkingLot.removeSlot('3');
      expect(parkingLot.size()).to.equal(4);
    });

    it ('will not remove a slot if the slot number does not exist', () => {
      const parkingLot = new ParkingLot(5);
      expect(parkingLot.size()).to.equal(5);
      parkingLot.removeSlot('9');
      expect(parkingLot.size()).to.equal(5);
    });
  });

  describe('park', () => {
    it ('will park a car to free slot', () => {
      const parkingLot = new ParkingLot(5);
      const status = parkingLot.park(new Car('1234', 'Red'));
      expect(status).to.equal('Allocated slot number: 1');
    });

    it ('will not allow to park if the lot does not have empty slots', () => {
      const parkingLot = new ParkingLot(2);
      parkingLot.park(new Car('1234', 'Red'));
      parkingLot.park(new Car('1233', 'Green'));
      const lastStatus = parkingLot.park(new Car('12336', 'Lime'));
      expect(lastStatus).to.equal('Sorry, parking lot is full');
    });

    it ('will not allow to park a car if its already tracked as parked', () => {
      const parkingLot = new ParkingLot(4);
      const car = new Car('1234', 'Red');
      parkingLot.park(car);
      const lastStatus = parkingLot.park(car);
      expect(lastStatus).to.equal('Sorry, a car with similar registration number is already parked');
    });
  });

  describe('leave', () => {
    it ('will free a slot', () => {
      const parkingLot = new ParkingLot(2);
      parkingLot.park(new Car('1234', 'Red'));
      parkingLot.park(new Car('12345', 'Blue'));
      expect(parkingLot.freeSize()).to.equal(0);
      const status = parkingLot.leave('1');
      expect(status).to.equal('Slot number 1 is free');
      expect(parkingLot.freeSize()).to.equal(1);

    });
  });
});


