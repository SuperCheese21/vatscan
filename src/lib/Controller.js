import Client from './Client';

import { mapOverlays as colors } from '../config/colors.json';
import { mapOverlays as constants } from '../config/constants.json';

export default class Controller extends Client {
    constructor(data) {
        super(data);
        this._frequency = data[4];
        this._rating = data[16];
    }

    get controllerType() {
        if (this.callsign.includes('_CTR')) {
            return 'CTR';
        } else if (this.callsign.includes('_TWR')) {
            return 'TWR';
        } else if (this.callsign.includes('_GND')) {
            return 'GND';
        }
        return 'APP';
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

    get frequency() {
        return this._frequency;
    }

    set frequency(frequency) {
        this._frequency = frequency;
    }

    get rating() {
        return this._rating;
    }

    set rating(rating) {
        this._rating = rating;
    }
}
