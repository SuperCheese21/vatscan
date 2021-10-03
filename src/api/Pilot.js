import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import React from 'react';

import Client from './Client';
import { getAirportCoords, getCityName, getGCDistance } from './utils';

import { AIRCRAFT } from '../config/constants';
import AircraftMarker from '../components/common/map-overlays/AircraftMarker';
import GA_ICON from '../../assets/icons/ga.png';
import NARROWBODY_ICON from '../../assets/icons/narrowbody.png';
import WIDEBODY_ICON from '../../assets/icons/widebody.png';

dayjs.extend(customParseFormat);
dayjs.extend(utc);

export default class Pilot extends Client {
  constructor(data) {
    super(data, 'PILOT');
    this.latitude = data.latitude || 0;
    this.longitude = data.longitude || 0;
    this.altitude = data.altitude;
    this.groundSpeed = data.groundSpeed;
    this.heading = data.heading;
    this.transponder = data.transponder;
    this.aircraft = data.aircraft || 'N/A';
    this.tasCruise = data.tasCruise;
    this.depAirport = data.depAirport || '????';
    this.plannedAltitude = data.plannedAltitude;
    this.arrAirport = data.arrAirport || '????';
    this.flightType = data.flightType;
    this.depTime = data.depTime;
    this.hrsEnRoute = data.hrsEnRoute;
    this.minEnRoute = data.minEnRoute;
    this.remarks = data.remarks;
    this.route = data.route;
  }

  getMapOverlay(isFocusedClient, setFocusedClient) {
    return (
      <AircraftMarker
        key={this.callsign}
        client={this}
        isFocusedClient={isFocusedClient}
        setFocusedClient={setFocusedClient}
      />
    );
  }

  checkAircraftType(list) {
    if (list.find(aircraft => this.aircraft.includes(aircraft))) {
      return true;
    }

    return false;
  }

  get location() {
    return {
      latitude: this.latitude,
      longitude: this.longitude,
    };
  }

  get aircraftType() {
    if (this.checkAircraftType(AIRCRAFT.WIDEBODY)) {
      return 2;
    }

    if (this.checkAircraftType(AIRCRAFT.NARROWBODY) || !this.aircraft) {
      return 1;
    }

    return 0;
  }

  get eteMinutes() {
    if (this.distRemaining && this.groundSpeed > 0) {
      if (this.distRemaining <= 2 && this.groundSpeed < 40) {
        return 0;
      }
      return Math.round(
        60 * (this.distRemaining / this.groundSpeed) + this.altitude / 3400,
      );
    }
    return -1;
  }

  get aircraftIcon() {
    const aircraftType = this.aircraftType;

    if (aircraftType === 2) {
      return WIDEBODY_ICON;
    }

    if (aircraftType === 1) {
      return NARROWBODY_ICON;
    }

    return GA_ICON;
  }

  get aircraftIconStyle() {
    switch (this.aircraftIcon) {
      case WIDEBODY_ICON:
        return { width: 35, height: 35 };
      case NARROWBODY_ICON:
        return { width: 30, height: 30 };
      case GA_ICON:
        return { width: 25, height: 25 };
      default:
        return { width: 0, height: 0 };
    }
  }

  get depCoords() {
    return getAirportCoords(this.depAirport);
  }

  get arrCoords() {
    return getAirportCoords(this.arrAirport);
  }

  get distFlown() {
    return getGCDistance(this.depCoords, this.location);
  }

  get distRemaining() {
    return getGCDistance(this.location, this.arrCoords);
  }

  get progress() {
    if (this.distFlown >= 0 && this.distRemaining > 0) {
      return this.distFlown / (this.distFlown + this.distRemaining);
    }
    return 0;
  }

  get depCityName() {
    return getCityName(this.depAirport);
  }

  get arrCityName() {
    return getCityName(this.arrAirport);
  }

  get plannedDepTime() {
    const formattedTime = this.depTime?.padStart(4, '0');
    return formattedTime ? `${formattedTime}z` : 'N/A';
  }

  get plannedDuration() {
    if (this.hrsEnRoute && this.minEnRoute) {
      return `${Number(this.hrsEnRoute)} hrs ${this.minEnRoute} min`;
    }
    return 'N/A';
  }

  get plannedArrTime() {
    if (this.depTime && this.hrsEnRoute && this.minEnRoute) {
      const departureTime = dayjs.utc(this.depTime.padStart(4, '0'), 'HHmm');
      const flightDuration =
        60 * Number(this.hrsEnRoute) + Number(this.minEnRoute);
      return `${departureTime.add(flightDuration, 'm').format('HHmm')}z`;
    }
    return 'N/A';
  }

  get ete() {
    const eteMinutes = this.eteMinutes;
    if (eteMinutes > 0) {
      return dayjs.utc(eteMinutes * 60000).format('H:mm');
    }
    return null;
  }

  get eta() {
    const eteMinutes = this.eteMinutes;
    if (eteMinutes > 0) {
      return dayjs.utc().add(eteMinutes, 'm').format('HHmm');
    }
    return null;
  }
}
