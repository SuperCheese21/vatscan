import Client from './Client';

import { getProjectedCoords } from './util/calc';
import { mapOverlays as colors } from '../config/colors.json';
import { mapOverlays as constants, NUM_SIDES_CIRCLE } from '../config/constants.json';

export default class Controller extends Client {
    constructor(data, controllerType, center) {
        super(data);

        this._controllerType = controllerType;
        this._frequency = data[4];
        this._facilityType = data[18];
        this._atisMessage = data[35];

        if (center) {
            this._polygon = center.geometry.coordinates[0].map(coords => ({
                latitude: parseFloat(coords[1]),
                longitude: parseFloat(coords[0])
            }));
        } else if (this._controllerType !== 'CTR') {
            this._polygon = [];
            for (let i = 0; i < NUM_SIDES_CIRCLE; i++) {
                const bearing = 360 / NUM_SIDES_CIRCLE * i;
                this._polygon.push(getProjectedCoords(this.location, this.radius, bearing));
            }
        }
    }

    get typeString() {
        switch (this._controllerType) {
            case 'CTR':
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
        return this._polygon;
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
        return this._controllerType;
    }

    get frequency() {
        return this._frequency;
    }

    get facilityType() {
        return this._facilityType;
    }

    get atisMessage() {
        return this._atisMessage;
    }
}
