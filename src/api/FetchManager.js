import { Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import ClientFactory from './ClientFactory';
import { getRandomElement } from './util';

import { ARTCC_URL, STATUS_URL } from '../config/constants.json';

/**
 * Checks for internet connection status
 * @return {Promise} Resolves to false if no connection available, true otherwise
 */
export const checkConnectionInfo = async () => {
  const connectionInfo = await NetInfo.fetch();
  if (connectionInfo.type === 'none' || connectionInfo.type === 'unknown') {
    Alert.alert(
      'No internet connection',
      'Connect to the internet to update data',
    );
    return false;
  }
  return true;
};

/**
 * async/await function that requests pilot and ATC data from separate servers
 * @param  {Boolean} isInitialFetch indicates whether the request is the first request when the app loads
 * @return {Promise}                parsed client data
 */
export const fetchData = async (isInitialFetch, serverUrls) => {
  // Pick random URL
  const clientsUrl = getRandomElement(serverUrls);

  // Fetch data
  const [clientData, centerData] = await Promise.all([
    fetch(clientsUrl)
      .then(res => res.text())
      .then(transformClientData)
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

  return parseData(clientData || [], centerData || []);
};

/**
 * Fetches VATSIM text data URLs from status.vatsim.net
 * @return {Promise} undefined, adds URLs to serverUrls array
 */
export const fetchServerUrls = async () => {
  try {
    const res = await fetch(STATUS_URL);
    const text = await res.text();

    return text.split('\n').reduce((acc, line) => {
      if (line.includes('url0=')) {
        acc.push(line.replace('url0=', ''));
      }
      return acc;
    });
  } catch (e) {
    Alert.alert('Error', 'Unable to fetch server information');
    return [];
  }
};

/**
 * transforms raw text client data into a 2D array
 * @param  {String} text          raw client data from VATSIM text data dump
 * @return {Array<Array<String>>} 2D array containing client data
 */
const transformClientData = text =>
  text
    .split('!CLIENTS:\n')
    .pop()
    .split('\n;\n;')
    .shift()
    .split('\n')
    .map(line => line.split(':'));

/**
 * Parses the raw server data from text and json to a custom javascript object
 * @param  {String} rawData Raw VATSIM server data
 * @return {Object}         Client data formatted as a javascript object
 */
const parseData = (clientData, centerData) => {
  const clientFactory = new ClientFactory(centerData);

  return clientData.reduce((clients, clientArray) => {
    const client = clientFactory.getClient(clientArray);
    if (client) {
      clients.push(client);
    }
    return clients;
  }, []);
};
