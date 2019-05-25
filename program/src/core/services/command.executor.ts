import {Interface} from 'readline';
import chalk from 'chalk';
import ParkingLotManager from './parking.lot.manager';

enum InterfaceType {File, STDIN};

class CommandExecutor {
  _readInterface: Interface = null;
  _type: InterfaceType;
  _parkingLotManagerInstance: ParkingLotManager = null;

  constructor(readInterface: Interface, type: InterfaceType) {
    if (!readInterface) {
      throw new Error('A read interface is needed');
    }
    this._readInterface = readInterface;
    this._type = type ? type : InterfaceType.STDIN;
  }

  getParkingLotManagerInstance(size?: number) {
    if (!this._parkingLotManagerInstance && size) {
      this._parkingLotManagerInstance = new ParkingLotManager(size);
      this._log(`Created a parking lot with ${size} slots`);
    }

    return this._parkingLotManagerInstance;
  }

  process() {
    if (this._type === InterfaceType.STDIN) {
      this._readInterface.prompt();
    }

    this._readInterface.on('line', (line: string) => {
      const commands = line.split(' ');

      if (commands.length === 0 || commands[0].trim() === '') {
        this._log('Invalid command. Try again', 'error');
      } else {
        if (this._type === InterfaceType.STDIN && commands[0].toLowerCase() === 'exit') {
          this._readInterface.close();
        }

        const normalisedCommand = this._toCamelCase(commands[0]);
        const parkingLotSize = this._isParkingLotCreationCommand(normalisedCommand) ? parseInt(commands[1]) : null;
        const parkingLotManager = this.getParkingLotManagerInstance(parkingLotSize);

        if (!parkingLotManager) {
          this._log('A parking lot needs to be created first. Try: create_parking_lot 6', 'error');
        } else {
          if (normalisedCommand in parkingLotManager) {
            this._log(parkingLotManager[normalisedCommand](...commands.slice(1)));
          }
        }
      }

      // Keep on the interactive shell
      if (this._type === InterfaceType.STDIN) {
        this._readInterface.prompt();
      }
    });

    this._readInterface.on('close', () => process.exit(0));
  }

  _log(message: string, level?: string) {
    const chalkFn = level === 'error'
      ? chalk.red
      : (level === 'warn' ? chalk.yellowBright : chalk.green);
    console.log(chalkFn(message));
  }

  _isParkingLotCreationCommand(command: string): boolean {
    return command === 'createParkingLot';
  }

  _toCamelCase(snakeCaseStr: string): string {
    return snakeCaseStr.replace(/_([a-z])/g, m => m[1].toUpperCase());
  }
}

export {
  CommandExecutor,
  InterfaceType
}
