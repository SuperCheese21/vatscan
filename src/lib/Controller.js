import Client from './Client';

import { mapOverlays as colors } from '../config/colors.json';
import { mapOverlays as constants } from '../config/constants.json';

export default class Controller extends Client {
    constructor(data, controllerType) {
        super(data);
        this._frequency = data[4];
        this._rating = data[16];
        this._controllerType = controllerType;
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

    get controllerType() {
        return this._controllerType;
    }

    set controllerType(controllerType) {
        this._controllerType = controllerType;
    }
}
