import React from 'react';

import Client from './Client';

import ControllerPolygon from '../components/common/map-overlays/ControllerPolygon';
import { CONTROLLER_TYPES, NUM_SIDES_CIRCLE } from '../config/constants';
import { getProjectedCoords } from './utils';

export default class Controller extends Client {
  constructor(data, coords) {
    super(data, 'ATC');

    this.frequency = data.frequency;
    this.facilityType = data.facility;
    this.atisMessage = data.text_atis?.join('\n') || '';

    const controllerInfo = CONTROLLER_TYPES[this.controllerType];

    this.fullName = controllerInfo.fullName;
    this.polygon = coords?.polygon;
    this.location = coords?.location;
  }

  getMapOverlay(isFocusedClient, setFocusedClient) {
    if (this.polygonInfo) {
      return (
        <ControllerPolygon
          key={this.callsign}
          client={this}
          isFocusedClient={isFocusedClient}
          setFocusedClient={setFocusedClient}
        />
      );
    }
    return null;
  }

  get controllerType() {
    return (
      Object.keys(CONTROLLER_TYPES).find(key =>
        CONTROLLER_TYPES[key].typesList.includes(
          this.callsign.split('_').pop(),
        ),
      ) || 'Other'
    );
  }

  get polygonInfo() {
    const controllerInfo = CONTROLLER_TYPES[this.controllerType];
    return controllerInfo?.polygon;
  }

  get polygonCoords() {
    if (this.polygon?.length) {
      return this.polygon[0].polygon.map(([lat, lon]) => ({
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
      }));
    }

    if (this.location && this.polygonInfo) {
      const polygonCoords = [];
      for (let i = 0; i < NUM_SIDES_CIRCLE; i += 1) {
        const bearing = (360 / NUM_SIDES_CIRCLE) * i;
        polygonCoords.push(
          getProjectedCoords(this.location, this.polygonInfo.radiusM, bearing),
        );
      }
      return polygonCoords;
    }

    return [];
  }
}
