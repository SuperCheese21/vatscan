import { Alert } from 'react-native';
import Controller from './Controller';
import Pilot from './Pilot';
import { getRandomElement } from './utils';

export const fetchData = async (urls, errorTitle) => {
  const url = Array.isArray(urls) ? getRandomElement(urls) : urls;
  if (!url) return null;
  try {
    const res = await fetch(url);
    const json = await res.json();
    return json;
  } catch (err) {
    if (errorTitle) Alert.alert(errorTitle, err.message);
    return null;
  }
};

export const transformControllerData = (controllerData = []) =>
  controllerData.reduce((acc, { session, polygon, location }) => {
    const callsign = session?.callsign;
    if (callsign && (polygon?.length || location?.latitude)) {
      return {
        ...acc,
        [callsign]: { polygon, location },
      };
    }
    return acc;
  }, {});

export const transformVatsimData = ({ clients: clientData }) => {
  const pilots = clientData.pilots.map(pilotData => new Pilot(pilotData));
  const controllers = clientData.controllers.map(
    controller => new Controller(controller),
  );
  return [...pilots, ...controllers];
};

export const transformPosconData = ({ clients: data }) => {
  console.log(data);
  return [];
};

export const transformData = ({ sourceName, data }) => {
  switch (sourceName) {
    case 'VATSIM':
      return transformVatsimData(data);
    case 'POSCON':
      return transformPosconData(data);
    default:
      return [];
  }
};

export const getFilteredClients = (clients, filters) =>
  clients.filter(
    client =>
      Object.keys(filters.clientTypes)
        .filter(key => filters.clientTypes[key])
        .includes(client.type) &&
      (client.type !== 'ATC' ||
        Object.keys(filters.controllerTypes)
          .filter(key => filters.controllerTypes[key])
          .includes(client.controllerType)) &&
      (client.type !== 'PILOT' ||
        (client.aircraft.includes(filters.aircraft) &&
          client.callsign.includes(filters.airline) &&
          (client.depAirport.includes(filters.airport) ||
            client.arrAirport.includes(filters.airport)))),
  );
