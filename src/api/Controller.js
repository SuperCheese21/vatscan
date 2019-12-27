import Client from './Client';

import { getProjectedCoords } from './util';
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
      this.polygon = center.geometry.coordinates[0].map(coords => ({
        latitude: parseFloat(coords[1]),
        longitude: parseFloat(coords[0]),
      }));
    } else if (!['CTR', 'FSS'].includes(this.controllerType)) {
      this.polygon = [];
      for (let i = 0; i < NUM_SIDES_CIRCLE; i += 1) {
        const bearing = (360 / NUM_SIDES_CIRCLE) * i;
        this.polygon.push(
          getProjectedCoords(this.location, this.radius, bearing),
        );
      }
    }
  }

  get typeString() {
    switch (this.controllerType) {
      case 'CTR':
      case 'FSS':
        return 'Center';
      case 'APP':
        return 'Approach';
      case 'DEP':
        return 'Departure';
      case 'TWR':
        return 'Tower';
      case 'GND':
        return 'Ground';
      default:
        return 'N/A';
    }
  }

  get polygon() {
    return this.polygon;
  }

  get radius() {
    return constants[this.controllerType].radius;
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

  get controllerType() {
    return this.controllerType;
  }

  get frequency() {
    return this.frequency;
  }

  get facilityType() {
    return this.facilityType;
  }

  get atisMessage() {
    return this.atisMessage;
  }
}
