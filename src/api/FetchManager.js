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
    async fetchData(focusedCallsign, isInitialFetch) {
        // Fetch server URLs on first execution
        if (!this.serverUrls.length) {
            await this._fetchServerUrls();
        }

        // Pick random URL
        const clientsUrl = getRandomElement(this.serverUrls);

        // Fetch data
        const data = await Promise.all([
            fetch(clientsUrl)
                .then(res => res.text())
                .then(text =>
                    text
                        .split('!CLIENTS:\r\n')
                        .pop()
                        .split('\r\n;\r\n;')
                        .shift()
                        .split('\r\n')
                )
                .catch(
                    e =>
                        isInitialFetch &&
                        Alert.alert('Error', 'Unable to fetch client data')
                ), // eslint-disable-line
            fetch(ARTCC_URL)
                .then(res => res.json())
                .then(json => json.features)
                .catch(
                    e =>
                        isInitialFetch &&
                        Alert.alert('Error', 'Unable to fetch ARTCC data')
                ) // eslint-disable-line
        ]);

        return this._parseData(data, focusedCallsign);
    }

    /**
     * Parses the raw server data from text and json to a custom javascript object
     * @param  {String} text Raw VATSIM server data
     * @param  {Object} json Raw client dat
     * @return {Object}      Client data formatted as a javascript object
     */
    _parseData(rawData, focusedCallsign) {
        const data = rawData[0] || [];
        const centerData = rawData[1] || [];
        const clientFactory = new ClientFactory(centerData);

        // Define data object for client data
        let clientData = {
            clients: [],
            focusedClient: {}
        };

        // Iterate through each client in raw data array
        data.forEach(rawClient => {
            const client = clientFactory.getClient(rawClient.split(':'));
            if (client) {
                if (client.callsign === focusedCallsign) {
                    clientData.focusedClient = client;
                }
                clientData.clients.push(client);
            }
        });

        return clientData;
    }

    /**
     * [getServerUrls description]
     * @return {Promise} [description]
     */
    async _fetchServerUrls() {
        try {
            const text = await fetch(STATUS_URL).then(res => res.text());

            text.split('\n').forEach(line => {
                if (line.includes('url0=')) {
                    this.serverUrls.push(line.replace('url0=', ''));
                }
            });
        } catch (err) {
            console.error(err);
        }
    }
}
