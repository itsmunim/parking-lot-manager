import ParkingLotManager from './parking.lot.manager';
import get from 'lodash/get';

export default class Orchestrator {
  _parkingLotManagersMap: Object = {};
  _parkingRule: String = 'fillFirst';

  createParkingLotManager(lotSize: number): number {
    const _parkingLotManagerId = Object.keys(this._parkingLotManagersMap).length + 1;
    this._parkingLotManagersMap[_parkingLotManagerId] = new ParkingLotManager(lotSize);
    return Object.keys(this._parkingLotManagersMap).length;
  }

  setParkingRule(parkingRule: string) {
    this._parkingRule = parkingRule;
  }

  park(carRegNumber: string, carBodyColor: string): string {
    switch (this._parkingRule) {
      case 'fillFirst': {
        const foundFreeParkingLotManager = Object.values(this._parkingLotManagersMap)
          .filter(manager => manager.parkingLot.freeSize() > 0);

        if (!foundFreeParkingLotManager.length) {
          return 'Sorry, none of the parking lots are empty';
        }
        return foundFreeParkingLotManager[0].park(carRegNumber, carBodyColor);
      }

      case 'evenDistribution': {
        let occupancyPercentages = [];
        Object.keys(this._parkingLotManagersMap).forEach(key => {
          const parkingLot = this._parkingLotManagersMap[key].parkingLot;
          occupancyPercentages.push({
            key,
            percentage: parkingLot.freeSize() / parkingLot.size()
          });
        });

        occupancyPercentages.sort(obj => obj.percentage).reverse();
        console.log('occupancyPercentages', occupancyPercentages);

        if (occupancyPercentages[0].percentage >= 1) {
          console.log('occupancyPercentages[0]', occupancyPercentages[0]);
          return 'Sorry, none of the parking lots are empty';
        }

        return this._parkingLotManagersMap[occupancyPercentages[0].key].park(carRegNumber, carBodyColor);
      }
    }
  }

  // leave(slotNo: string): string {
  //   return this._parkingLot.leave(slotNo);
  // }

  // status(): string {
  //   return this._parkingLot.status();
  // }

  // registrationNumbersForCarsWithColour(bodyColor: string): string {
  //   return this._parkingLot.registrationNumbersForCarsWithColour(bodyColor);
  // }

  // slotNumbersForCarsWithColour(bodyColor: string): string {
  //   return this._parkingLot.slotNumbersForCarsWithColour(bodyColor);
  // }

  // slotNumberForRegistrationNumber(regNumber: string): string {
  //   return this._parkingLot.slotNumberForRegistrationNumber(regNumber);
  // }
}
