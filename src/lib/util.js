//import airportData from '../data/airports.json';

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
 * Gets the coordinates of an airport
 * @param  {String} icao ICAO code of airport
 * @return {Object}      LatLng object
 */
export function getAirportCoords(icao) {
    const airport = airportData[icao];
    if (airport) {
        return formatLatLng(airport.latitude_deg, airport.longitude_deg);
    }
}
