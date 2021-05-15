import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import utc from 'dayjs/plugin/utc';

dayjs.extend(advancedFormat, utc);

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
    const now = dayjs().format('x');
    const then = dayjs(this.timeLogon).format('x');

    return dayjs.utc(now - then).format('HH:mm');
  }
}
