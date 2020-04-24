import React from 'react';

import Client from './Client';
import { getProjectedCoords } from './util';

import ControllerPolygon from '../components/common/map-overlays/ControllerPolygon';
import { mapOverlays as colors } from '../config/colors.json';
import {
  mapOverlays as constants,
  NUM_SIDES_CIRCLE,
} from '../config/constants.json';

export default class Controller extends Client {
  constructor(data, controllerType, center) {
    super(data);

    this.controllerType = controllerType;
    this.frequency = data[4];
    this.facilityType = data[18];
    this.atisMessage = data[35];

    if (center) {
      this.polygon = center.bounds[0].map(([lat, lon]) => ({
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
      }));
    } else if (constants[controllerType]) {
      this.polygon = [];
      for (let i = 0; i < NUM_SIDES_CIRCLE; i += 1) {
        const bearing = (360 / NUM_SIDES_CIRCLE) * i;
        this.polygon.push(
          getProjectedCoords(this.location, this.radiusM, bearing),
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

  get typeString() {
    switch (this.controllerType) {
      case 'ATIS':
        return 'ATIS';
      case 'DEL':
        return 'Delivery';
      case 'GND':
        return 'Ground';
      case 'TWR':
        return 'Tower';
      case 'DEP':
        return 'Departure';
      case 'CTR':
      case 'FSS':
        return 'Center';
      case 'APP':
        return 'Approach';
      case 'OBS':
        return 'Observer';
      case 'SUP':
        return 'Supervisor';
      default:
        return 'N/A';
    }
  }

  get radiusM() {
    return constants[this.controllerType].radiusM;
  }

  get strokeColor() {
    return colors[this.controllerType].stroke;
  }

  get fillColor() {
    return colors[this.controllerType].fill;
  }

  get fillColorSelected() {
    return colors[this.controllerType].fillSelected;
  }

  get zIndex() {
    return constants[this.controllerType].zIndex;
  }
}
