import moment from 'moment';

export default class Client {
  constructor(data, type) {
    this.callsign = data.callsign;
    this.id = data.cid.toString();
    this.name = data.name;
    this.type = type;
    this.server = data.server;
    this.rating = data.rating;
    this.timeLogon = data.logon_time;
  }

  get elapsedTimeLogon() {
    const now = moment().format('x');
    const then = moment(this.timeLogon).format('x');

    return moment.utc(now - then).format('HH:mm');
  }
}
