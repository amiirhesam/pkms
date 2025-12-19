export default class EventBus {
  constructor() {
    this.events = {};
  }

  subscribe(event, callback) {
    this.events[event] ??= [];
    this.events[event].push(callback);
  }

  publish(event, payload) {
    (this.events[event] || []).forEach(cb => cb(payload));
  }
}
