import airportData from '../../data/airports.json';
import colors from '../../config/colors.json';
import constants from '../../config/constants.json';

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
 * Converts degrees to radians
 * @param  {double} deg Degrees value
 * @return {double}     Radians value
 */
function toRadians(deg) {
    return deg * Math.PI / 180;
}
