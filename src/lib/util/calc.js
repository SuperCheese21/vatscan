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
 * [getProjectedCoords description]
 * @param  {[type]} loc1     [description]
 * @param  {[type]} distance [description]
 * @param  {[type]} bearing  [description]
 * @return {[type]}          [description]
 */
export function getProjectedCoords(loc1, distance, bearing) {
    const lat1 = toRadians(loc1.latitude);
    const lon1 = toRadians(loc1.longitude);
    const brng = toRadians(bearing);

    const arcLength = distance / constants.EARTH_RADIUS_M;

    const lat2 = Math.asin(Math.sin(lat1) * Math.cos(arcLength) + Math.cos(lat1) * Math.sin(arcLength) * Math.cos(brng));
    const lon2 = lon1 + Math.atan2(Math.sin(brng) * Math.sin(arcLength) * Math.cos(lat1), Math.cos(arcLength) - Math.sin(lat1) * Math.sin(lat2));

    return {
        latitude: toDegrees(lat2),
        longitude: toDegrees(lon2)
    };
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

/**
 * [toDegrees description]
 * @param  {[type]} rad [description]
 * @return {[type]}     [description]
 */
function toDegrees(rad) {
    return rad * 180 / Math.PI;
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
