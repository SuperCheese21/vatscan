import moment from 'moment';

export default class Client {
  constructor(data) {
    this.callsign = data[0];
    this.id = data[1];
    this.name = data[2];
    this.type = data[3];
    this.latitude = parseFloat(data[5]) || 0;
    this.longitude = parseFloat(data[6]) || 0;
    this.server = data[14];
    this.rating = data[16];
    this.timeLogon = data[37];
  }

  get location() {
    return {
      latitude: this.latitude,
      longitude: this.longitude,
    };
  }

  get elapsedTimeLogon() {
    const now = moment.utc().format('x');
    const then = moment.utc(this.timeLogon, 'YYYYMMDDhhmmss').format('x');

    return moment.utc(now - then).format('HH:mm');
  }

  get callsign() {
    return this.callsign;
  }

  get id() {
    return this.id;
  }

  get name() {
    return this.name;
  }

  get type() {
    return this.type;
  }

  get latitude() {
    return this.latitude;
  }

  get longitude() {
    return this.longitude;
  }

  get server() {
    return this.server;
  }

  get rating() {
    return this.rating;
  }

  get timeLogon() {
    return this.timeLogon;
  }
}
