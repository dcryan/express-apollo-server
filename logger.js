
const EventEmitter = require('events');

class Logger extends EventEmitter {
  log(message) {
    this.emit('log', { message });
  }
}

module.exports = Logger;
