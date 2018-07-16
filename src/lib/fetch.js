import { getRandomElement, formatLatLng } from './util';
import constants from '../config/constants.json';

/**
 * async/await function that requests data from a random VATSIM data server URL
 * @return {String} VATSIM server data
 */
export default async function fetchPilotData() {
    const url = getRandomElement(constants.SERVER_URLS);
    try {
        let res = await fetch(url);
        let text = await res.text();
        return parseData(text);
    } catch (e) {
        console.error(e);
    }
}

/**
 * Parses the raw data into a javascript object for easier data access
 * @param  {String} text Raw text data from random server URL
 * @return {object}      Client data formatted in javascript object
 */
function parseData(text) {
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
