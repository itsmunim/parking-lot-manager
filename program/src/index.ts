#!/usr/bin/env node

import {createInterface} from 'readline';
import {CommandExecutor, InterfaceType} from './core/services/command.executor';

function _isInteractive(): boolean {
  // when the first param is node executable and next is the script only
  return process.argv.length === 2;
}

function run(): void {
  let commandExecutor = null;
  let interfaceConfig = {
    input: process.stdin,
    output: process.stdout
  };

  if (_isInteractive()) {
    commandExecutor = new CommandExecutor(createInterface(interfaceConfig), InterfaceType.STDIN);
    commandExecutor.process();
  }
}

run();
