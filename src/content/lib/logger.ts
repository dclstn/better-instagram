/* Instagram overwrites default console.log */
const { log } = console;

const PREFIX = '[Better-Instagram]';

class Logger {
  static log(...args: any[]) {
    log(PREFIX, ...args);
  }
}

export default Logger;
