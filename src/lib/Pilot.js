import Client from './Client';

import airportCoords from '../data/airportCoords.json';
import constants from '../config/constants.json';
import { getGCDistance } from './util/calc';

const NARROWBODY_ICON = require('../../assets/icons/narrowbody.png');
const WIDEBODY_ICON = require('../../assets/icons/widebody.png');
const GA_ICON = require('../../assets/icons/ga.png');

export default class Pilot extends Client {
    constructor(data) {
        super(data);
        this._altitude = data[7];
        this._groundSpeed = data[8];
        this._aircraft = data[9];
        this._depAirport = data[11];
        this._arrAirport = data[13];
        this._transponder = data[17];
        this._flightType = data[21];
        this._route = data[30];
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
        return airportCoords[this.depAirport];
    }

    get arrCoords() {
        return airportCoords[this.arrAirport];
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
        } else if (this._checkAircraftType(narrowbody) || !this._aircraft) {
            return 1;
        }
        return 0;
    }

    _checkAircraftType(list) {
        for (let i = 0; i < list.length; i++) {
            const aircraft = list[i];
            if (this._aircraft.includes(aircraft)) {
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

    get groundSpeed() {
        return this._groundSpeed;
    }

    set groundSpeed(groundSpeed) {
        this._groundSpeed = groundSpeed;
    }

    get aircraft() {
        return this._aircraft;
    }

    set aircraft(aircraft) {
        this._aircraft = aircraft;
    }

    get depAirport() {
        return this._depAirport;
    }

    set depAirport(depAirport) {
        this._depAirport = depAirport;
    }

    get arrAirport() {
        return this._arrAirport;
    }

    set arrAirport(arrAirport) {
        this._arrAirport = arrAirport;
    }

    get transponder() {
        return this._transponder;
    }

    set transponder(transponder) {
        this._transponder = transponder;
    }

    get flightType() {
        return this._flightType;
    }

    set flightType(flightType) {
        this._flightType = flightType;
    }

    get route() {
        return this._route;
    }

    set route(route) {
        this._route = route;
    }

    get heading() {
        return this._heading;
    }

    set heading(heading) {
        this._heading = heading;
    }
}
