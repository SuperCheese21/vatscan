import React from 'react';

import Client from './Client';
import { getProjectedCoords } from './util';

import ControllerPolygon from '../components/common/map-overlays/ControllerPolygon';
import { controllerTypes, NUM_SIDES_CIRCLE } from '../config/constants.json';

export default class Controller extends Client {
  constructor(data, controllerType, center) {
    super(data);

    this.controllerType = controllerType || 'Other';
    this.frequency = data[4];
    this.facilityType = data[18];
    this.atisMessage = data[35];

    const controllerInfo = controllerTypes[this.controllerType];

    this.fullName = controllerInfo.fullName;
    this.polygonInfo = controllerInfo.polygon;

    // Set polygon coords if polygon info is defined
    if (this.polygonInfo) {
      // Use ARTCC boundaries given by external API
      if (center) {
        this.polygonCoords = center.geometry.coordinates[0].map(coords => ({
          latitude: parseFloat(coords[1]),
          longitude: parseFloat(coords[0]),
        }));
      }

      // Otherwise render circle
      else {
        this.polygonCoords = [];
        for (let i = 0; i < NUM_SIDES_CIRCLE; i += 1) {
          const bearing = (360 / NUM_SIDES_CIRCLE) * i;
          this.polygonCoords.push(
            getProjectedCoords(
              this.location,
              this.polygonInfo.radiusM,
              bearing,
            ),
          );
        }
      }
    }
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
}
