import moment from 'moment';

export default class Client {
    constructor(data) {
        this._callsign = data[0];
        this._id = data[1];
        this._name = data[2];
        this._type = data[3];
        this._latitude = parseFloat(data[5]) || 0;
        this._longitude = parseFloat(data[6]) || 0;
        this._server = data[14];
        this._rating = data[16];
        this._timeLogon = data[37];
    }

    get location() {
        return {
            latitude: this.latitude,
            longitude: this.longitude
        };
    }

    get elapsedTimeLogon() {
        const now = moment.utc().format('x');
        const then = moment.utc(this._timeLogon, 'YYYYMMDDhhmmss').format('x');

        return moment.utc(now - then).format('HH:mm');
    }

    get callsign() {
        return this._callsign;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get type() {
        return this._type;
    }

    get latitude() {
        return this._latitude;
    }

    get longitude() {
        return this._longitude;
    }

    get server() {
        return this._server;
    }

    get rating() {
        return this._rating;
    }

    get timeLogon() {
        return this._timeLogon;
    }
}
