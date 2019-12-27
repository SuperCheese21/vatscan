import { Alert } from 'react-native';

import ClientFactory from './ClientFactory';
import { getRandomElement } from './util';
import { ARTCC_URL, STATUS_URL } from '../config/constants.json';

export default class FetchManager {
  constructor() {
    this.serverUrls = [];
  }

  /**
   * async/await function that requests pilot and ATC data from separate servers
   * @return {Promise} VATSIM server data promise object
   */
  async fetchData(isInitialFetch) {
    // Fetch server URLs on first execution
    if (!this.serverUrls.length) {
      await this.fetchServerUrls();
    }

    // Pick random URL
    const clientsUrl = getRandomElement(this.serverUrls);

    // Fetch data
    const [clientData, centerData] = await Promise.all([
      fetch(clientsUrl)
        .then(res => res.text())
        .then(this.transformClientData)
        .catch(
          e =>
            e &&
            isInitialFetch &&
            Alert.alert('Error', 'Unable to fetch client data'),
        ),
      fetch(ARTCC_URL)
        .then(res => res.json())
        .then(json => json.features)
        .catch(
          e =>
            e &&
            isInitialFetch &&
            Alert.alert('Error', 'Unable to fetch ARTCC data'),
        ),
    ]);

    return FetchManager.parseData(clientData || [], centerData || []);
  }

  /**
   * [_fetchServerUrls description]
   * @return {Promise} [description]
   */
  async fetchServerUrls() {
    try {
      const res = await fetch(STATUS_URL);
      const text = await res.text();

      text.split('\n').forEach(line => {
        if (line.includes('url0=')) {
          this.serverUrls.push(line.replace('url0=', ''));
        }
      });
    } catch (e) {
      throw Error(e.message);
    }
  }

  /**
   * [transformClientData description]
   * @param  {[type]} text [description]
   * @return {[type]}      [description]
   */
  transformClientData = text =>
    text
      .split('!CLIENTS:\n')
      .pop()
      .split('\n;\n;')
      .shift()
      .split('\n')
      .map(line => line.split(':'));

  /**
   * Parses the raw server data from text and json to a custom javascript object
   * @param  {String} rawData         Raw VATSIM server data
   * @return {Object}                 Client data formatted as a javascript object
   */
  static parseData(clientData, centerData) {
    const clientFactory = new ClientFactory(centerData);

    return clientData.reduce((clients, clientArray) => {
      const client = clientFactory.getClient(clientArray);
      if (client) {
        clients.push(client);
      }
      return clients;
    }, []);
  }
}
