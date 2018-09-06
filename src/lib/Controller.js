import Client from './Client';

import colors from '../config/colors.json';
import constants from '../config/constants.json';

export default class Controller extends Client {
    constructor(data) {
        super(data);
        this._frequency = data[4];
        this._rating = data[16];
        this._visualrange = data[19];
    }

    get controllertype() {
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
        return constants.mapOverlays[this.controllertype].radius;
    }

    get strokeColor() {
        return colors.mapOverlays[this.controllertype].strokeColor;
    }

    get fillColor() {
        return colors.mapOverlays[this.controllertype].fillColor;
    }

    get fillColorSelected() {
        return colors.mapOverlays[this.controllertype].fillColorSelected;
    }

    get zIndex() {
        return constants.mapOverlays[this.controllertype].zIndex;
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

    get visualrange() {
        return this._visualrange;
    }

    set visualrange(visualrange) {
        this._visualrange = visualrange;
    }
}
