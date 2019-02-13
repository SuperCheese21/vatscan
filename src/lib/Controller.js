import Client from './Client';

import { mapOverlays as colors } from '../config/colors.json';
import { mapOverlays as constants } from '../config/constants.json';

export default class Controller extends Client {
    constructor(data, controllerType) {
        super(data);
        this._controllerType = controllerType;
        this._frequency = data[4];
        this._facilityType = data[18];
        this._atisMessage = data[35];
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
