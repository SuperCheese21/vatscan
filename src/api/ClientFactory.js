import Controller from './Controller';
import Pilot from './Pilot';

export default class ClientFactory {
  constructor(centerData) {
    this.centerData = centerData;
  }

  /**
   * [getClient description]
   * @param  {[type]} rawClient [description]
   * @return {[type]}           [description]
   */
  getClient(clientArray) {
    const clientType = clientArray[3];

    console.log(`callsign: ${clientArray[0]}, clientType: ${clientType}`);

    if (clientType === 'PILOT') {
      return new Pilot(clientArray);
    }

    if (clientType === 'ATC') {
      return this.getController(clientArray);
    }

    return null;
  }

  /**
   * [getController description]
   * @param  {[type]} clientArray [description]
   * @return {[type]}             [description]
   */
  getController(clientArray) {
    const controllerType = clientArray[0].split('_').pop();
    const id = Number(clientArray[1]);
    const center = this.centerData.find(c => c.id === id);

    if (['CTR', 'FSS', 'APP', 'DEP', 'TWR', 'GND'].includes(controllerType)) {
      return new Controller(clientArray, controllerType, center);
    }

    return null;
  }
}
