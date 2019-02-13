import Center from './Center';
import Controller from './Controller';
import Pilot from './Pilot';

export default class ClientFactory {
    constructor(centerData) {
        this.centerData = centerData;
    }

    getClient(clientArray) {
        const clientType = clientArray[3];

        if (clientType === 'PILOT') {
            return new Pilot(clientArray);
        } else if (clientType === 'ATC') {
            return this.getController(clientArray);
        }

        return null;
    }

    getController(clientArray) {
        const id = clientArray[1];
        const controllerType = clientArray[0].split('_').pop();
        const center = this.findInCenterData(id);

        if (controllerType === 'CTR') {
            return new Center(clientArray, center);
        } else if (['APP','DEP','TWR','GND'].includes(controllerType)) {
            return new Controller(clientArray, controllerType);
        }

        return null;
    }

    findInCenterData(id) {
        for (const center of this.centerData) {
            if (center.id === Number(id)) {
                return center;
            }
        }
    }
}
