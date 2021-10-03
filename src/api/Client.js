import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import utc from 'dayjs/plugin/utc';

dayjs.extend(advancedFormat, utc);

export default class Client {
  constructor(data, type) {
    this.type = type;
    this.callsign = data.callsign;
    this.id = data.id;
    this.name = data.name;
    this.server = data.server;
    this.rating = data.rating;
    this.timeLogon = data.timeLogon;
  }

  get elapsedTimeLogon() {
    const now = dayjs().format('x');
    const then = dayjs(this.timeLogon).format('x');
    return dayjs.utc(now - then).format('HH:mm');
  }
}
