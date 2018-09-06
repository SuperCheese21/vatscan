import Center from '../Center';
import Controller from '../Controller';
import Pilot from '../Pilot';
import {
    getRandomElement,
    formatPilotData,
    formatControllerData,
    checkID
} from './calc';
import colors from '../../config/colors.json';
import constants from '../../config/constants.json';

/**
 * async/await function that requests pilot and ATC data from separate servers
 * @return {Promise} VATSIM server data promise object
 */
export async function fetchData() {
    const clientsUrl = getRandomElement(constants.SERVER_URLS);
    const artccUrl = constants.ARTCC_URL;
    try {
        const data = await Promise.all([
            fetch(clientsUrl).then(data => data.text()),
            fetch(artccUrl).then(data => data.json())
        ]);
        return data;
    } catch (e) {
        console.error(e);
    }
}

/**
 * Parses the raw server data from text and json to a custom javascript object
 * @param  {String} text Raw VATSIM server data
 * @param  {Object} json Raw client dat
 * @return {Object}      Client data formatted as a javascript object
 */
export function parseClientData(data) {
    let rawData = data[0].split('!CLIENTS:\r\n').pop().split('\r\n;\r\n;').shift().split('\r\n');
    let rawCenterData = data[1].features;
    let clientData = [];

    rawData.forEach(client => {
        const arr = client.split(':');
        const callsign = arr[0];
        const cid = arr[1];
        const clientType = arr[3];

        if (clientType === 'PILOT') {
            clientData.push(new Pilot(arr));
        } else if (clientType === 'ATC') {
            const centerClient = findInCenterData(rawCenterData, cid);
            if (centerClient) {
                clientData.push(new Center(arr, centerClient));
            } else {
                clientData.push(new Controller(arr));
            }
        }
    });

    return clientData;
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
