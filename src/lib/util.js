import constants from '../config/constants.json';

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
 * Returns the path to the correct aircraft icon based on ICAO code
 * @param  {String} aircraft Aircraft ICAO type designator
 * @return {int}             Aircraft type (0 - GA, 1 - Narrowbody, 2 - Widebody)
 */
export function getAircraftType(icao) {
    const widebody = constants.aircraft.WIDEBODY;
    const narrowbody = constants.aircraft.NARROWBODY;

    if (checkType(widebody, icao)) {
        return 2;
    } else if (checkType(narrowbody, icao)) {
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
function checkType(list, icao) {
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
