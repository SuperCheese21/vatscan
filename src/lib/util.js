import constants from '../config/constants.json';

const NARROWBODY_ICON = require('../assets/icons/narrowbody.png');
const WIDEBODY_ICON = require('../assets/icons/widebody.png');
const GA_ICON = require('../assets/icons/ga.png');
const SEEKBAR_ICON = require('../assets/icons/seekbar.png');

/**
 * Selects a random element in an array and returns it
 * @param  {String} arr Array of strings (or any data type) to select from
 * @return {String}     Random array element
 */
export function getRandomElement(arr) {
    const len = arr.length;
    const rand = Math.floor(Math.random() * len);

    return arr[rand];
}

/**
 * Builds a LatLng object given a latitude and longitude
 * @param  {String} lat Latitude
 * @param  {String} lon Longitude
 * @return {Object}     LatLng object
 */
export function formatLatLng(lat, lon) {
    return {
        'latitude': Number(lat),
        'longitude': Number(lon)
    };
}

/**
 * Builds a javascript object from the pilot data array
 * @param  {Array} arr Pilot data array
 * @return {Object}    Pilot data object
 */
export function formatPilotData(arr) {
    return {
        'callsign': arr[0],
        'id': arr[1],
        'name': arr[2],
        'location': formatLatLng(arr[5], arr[6]),
        'altitude': arr[7],
        'groundspeed': arr[8],
        'flightplan': {
            'aircraft': arr[9],
            'depairport': arr[11],
            'altitude': arr[12],
            'destairport': arr[13],
            'flighttype': arr[21],
            'actdeptime': arr[23],
            'altairport': arr[28],
            'remarks': arr[29],
            'route': arr[30]
        },
        'transponder': arr[17],
        'heading': Number(arr[38])
    };
}

/**
 * Builds a custom javascript object for tower and approach controller data
 * @param  {Array} arr Controller data array
 * @return {Object}    Controller data object
 */
export function formatATCData(arr) {
    return {
        'callsign': arr[0],
        'id': arr[1],
        'name': arr[2],
        'frequency': arr[4],
        'location': formatLatLng(arr[5], arr[6])
    };
}

/**
 * Returns the correct icon based on the aircraft type
 * @param  {String} aircraft ICAO aircraft designator
 * @return {Image}           Icon to render on map
 */
export function getAircraftIcon(aircraft) {
    let icon, type = getAircraftType(aircraft);

    if (type === 2) {
        return WIDEBODY_ICON;
    } else if (type === 1) {
        return NARROWBODY_ICON;
    }
    return GA_ICON;
}

/**
 * Checks for duplicate ID in data array before adding new entry
 * @param  {Array} data Data array of pilot or controller objects
 * @param  {String} id  VATSIM CID to check
 * @return {Boolean}    True if id is already in array, false if it isn't
 */
export function checkID(data, id) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            return true;
        }
    }
    return false;
}

/**
 * Returns the type of aircraft based on ICAO code
 * @param  {String} aircraft Aircraft ICAO type designator
 * @return {int}             Aircraft type (0 - GA, 1 - Narrowbody, 2 - Widebody)
 */
function getAircraftType(icao) {
    const widebody = constants.aircraft.WIDEBODY;
    const narrowbody = constants.aircraft.NARROWBODY;

    if (checkAircraftType(widebody, icao)) {
        return 2;
    } else if (checkAircraftType(narrowbody, icao)) {
        return 1;
    }
    return 0;
}

/**
 * Checks a string against a list of valid substrings for a match
 * @param  {Array} list  Array of valid substrings
 * @param  {String} icao ICAO aircraft type designator
 * @return {boolean}     ICAO includes at least one valid substring
 */
function checkAircraftType(list, icao) {
    for (let i = 0; i < list.length; i++) {
        const aircraft = list[i];
        if (icao.includes(aircraft)) {
            return true;
        }
    }
    return false;
}

/**
 * Gets the coordinates of an airport
 * @param  {String} icao ICAO code of airport
 * @return {Object}      LatLng object
 */
// export function getAirportCoords(icao) {
//     const airport = airportData[icao];
//     if (airport) {
//         return formatLatLng(airport.latitude_deg, airport.longitude_deg);
//     }
// }
