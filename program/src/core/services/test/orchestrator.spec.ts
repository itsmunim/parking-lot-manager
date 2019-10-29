import { expect } from 'chai';
import Orchestrator from '../orchestrator';

describe('Orchestrator', () => {
  describe('createParkingLotManager', () => {
    it('will create a parking lot manager and return the number of created parking lot managers', () => {
      const orchestrator = new Orchestrator();
      const created = orchestrator.createParkingLotManager(5);
      expect(created).to.equal(1);
      const created2 = orchestrator.createParkingLotManager(3);
      expect(created2).to.equal(2);
    });
  });

  describe('park', () => {
    it('will be able to park a car in the empty parking lot', () => {
      const orchestrator = new Orchestrator();
      orchestrator.createParkingLotManager(1);
      orchestrator.createParkingLotManager(1);
      const status = orchestrator.park('1234', 'white');
      expect(status).to.equal('Allocated slot number: 1');
      const status2 = orchestrator.park('12345', 'red');
      expect(status2).to.equal('Allocated slot number: 1');
      const status3 = orchestrator.park('1242', 'black');
      expect(status3).to.equal('Sorry, none of the parking lots are empty');
    });

    it('will be able to park a car in the emptiest parking lot', () => {
      const orchestrator = new Orchestrator();
      orchestrator.createParkingLotManager(2);
      orchestrator.createParkingLotManager(2);
      orchestrator.setParkingRule('evenDistribution');
      [
        { color: 'white', no: '1234', expected: 1 },
        { color: 'red', no: '12345', expected: 1 },
        { color: 'black', no: '123456', expected: 2 },
        { color: 'red', no: '1234567', expected: 2 },
        { color: 'red', no: '123' }
      ].forEach(function (cs) {
        const status = orchestrator.park(cs.no, cs.color);
        if (cs.expected) {
          expect(status).to.equal(`Allocated slot number: ${cs.expected}`);
        } else {
          expect(status).to.equal('Sorry, none of the parking lots are empty');
        }
      });
    });
  });
});


