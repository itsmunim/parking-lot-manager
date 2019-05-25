#!/usr/bin/env node

import {createReadStream, existsSync} from 'fs';
import {createInterface, ReadLineOptions} from 'readline';
import {CommandExecutor, InterfaceType} from './core/services/command.executor';

function _isInteractive(): boolean {
  // when the first param is node executable and next is the script only
  return process.argv.length === 2;
}

function _getInterfaceConfig(filePath?: string): ReadLineOptions {
  if (filePath) {
    if (!existsSync(filePath)) {
      throw new Error('Must be a valid file path');
    }

    return {
      input: createReadStream(filePath),
      output: process.stdout
    }
  }

  /**
   * It might look like this could be achieved like below-
   * let iConfig = {output: process.stdout};
   * ...
   * if (filePath) {
   *   ...
   *   iConfig = createReadStream(filePath);
   *} else {
   *   iConfig = process.stdin;
   *}
   *
   * return iConfig;
   *
   * But that approach raises a TS error -
   * TS2739: Type 'ReadStream' is missing the following properties from type 'ReadStream': writable, write, end
   *
   * So this minor duplication is necessary.
   */
  return {
    input: process.stdin,
    output: process.stdout
  };
}

function run(): void {
  const interfaceType = _isInteractive() ? InterfaceType.STDIN : InterfaceType.File;
  const interfaceConfig = _getInterfaceConfig(
    interfaceType === InterfaceType.File
      ? process.argv[2] : null
  );

  const commandExecutor = new CommandExecutor(createInterface(interfaceConfig), interfaceType);
  commandExecutor.process();
}

run();
