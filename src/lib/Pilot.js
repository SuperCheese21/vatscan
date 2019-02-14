import moment from 'moment';

import Client from './Client';
import airportCoords from '../data/airportCoords.json';
import airportNames from '../data/airportNames.json';
import constants from '../config/constants.json';
import { getGCDistance } from './util/calc';

const NARROWBODY_ICON = require('../../assets/icons/narrowbody.png');
const WIDEBODY_ICON = require('../../assets/icons/widebody.png');
const GA_ICON = require('../../assets/icons/ga.png');

export default class Pilot extends Client {
    constructor(data) {
        super(data);
        this._altitude = data[7];
        this._groundSpeed = parseInt(data[8]);
        this._aircraft = data[9];
        this._tasCruise = data[10];
        this._depAirport = data[11];
        this._plannedAltitude = data[12];
        this._arrAirport = data[13];
        this._transponder = data[17];
        this._flightType = data[21];
        this._depTime = data[22];
        this._hrsEnRoute = parseInt(data[24]);
        this._minEnRoute = parseInt(data[25]);
        this._remarks = data[29];
        this._route = data[30];
        this._heading = parseFloat(data[38]);
    }

    getAircraftType() {
        const widebody = constants.aircraft.WIDEBODY;
        const narrowbody = constants.aircraft.NARROWBODY;

        if (this.checkAircraftType(widebody)) {
            return 2;
        } else if (this.checkAircraftType(narrowbody) || !this._aircraft) {
            return 1;
        }
        return 0;
    }

    checkAircraftType(list) {
        for (let i = 0; i < list.length; i++) {
            const aircraft = list[i];
            if (this._aircraft.includes(aircraft)) {
                return true;
            }
        }
        return false;
    }

    getETEMinutes() {
        if (this.distRemaining && this._groundSpeed > 0) {
            if (this.distRemaining <= 2 && this._groundSpeed < 40) {
                return 0;
            }
            return Math.round(
                60 * (this.distRemaining / this._groundSpeed) + (this._altitude / 2000)
            );
        }
    }

    get aircraftIcon() {
        const type = this.getAircraftType();

        if (type === 2) {
            return WIDEBODY_ICON;
        } else if (type === 1) {
            return NARROWBODY_ICON;
        }
        return GA_ICON;
    }

    get depCoords() {
        return airportCoords[this._depAirport];
    }

    get arrCoords() {
        return airportCoords[this._arrAirport];
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

    get depAirportName() {
        const names = airportNames[this._depAirport];
        if (names) {
            return names.airport;
        }
        return 'Unknown';
    }

    get arrAirportName() {
        const names = airportNames[this._arrAirport];
        if (names) {
            return names.airport;
        }
        return 'Unknown';
    }

    get plannedDepTime() {
        return moment.utc(this._depTime, 'Hmm').format('HHmm');
    }

    get plannedArrTime() {
        const departureTime = moment.utc(this._depTime, 'Hmm');
        const flightDuration = 60 * this._hrsEnRoute + this._minEnRoute;

        return departureTime.add(flightDuration, 'm').format('HHmm');
    }

    get ete() {
        const eteMinutes = this.getETEMinutes();
        if (eteMinutes) {
            return moment.utc(eteMinutes * 60000).format('H:mm');
        }
    }

    get eta() {
        const eteMinutes = this.getETEMinutes();
        if (eteMinutes) {
            return moment.utc().add(eteMinutes, 'm').format('HHmm');
        }
    }

    get altitude() {
        return this._altitude;
    }

    get groundSpeed() {
        return this._groundSpeed;
    }

    get aircraft() {
        return this._aircraft;
    }

    get tasCruise() {
        return this._tasCruise;
    }

    get depAirport() {
        return this._depAirport;
    }

    get plannedAltitude() {
        return this._plannedAltitude;
    }

    get arrAirport() {
        return this._arrAirport;
    }

    get transponder() {
        return this._transponder;
    }

    get flightType() {
        return this._flightType;
    }

    get depTime() {
        return this._depTime;
    }

    get hrsEnRoute() {
        return this._hrsEnRoute;
    }

    get minEnRoute() {
        return this._minEnRoute;
    }

    get remarks() {
        return this._remarks;
    }

    get route() {
        return this._route;
    }

    get heading() {
        return this._heading;
    }
}
