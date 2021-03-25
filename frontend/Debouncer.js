import delay from './delay.js';

class Debouncer {
  _counter = 0;

  debounce = async (ms) => {
    this._counter++;

    let startingCounter = this._counter;

    await delay(ms);

    return startingCounter === this._counter;
  }
}

export default Debouncer;
