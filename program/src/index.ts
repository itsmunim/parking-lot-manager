#!/usr/bin/env node

function run(): void {
  // TODO: setup commands list
  // TODO: get commands
  // TODO: do process based on commands
  if (_isInteractive()) {
    console.log('program running in interactive mode');
  }
};

function _isInteractive(): boolean {
  // when the first param is node executable and next is the script only
  return process.argv.length === 2;
}

run();