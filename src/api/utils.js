import { EARTH_RADIUS_M, EARTH_RADIUS_NM } from '../config/constants';
import airportCoords from '../data/airportCoords.json';
import airportNames from '../data/airportNames.json';

/**
 * [formatCoords description]
 * @param  {[type]} coordsArray [description]
 * @return {[type]}             [description]
 */
export function getAirportCoords(icao) {
  const coords = airportCoords[icao];
  if (coords) {
    return {
      latitude: coords[0],
      longitude: coords[1],
    };
  }
  return null;
}

export function getCityName(icao) {
  const names = airportNames[icao];
  if (names) {
    const [city, country, region] = names;
    const regionArray = region.split('-');
    if (['US', 'CA'].includes(regionArray[0])) {
      return `${city}, ${regionArray[1]}`;
    }
    return `${city}, ${country}`;
  }
  return 'Unknown';
}

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
 * Converts degrees to radians
 * @param  {Number} deg Degrees value
 * @return {Number}     Radians value
 */
function toRadians(deg) {
  return (deg * Math.PI) / 180;
}

/**
 * Converts radians to degrees
 * @param  {Number} rad Radians value
 * @return {Number}     Degrees value
 */
function toDegrees(rad) {
  return (rad * 180) / Math.PI;
}

/**
 * Projects a location from another location given a distance and bearing
 * @param  {LatLng} loc1     Coordinates for initial location to project from
 * @param  {Number} distance Distance of projected location from initial location
 * @param  {Number} bearing  Bearing of projected location from initial location
 * @return {LatLng}          Coordinates for projected location
 */
export function getProjectedCoords(loc1, distance, bearing) {
  const lat1 = toRadians(loc1.latitude);
  const lon1 = toRadians(loc1.longitude);
  const brng = toRadians(bearing);

  const arcLength = distance / EARTH_RADIUS_M;

  const lat2 = Math.asin(
    Math.sin(lat1) * Math.cos(arcLength) +
      Math.cos(lat1) * Math.sin(arcLength) * Math.cos(brng),
  );
  const lon2 =
    lon1 +
    Math.atan2(
      Math.sin(brng) * Math.sin(arcLength) * Math.cos(lat1),
      Math.cos(arcLength) - Math.sin(lat1) * Math.sin(lat2),
    );

  return {
    latitude: toDegrees(lat2),
    longitude: toDegrees(lon2),
  };
}

/**
 * Gets the great circle distance between two points on earth
 * @param  {LatLng} lat1 Coordinates of location 1
 * @param  {LatLng} lat2 Coordinates of location 2
 * @return {Number}      Great Circle distance between locations in nautical miles
 */
export function getGCDistance(loc1, loc2) {
  if (loc1 && loc2) {
    const lat1 = toRadians(loc1.latitude);
    const lat2 = toRadians(loc2.latitude);

    const deltaLat = toRadians(loc2.latitude - loc1.latitude);
    const deltaLon = toRadians(loc2.longitude - loc1.longitude);

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(deltaLon / 2) *
        Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return Math.round(c * EARTH_RADIUS_NM);
  }
  return -1;
}

/**
 * Checks for duplicate ID in data array before adding new entry
 * @param  {Array} data Data array of pilot or controller objects
 * @param  {String} id  VATSIM CID to check
 * @return {Boolean}    True if id is already in array, false if it isn't
 */
export function checkID(data, id) {
  if (data.find(client => client.id === id)) {
    return true;
  }

  return false;
}
