import Client from './Client';

import airportData from '../data/airports.json';
import constants from '../config/constants.json';
import { getGCDistance } from './util/calc';

const NARROWBODY_ICON = require('../assets/icons/narrowbody.png');
const WIDEBODY_ICON = require('../assets/icons/widebody.png');
const GA_ICON = require('../assets/icons/ga.png');
const SEEKBAR_ICON = require('../assets/icons/seekbar.png');

export default class Pilot extends Client {
    constructor(data) {
        super(data);
        this._altitude = data[7];
        this._groundspeed = data[8];
        this._planned_aircraft = data[9];
        this._planned_depairport = data[11];
        this._planned_destairport = data[13];
        this._transponder = data[17];
        this._planned_flighttype = data[21];
        this._planned_route = data[30];
        this._heading = parseFloat(data[38]);
    }

    get aircraftIcon() {
        const type = this._getAircraftType();

        if (type === 2) {
            return WIDEBODY_ICON;
        } else if (type === 1) {
            return NARROWBODY_ICON;
        }
        return GA_ICON;
    }

    get depCoords() {
        return airportData[this.planned_depairport];
    }

    get arrCoords() {
        return airportData[this.planned_destairport];
    }

    get distFlown() {
        return getGCDistance(this.depCoords, this.location);
    }

    get distRemaining() {
        return getGCDistance(this.location, this.arrCoords);
    }

    get progress() {
        return this.distFlown / (this.distFlown + this.distRemaining)
    }

    _getAircraftType() {
        const widebody = constants.aircraft.WIDEBODY;
        const narrowbody = constants.aircraft.NARROWBODY;

        if (this._checkAircraftType(widebody)) {
            return 2;
        } else if (this._checkAircraftType(narrowbody) || !this._planned_aircraft) {
            return 1;
        }
        return 0;
    }

    _checkAircraftType(list) {
        for (let i = 0; i < list.length; i++) {
            const aircraft = list[i];
            if (this._planned_aircraft.includes(aircraft)) {
                return true;
            }
        }
        return false;
    }

    get altitude() {
        return this._altitude;
    }

    set altitude(altitude) {
        this._altitude = altitude;
    }

    get groundspeed() {
        return this._groundspeed;
    }

    set groundspeed(groundspeed) {
        this._groundspeed = groundspeed;
    }

    get planned_aircraft() {
        return this._planned_aircraft;
    }

    set planned_aircraft(planned_aircraft) {
        this._planned_aircraft = planned_aircraft;
    }

    get planned_depairport() {
        return this._planned_depairport;
    }

    set planned_depairport(planned_depairport) {
        this._planned_depairport = planned_depairport;
    }

    get planned_destairport() {
        return this._planned_destairport;
    }

    set planned_destairport(planned_destairport) {
        this._planned_destairport = planned_destairport;
    }

    get transponder() {
        return this._transponder;
    }

    set transponder(transponder) {
        this._transponder = transponder;
    }

    get planned_flighttype() {
        return this._planned_flighttype;
    }

    set planned_flighttype(planned_flighttype) {
        this._planned_flighttype = planned_flighttype;
    }

    get planned_route() {
        return this._planned_route;
    }

    set planned_route(planned_route) {
        this._planned_route = planned_route;
    }

    get heading() {
        return this._heading;
    }

    set heading(heading) {
        this._heading = heading;
    }
}
