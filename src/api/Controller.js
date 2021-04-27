import React from 'react';

import Client from './Client';

import ControllerPolygon from '../components/common/map-overlays/ControllerPolygon';
import { controllerTypes, NUM_SIDES_CIRCLE } from '../config/constants.json';
import { getProjectedCoords } from './utils';

export default class Controller extends Client {
  constructor(data, center) {
    super(data, 'ATC');

    this.frequency = data.frequency;
    this.facilityType = data.facility;
    this.atisMessage = data.text_atis;

    const controllerInfo = controllerTypes[this.controllerType];

    this.fullName = controllerInfo.fullName;
    this.polygonInfo = controllerInfo.polygon;

    // Set polygon coords if polygon info is defined
    if (this.polygonInfo) {
      // Use ARTCC boundaries given by external API
      if (center) {
        this.polygon = center.bounds[0].map(([lat, lon]) => ({
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
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

  get controllerType() {
    return (
      Object.keys(controllerTypes).find(key =>
        controllerTypes[key].typesList.includes(this.callsign.split('_').pop()),
      ) || 'Other'
    );
  }
}
