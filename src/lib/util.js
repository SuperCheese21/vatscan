import airportData from '../data/airports.json';
import constants from '../config/constants.json';
import colors from '../config/colors.json';

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
    const rand = Math.floor(Math.random() * arr.length);
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
export function formatPilotData(p) {
    return {
        'callsign': p[0],
        'id': p[1],
        'name': p[2],
        'type': 'PILOT',
        'aircraft': p[9],
        'location': formatLatLng(p[5], p[6]),
        'altitude': p[7],
        'heading': Number(p[38]),
        'groundSpeed': p[8],
        'depAirport': p[11],
        'depCoords': airportData[p[11]],
        'arrAirport': p[13],
        'arrCoords': airportData[p[13]]
    };
}

/**
 * Builds a custom javascript object for tower and approach controller data
 * @param  {Array} arr Controller data array
 * @return {Object}    Controller data object
 */
export function formatControllerData(arr, type) {
    return {
        'callsign': arr[0],
        'id': arr[1],
        'name': arr[2],
        'type': type,
        'frequency': arr[4],
        'location': formatLatLng(arr[5], arr[6]),
        'radius': constants.mapOverlays[type].radius,
        'strokeColor': colors.mapOverlays[type].stroke,
        'fillColor': colors.mapOverlays[type].fill,
        'fillColorSelected': colors.mapOverlays[type].fillSelected,
        'zIndex': constants.mapOverlays[type].zIndex
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
 * Gets the great circle distance between two points on earth
 * @param  {LatLng} lat1 Coordinates of location 1
 * @param  {LatLng} lat2 Coordinates of location 2
 * @return {double}      Great Circle distance between locations in nautical miles
 */
export function getGCDistance(loc1, loc2) {
    if (loc1 && loc2) {
        const lat1 = toRadians(loc1.latitude);
        const lat2 = toRadians(loc2.latitude);

        const deltaLat = toRadians(loc2.latitude - loc1.latitude);
        const deltaLon = toRadians(loc2.longitude - loc1.longitude);

        var a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
                Math.cos(lat1) * Math.cos(lat2) *
                Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return Math.round(c * constants.EARTH_RADIUS_NM);
    }
    return -1;
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
    } else if (checkAircraftType(narrowbody, icao) || !icao) {
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
 * Converts degrees to radians
 * @param  {double} deg Degrees value
 * @return {double}     Radians value
 */
function toRadians(deg) {
    return deg * Math.PI / 180;
}
