class EventStream {
  #listeners = []

  publish = () => {
    this.#listeners.forEach((callback) => {
      callback();
    });
  }

  subscribe = (callback) => {
    this.#listeners.push(callback);
  }
}

export default EventStream;
