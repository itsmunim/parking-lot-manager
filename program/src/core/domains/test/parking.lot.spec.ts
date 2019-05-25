import {expect} from 'chai';
import ParkingLot from '../parking.lot';
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

  describe('registrationNumbersForCarsWithColor', () => {
    it ('will return registration numbers of cars with same color, as comma separated string', () => {
      const parkingLot = new ParkingLot(5);
      parkingLot.park(new Car('12347', 'Red'));
      parkingLot.park(new Car('12345', 'Blue'));
      parkingLot.park(new Car('12341', 'Grey'));
      parkingLot.park(new Car('12346', 'Blue'));
      expect(parkingLot.registrationNumbersForCarsWithColor('Blue')).to.equal('12345, 12346');
    });

    it ('will return empty string when no color is given', () => {
      const parkingLot = new ParkingLot(5);
      parkingLot.park(new Car('12347', 'Red'));
      parkingLot.park(new Car('12345', 'Blue'));
      parkingLot.park(new Car('12341', 'Grey'));
      parkingLot.park(new Car('12346', 'Blue'));
      expect(parkingLot.registrationNumbersForCarsWithColor('')).to.equal('');
    });
  });

  describe('slotNumbersForCarsWithColour', () => {
    it ('will return slot numbers for cars with same color, as comma separated string', () => {
      const parkingLot = new ParkingLot(5);
      parkingLot.park(new Car('12347', 'Red'));
      parkingLot.park(new Car('12345', 'Blue'));
      parkingLot.park(new Car('12341', 'Grey'));
      parkingLot.park(new Car('12346', 'Blue'));
      expect(parkingLot.slotNumbersForCarsWithColour('Blue')).to.equal('2, 4');
    });
  });

  describe('slotNumberForRegistrationNumber', () => {
    it ('will return slot number of the car with specified reg number', () => {
      const parkingLot = new ParkingLot(5);
      parkingLot.park(new Car('12347', 'Red'));
      parkingLot.park(new Car('12345', 'Blue'));
      parkingLot.park(new Car('12341', 'Grey'));
      parkingLot.park(new Car('12346', 'Blue'));
      expect(parkingLot.slotNumberForRegistrationNumber('12341')).to.equal('3');
      expect(parkingLot.slotNumberForRegistrationNumber('12347')).to.equal('1');
    });

    it ('will return `Not found` if the car with specified reg number is not parked', () => {
      const parkingLot = new ParkingLot(5);
      parkingLot.park(new Car('12347', 'Red'));
      parkingLot.park(new Car('12345', 'Blue'));
      expect(parkingLot.slotNumberForRegistrationNumber('12348')).to.equal('Not found');
    });
  });

  describe('status', () => {
    it ('returns the status of the parking lot in specific format', () => {
      const parkingLot = new ParkingLot(5);
      parkingLot.park(new Car('12347', 'Red'));
      let expectedStr = `Slot No.${''.padEnd(2)}Registration No${''.padEnd(4)}Colour\n`;
      expectedStr += `1${''.padEnd(9)}12347${''.padEnd(6)}Red\n`;
      expect(parkingLot.status()).to.equal(expectedStr);
    });
  });
});


