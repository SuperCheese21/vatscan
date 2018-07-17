import { getRandomElement, formatLatLng } from './util';
import constants from '../config/constants.json';

/**
 * async/await function that requests pilot and ATC data from separate servers
 * @return {Promise} VATSIM server data promise object
 */
export async function fetchData() {
    const pilotsUrl = getRandomElement(constants.SERVER_URLS);
    const atcUrl = 'https://map.vatsim.net/api/atcGeoJSON';
    try {
        const data = await Promise.all([
            fetch(pilotsUrl).then(data => data.text()),
            fetch(atcUrl).then(data => data.json())
        ]);
        return data;
    } catch (e) {
        console.error(e);
    }
}

/**
 * Parses the raw data into a javascript object for easier data access
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
 * Parses GeoJSON ATC data into custom JSON format
 * @param  {Object} json GeoJSON ATC data
 * @return {Array}       Array of controllers in custom format
 */
export function parseATCData(json) {
    let controllers = [];
    json.features.forEach(c => {
        const coords = c.geometry.coordinates[0];
        const polygon = coords.map(c => ({
            latitude: c[1],
            longitude: c[0]
        }));
        controllers.push({
            id: c.id,
            name: c.properties.name,
            callsign: c.properties.callsign,
            frequency: c.properties.frequency,
            polygon: polygon
        });
    });
    return controllers;
}

/**
 * Builds a javascript object from the pilot data array
 * @param  {String} arr Pilot data array
 * @return {Object}     Pilot data object
 */
function formatPilotData(arr) {
    return {
        'callsign': arr[0],
        'cid': arr[1],
        'realname': arr[2],
        'location': formatLatLng(arr[5], arr[6]),
        'altitude': arr[7],
        'groundspeed': arr[8],
        'flightplan': formatFlightPlan(arr),
        'transponder': arr[17],
        'heading': Number(arr[38])
    };
}

/**
 * Builds a flightplan javascript object from the pilot data array
 * @param  {String} arr Pilot data array
 * @return {Object}     Formatted flightplan object
 */
function formatFlightPlan(arr) {
    return {
        'aircraft': arr[9],
        'depairport': arr[11],
        'altitude': arr[12],
        'destairport': arr[13],
        'flighttype': arr[21],
        'actdeptime': arr[23],
        'altairport': arr[28],
        'remarks': arr[29],
        'route': arr[30]
    };
}
