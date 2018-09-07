import Center from '../Center';
import Controller from '../Controller';
import Pilot from '../Pilot';
import {
    getRandomElement,
    checkID
} from './calc';
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
    } catch (err) {
        console.error(err);
    }
}

/**
 * Parses the raw server data from text and json to a custom javascript object
 * @param  {String} text Raw VATSIM server data
 * @param  {Object} json Raw client dat
 * @return {Object}      Client data formatted as a javascript object
 */
export function parseClientData(rawData) {
    let data = rawData[0].split('!CLIENTS:\r\n').pop().split('\r\n;\r\n;').shift().split('\r\n');
    let centerData = rawData[1].features;
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
                if (controllerType === 'CTR' && center) {
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
