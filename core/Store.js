export default class Store {
  constructor(reducer, initialState) {
    this.reducer = reducer;
    this.state = initialState;
    this.listeners = [];
  }

  dispatch(action) {
    this.state = this.reducer(this.state, action);
    this.listeners.forEach(l => l(this.state));
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  getState() {
    return structuredClone(this.state);
  }
}
