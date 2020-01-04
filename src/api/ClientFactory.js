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
    }

    if (clientType === 'ATC') {
      return this.getController(clientArray);
    }

    return null;
  }

  getController(clientArray) {
    const controllerType = clientArray[0].split('_').pop();
    const callsign = clientArray[0];
    const center = this.centerData.find(
      c => c.properties.callsign === callsign,
    );

    if (
      [
        'ATIS',
        'DEL',
        'GND',
        'TWR',
        'DEP',
        'CTR',
        'FSS',
        'APP',
        'OBS',
        'SUP',
      ].includes(controllerType)
    ) {
      return new Controller(clientArray, controllerType, center);
    }

    return null;
  }
}
