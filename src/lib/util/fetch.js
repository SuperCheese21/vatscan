import { Alert } from 'react-native';

import Center from '../Center';
import Controller from '../Controller';
import Pilot from '../Pilot';
import { getRandomElement, checkID } from './calc';
import constants from '../../config/constants.json';

/**
 * async/await function that requests pilot and ATC data from separate servers
 * @return {Promise} VATSIM server data promise object
 */
export async function fetchData(initialFetch) {
    const urls = await getServerUrls();

    const clientsUrl = getRandomElement(urls);
    const artccUrl = constants.ARTCC_URL;

    return await Promise.all([
        fetch(clientsUrl)
            .then(res => res.text())
            .then(text => text.split('!CLIENTS:\r\n').pop().split('\r\n;\r\n;').shift().split('\r\n'))
            .catch(e => initialFetch && Alert.alert('Error', 'Unable to fetch client data')),
        fetch(artccUrl)
            .then(res => res.json())
            .then(json => json.features)
            .catch(e => initialFetch && Alert.alert('Error', 'Unable to fetch ARTCC data'))
    ]);
}

/**
 * Parses the raw server data from text and json to a custom javascript object
 * @param  {String} text Raw VATSIM server data
 * @param  {Object} json Raw client dat
 * @return {Object}      Client data formatted as a javascript object
 */
export function parseClientData(rawData) {
    let data = rawData[0] || [];
    let centerData = rawData[1] || [];
    let clientData = [];    // Data array of connected VATSIM clients

    // Iterate through each client in raw data array
    data.forEach(client => {
        const dataArray = client.split(':');
        const clientType = dataArray[3];

        // If client is a pilot
        if (clientType === 'PILOT') {
            clientData.push(new Pilot(dataArray));
        }

        // If client is an ATC
        else if (clientType === 'ATC') {
            const id = dataArray[1];
            const controllerType = dataArray[0].split('_').pop();

            // If id has not already been added to data array
            // Duplicate ID connections only appear with controllers
            if (!checkID(clientData, id)) {
                const center = findInCenterData(centerData, id);
                if (controllerType === 'CTR') {
                    clientData.push(new Center(dataArray, center));
                } else if (['APP','DEP','TWR','GND'].includes(controllerType)) {
                    clientData.push(new Controller(dataArray, controllerType));
                }
            }
        }
    });

    return clientData;
}

/**
 * [getServerUrls description]
 * @return {[type]} [description]
 */
async function getServerUrls() {
    try {
        const res = await fetch('https://status.vatsim.net/');
        const text = await res.text();

        const urls = [];

        text.split('\n').forEach(line => {
            if (line.includes('url0=')) {
                urls.push(line.replace('url0=', ''));
            }
        });

        return urls;
    } catch (err) {
        console.error(err);
    }
}

/**
 * [findInCenterData description]
 * @param  {[type]} data [description]
 * @param  {[type]} id   [description]
 * @return {[type]}      [description]
 */
function findInCenterData(data, id) {
    for (const center of data) {
        if (center.id === Number(id)) {
            return center;
        }
    }
}
