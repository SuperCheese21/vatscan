import React from 'react';

import Client from './Client';
import { getProjectedCoords } from './util';

import ControllerPolygon from '../components/common/map-overlays/ControllerPolygon';
import { controllerTypes, NUM_SIDES_CIRCLE } from '../config/constants.json';

export default class Controller extends Client {
  constructor(data, controllerType, center) {
    super(data);

    this.controllerType = controllerType || 'Other';
    this.controllerInfo = controllerTypes[this.controllerType];

    this.frequency = data[4];
    this.facilityType = data[18];
    this.atisMessage = data[35];

    const polygon = this.controllerInfo.polygon;

    if (center) {
      this.polygon = center.geometry.coordinates[0].map(coords => ({
        latitude: parseFloat(coords[1]),
        longitude: parseFloat(coords[0]),
      }));
    } else if (polygon) {
      this.polygon = [];
      for (let i = 0; i < NUM_SIDES_CIRCLE; i += 1) {
        const bearing = (360 / NUM_SIDES_CIRCLE) * i;
        this.polygon.push(
          getProjectedCoords(this.location, polygon.radiusM, bearing),
        );
      }
    }
  }

  getMapOverlay(isFocusedClient, setFocusedClient) {
    if (this.polygon) {
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
}
