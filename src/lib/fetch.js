import {
    getRandomElement,
    formatLatLng,
    formatPilotData,
    formatControllerData,
    checkID
} from './util';
import colors from '../config/colors.json';
import constants from '../config/constants.json';

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
    let clientData = parseCenterData(data[1]);

    rawData.forEach(client => {
        const arr = client.split(':');
        if (arr[3] === 'PILOT') {
            clientData.push(formatPilotData(arr));
        } else if (arr[0].includes('_APP') || arr[0].includes('_DEP')) {
            clientData.push(formatControllerData(arr, 'APP'));
        } else if (arr[0].includes('_TWR')) {
            clientData.push(formatControllerData(arr, 'TWR'));
        } else if (arr[0].includes('_GND')) {
            clientData.push(formatControllerData(arr, 'GND'));
        }
    });
    return clientData;
}

/**
 * Parses GeoJSON ATC data into custom JSON format
 * @param  {Object} json GeoJSON ATC data
 * @return {Array}       Array of controllers in custom format
 */
function parseCenterData(json) {
    let centerData = [];
    json.features.forEach(controller => {
        if (!checkID(centerData, controller.id)) {
            const coords = controller.geometry.coordinates[0];
            const polygon = coords.map(coord => ({
                latitude: coord[1],
                longitude: coord[0]
            }));
            centerData.push({
                'callsign': controller.properties.callsign,
                'id': controller.id,
                'name': controller.properties.name,
                'type': 'CTR',
                'frequency': controller.properties.frequency,
                'polygon': polygon,
                'strokeWidth': constants.mapOverlays['CTR'].strokeWidth,
                'strokeColor': colors.mapOverlays['CTR'].stroke,
                'fillColor': colors.mapOverlays['CTR'].fill,
                'fillColorSelected': colors.mapOverlays['CTR'].fillSelected,
                'zIndex': constants.mapOverlays['CTR'].zIndex
            });
        }
    });
    return centerData;
}
