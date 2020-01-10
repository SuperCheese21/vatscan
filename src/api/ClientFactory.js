import Controller from './Controller';
import Pilot from './Pilot';

import { controllerTypes } from '../config/constants.json';

export default class ClientFactory {
  constructor(centerData) {
    this.centerData = centerData;
  }

  getClient(clientArray) {
    const clientType = clientArray[3];

    if (clientType === 'PILOT') {
      return new Pilot(clientArray);
    }

    if (clientType === 'ATC') {
      return this.getController(clientArray);
    }

    return null;
  }

  getController(clientArray) {
    const type = clientArray[0].split('_').pop();
    const center = this.centerData.find(
      c => c.properties.callsign === clientArray[0],
    );

    const controllerType = Object.keys(controllerTypes).find(key =>
      controllerTypes[key].typesList.includes(type),
    );

    return new Controller(clientArray, controllerType, center);
  }
}
