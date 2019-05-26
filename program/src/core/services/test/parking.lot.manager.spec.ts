import {expect} from 'chai';
import ParkingLotManager from '../parking.lot.manager';

describe('ParkingLotManager', () => {
  it('should be initialised properly', () => {
    const parkingLotManager = new ParkingLotManager(2);
    expect(parkingLotManager.parkingLot).not.to.be.empty;
  });

  describe('park', () => {
    it ('will park a car with reg number and color', () => {
      const parkingLotManager = new ParkingLotManager(2);
      const status = parkingLotManager.park('1234', 'White');
      expect(status).to.equal('Allocated slot number: 1');
    });

    it ('will not allow to park if the lot does not have empty slots', () => {
      const parkingLotManager = new ParkingLotManager(2);
      parkingLotManager.park('1234', 'White');
      parkingLotManager.park('1244', 'White');
      const lastStatus = parkingLotManager.park('1235', 'Red');
      expect(lastStatus).to.equal('Sorry, parking lot is full');
    });
  });

  describe('leave', () => {
    it ('will free a slot', () => {
      const parkingLotManager = new ParkingLotManager(2);
      parkingLotManager.park('1234', 'White');
      parkingLotManager.park('1244', 'White');
      const lastStatus = parkingLotManager.park('1235', 'Red');
      expect(lastStatus).to.equal('Sorry, parking lot is full');
      const status = parkingLotManager.leave('1');
      expect(status).to.equal('Slot number 1 is free');
      const finalStatus = parkingLotManager.park('1235', 'Red');
      expect(finalStatus).to.equal('Allocated slot number: 1');

    });
  });

  describe('registrationNumbersForCarsWithColour', () => {
    it ('will return registration numbers of cars with same color, as comma separated string', () => {
      const parkingLotManager = new ParkingLotManager(5);
      parkingLotManager.park('1234', 'White');
      parkingLotManager.park('1244', 'Red');
      parkingLotManager.park('1254', 'Blue');
      parkingLotManager.park('1264', 'White');
      parkingLotManager.park('1274', 'White');
      expect(parkingLotManager.registrationNumbersForCarsWithColour('White')).to.equal('1234, 1264, 1274');
    });
  });

  describe('slotNumbersForCarsWithColour', () => {
    it ('will return slot numbers for cars with same color, as comma separated string', () => {
      const parkingLotManager = new ParkingLotManager(5);
      parkingLotManager.park('1234', 'White');
      parkingLotManager.park('1244', 'Red');
      parkingLotManager.park('1254', 'Blue');
      parkingLotManager.park('1264', 'White');
      parkingLotManager.park('1274', 'White');
      expect(parkingLotManager.slotNumbersForCarsWithColour('White')).to.equal('1, 4, 5');
    });
  });

  describe('slotNumberForRegistrationNumber', () => {
    it ('will return slot number of the car with specified reg number', () => {
      const parkingLotManager = new ParkingLotManager(5);
      parkingLotManager.park('1234', 'White');
      parkingLotManager.park('1244', 'Red');
      expect(parkingLotManager.slotNumberForRegistrationNumber('1244')).to.equal('2');
    });
  });

  describe('status', () => {
    it ('returns the status of the parking lot in specific format', () => {
      const parkingLotManager = new ParkingLotManager(5);
      parkingLotManager.park('12347', 'Red');
      let expectedStr = `Slot No.${''.padEnd(4)}Registration No${''.padEnd(4)}Colour\n`;
      expectedStr += `1${''.padEnd(11)}12347${''.padEnd(6)}Red\n`;
      expect(parkingLotManager.status()).to.equal(expectedStr);
    });
  });
});


