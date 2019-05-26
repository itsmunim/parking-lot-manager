import {existsSync, createReadStream} from 'fs';
import ShellExecutor from './shell.executor';
import {ExecutorType} from './executor.type';
import {createInterface} from 'readline';

class FileExecutor extends ShellExecutor {
  _consoleOutput: string = '';

  constructor(filePath: string) {
    super(ExecutorType.File);

    if (!filePath || !existsSync(filePath)) {
      throw new Error('Must be a valid file path');
    }

    this.readInterface = createInterface({
      input: createReadStream(filePath)
    });
  }

  _onSingleLineExecutionDone(output: string) {
    this._consoleOutput += output;
    this._consoleOutput += '\n';
  }

  _onWholeExecutionFinish() {
    this.log(this._consoleOutput.trim());
    super._onWholeExecutionFinish();
  }
}

export default FileExecutor;
