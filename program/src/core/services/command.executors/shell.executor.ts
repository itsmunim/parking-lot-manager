import {Interface, createInterface} from 'readline';
import chalk from 'chalk';
import ParkingLotManager from '../parking.lot.manager';
import {ExecutorType} from './executor.type';

export default class ShellExecutor {
  _readInterface: Interface = null;
  _type: ExecutorType;
  _parkingLotManagerInstance: ParkingLotManager = null;

  constructor(type?: ExecutorType, readInterface?: Interface) {
    this._readInterface = readInterface || createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this._type = type ? type : ExecutorType.SHELL;
  }

  set readInterface(readInterface: Interface) {
    this._readInterface = readInterface;
  }

  process() {
    if (!this._readInterface) {
      throw new Error('No read interface is available');
    }

    if (this._isShellExecutor()) {
      this._readInterface.prompt();
    }

    this._readInterface.on('line', (line: string) => {
      this._onSingleLineExecutionDone(this._onSingleLineExecute(line));

      // Keep on the interactive shell
      if (this._isShellExecutor()) {
        this._readInterface.prompt();
      }
    });

    this._readInterface.on('close', () => this._onWholeExecutionFinish());
  }

  _onSingleLineExecute(line: string): string {
    const commands = line.split(' ');
    if (commands.length === 0 || commands[0].trim() === '') {
      return 'Invalid command. Try again';
    }

    if (this._isShellExecutor() && commands[0].toLowerCase() === 'exit') {
      this._readInterface.close();
    }

    const normalisedCommand = this._toCamelCase(commands[0]);
    if (this._isParkingLotCreationCommand(normalisedCommand)) {
      const parkingLotSize = this._isParkingLotCreationCommand(normalisedCommand) ? parseInt(commands[1]) : null;
      return this._createParkingLotManager(parkingLotSize);
    }

    return !this._parkingLotManagerInstance
      ? 'A parking lot needs to be created first. Try: create_parking_lot 6'
      : this._executeCommand(normalisedCommand, commands.slice(1));
  }

  _onSingleLineExecutionDone(output: string) {
    this.log(output);
  }

  _onWholeExecutionFinish() {
    process.exit(0);
  }

  _createParkingLotManager(size: number) {
    this._parkingLotManagerInstance = new ParkingLotManager(size);
    return `Created a parking lot with ${size} slots`;
  }

  _executeCommand(command, args) {
    if (command in this._parkingLotManagerInstance) {
      return this._parkingLotManagerInstance[command](...args);
    }
  }

  log(message: string, level?: string) {
    const chalkFn = level === 'error'
      ? chalk.red
      : (level === 'warn' ? chalk.yellowBright : chalk.green);
    console.log(chalkFn(message));
  }

  _isShellExecutor() {
    return this._type === ExecutorType.SHELL;
  }

  _isParkingLotCreationCommand(command: string): boolean {
    return command === 'createParkingLot';
  }

  _toCamelCase(snakeCaseStr: string): string {
    return snakeCaseStr.replace(/_([a-z])/g, m => m[1].toUpperCase());
  }
}
