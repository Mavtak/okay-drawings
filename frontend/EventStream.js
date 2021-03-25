class EventStream {
  #listeners = []

  publish = (...args) => {
    this.#listeners.forEach((callback) => {
      callback(...args);
    });
  }

  subscribe = (callback) => {
    this.#listeners = [
      ...this.#listeners,
      callback,
    ];

    return () => {
      this.#listeners = this.#listeners.filter(x => x !== callback);
    };
  }
}

export default EventStream;
