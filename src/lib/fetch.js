import {
    getRandomElement,
    formatLatLng,
    formatPilotData,
    formatATCData,
    checkID
} from './util';
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
 * Parses the raw server data from text to a custon javascript object
 * @param  {String} text Raw text data from random server URL
 * @return {object}      Client data formatted in javascript object
 */
export function parsePilotData(text) {
    let raw = text.split('!CLIENTS:\r\n').pop().split('\r\n;\r\n;').shift();
    let rawArr = raw.split('\r\n');
    let pilots = [];

    rawArr.forEach(client => {
        const arr = client.split(':');
        if (arr[3] == 'PILOT') {
            pilots.push(formatPilotData(arr));
        }
    });

    return pilots;
}

/**
 * Parses the raw server data from text and json to a custom javascript object
 * @param  {String} text Raw VATSIM server data
 * @param  {Object} json Raw ARTCC controller data from map.vatsim.net
 * @return {Object}      Controller data formatted as a javascript object
 */
export function parseATCData(text, json) {
    let raw = text.split('!CLIENTS:\r\n').pop().split('\r\n;\r\n;').shift();
    let rawArr = raw.split('\r\n');
    let approachData = [], towerData = [], groundData = [];
    let centerData = parseCenterData(json);

    rawArr.forEach(client => {
        const arr = client.split(':');
        if (arr[0].includes('_APP') || arr[0].includes('_DEP')) {
            approachData.push(formatATCData(arr));
        } else if (arr[0].includes('_TWR')) {
            towerData.push(formatATCData(arr));
        } else if (arr[0].includes('_GND')) {
            groundData.push(formatATCData(arr));
        }
    });

    return {
        'approach': approachData,
        'tower': towerData,
        'center': centerData,
        'ground': groundData
    };
}

/**
 * Parses GeoJSON ATC data into custom JSON format
 * @param  {Object} json GeoJSON ATC data
 * @return {Array}       Array of controllers in custom format
 */
function parseCenterData(json) {
    let centerData = [];
    json.features.forEach(c => {
        if (!checkID(centerData, c.id)) {
            const coords = c.geometry.coordinates[0];
            const polygon = coords.map(c => ({
                latitude: c[1],
                longitude: c[0]
            }));
            centerData.push({
                'callsign': c.properties.callsign,
                'id': c.id,
                'name': c.properties.name,
                'frequency': c.properties.frequency,
                'polygon': polygon
            });
        }
    });
    return centerData;
}
