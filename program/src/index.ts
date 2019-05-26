#!/usr/bin/env node

import FileExecutor from './core/services/command.executors/file.executor';
import ShellExecutor from './core/services/command.executors/shell.executor';

function _isInteractive(): boolean {
  // when the first param is node executable and next is the script only
  return process.argv.length === 2;
}

function run(): void {
  const commandExecutor = _isInteractive() ? new ShellExecutor() : new FileExecutor(process.argv[2]);
  commandExecutor.process();
}

run();
