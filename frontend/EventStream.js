class EventStream {
  #listeners = []

  publish = (...args) => {
    this.#listeners.forEach((callback) => {
      callback(...args);
    });
  }

  subscribe = (callback) => {
    this.#listeners.push(callback);
  }
}

export default EventStream;
