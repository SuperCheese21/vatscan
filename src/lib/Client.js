export default class Client {
    constructor(data) {
        this._callsign = data[0];
        this._id = data[1];
        this._name = data[2];
        this._type = data[3];
        this._latitude = parseFloat(data[5]);
        this._longitude = parseFloat(data[6]);
        this._time_logon = data[37];
    }

    get location() {
        return {
            latitude: this.latitude,
            longitude: this.longitude
        };
    }

    get callsign() {
        return this._callsign;
    }

    set callsign(callsign) {
        this._callsign = callsign;
    }

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    get type() {
        return this._type;
    }

    set type(type) {
        this._type = type;
    }

    get latitude() {
        return this._latitude;
    }

    set latitude(latitude) {
        this._latitude = latitude;
    }

    get longitude() {
        return this._longitude;
    }

    set longitude(longitude) {
        this._longitude = longitude;
    }

    get time_logon() {
        return this._time_logon;
    }

    set time_logon(time_logon) {
        this._time_logon = time_logon;
    }
}
