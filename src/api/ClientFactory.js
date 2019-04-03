import Controller from './Controller';
import Pilot from './Pilot';

export default class ClientFactory {
    constructor(centerData) {
        this.centerData = centerData;
    }

    /**
     * [getClient description]
     * @param  {[type]} clientArray [description]
     * @return {[type]}             [description]
     */
    getClient(clientArray) {
        const clientType = clientArray[3];

        if (clientType === 'PILOT') {
            return new Pilot(clientArray);
        } else if (clientType === 'ATC') {
            return this._getController(clientArray);
        }

        return null;
    }

    /**
     * [getController description]
     * @param  {[type]} clientArray [description]
     * @return {[type]}             [description]
     */
    _getController(clientArray) {
        const id = clientArray[1];
        const controllerType = clientArray[0].split('_').pop();
        const center = this._findInCenterData(id);

        if (
            ['CTR', 'FSS', 'APP', 'DEP', 'TWR', 'GND'].includes(controllerType)
        ) {
            return new Controller(clientArray, controllerType, center);
        }

        return null;
    }

    /**
     * [findInCenterData description]
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
    _findInCenterData(id) {
        for (const center of this.centerData) {
            if (center.id === Number(id)) {
                return center;
            }
        }
    }
}
