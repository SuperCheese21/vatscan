export default class Client {
    constructor(data) {
        this._callsign = data[0];
        this._cid = data[1];
        this._realname = data[2];
        this._clienttype = data[3];
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

    get cid() {
        return this._cid;
    }

    set cid(cid) {
        this._cid = cid;
    }

    get realname() {
        return this._realname;
    }

    set realname(realname) {
        this._realname = realname;
    }

    get clienttype() {
        return this._clienttype;
    }

    set clienttype(clienttype) {
        this._clienttype = clienttype;
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
