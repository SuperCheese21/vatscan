import Controller from './Controller';
import Pilot from './Pilot';

const fetchJsonData = async url => {
  const res = await fetch(url);
  const json = await res.json();
  return json;
};

export const fetchData = async sources => {
  const sourceKeys = Object.keys(sources);
  const promises = Object.values(sources).map(url => fetchJsonData(url));
  const results = await Promise.allSettled(promises);
  return results.reduce(
    (acc, { status, value }, index) => ({
      ...acc,
      [sourceKeys[index]]: status === 'fulfilled' ? value : null,
    }),
    {},
  );
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

export const transformVatsimData = ({
  clients: clientData,
  controllers: controllerData,
}) => {
  const polygons = transformControllerData(controllerData.data);
  const pilots = clientData.pilots.map(
    pilot =>
      new Pilot({
        sourceName: 'VATSIM',
        callsign: pilot.callsign,
        id: pilot.cid,
        name: pilot.name,
        server: pilot.server,
        rating: pilot.pilot_rating,
        timeLogon: pilot.logon_time,
        latitude: pilot.latitude,
        longitude: pilot.longitude,
        altitude: pilot.altitude,
        groundSpeed: pilot.groundspeed,
        heading: pilot.heading,
        transponder: pilot.transponder,
        aircraft: pilot.flight_plan?.aircraft,
        tasCruise: pilot.flight_plan?.cruise_tas,
        depAirport: pilot.flight_plan?.departure,
        plannedAltitude: pilot.flight_plan?.altitude,
        arrAirport: pilot.flight_plan?.arrival,
        flightType: pilot.flight_plan?.flight_rules,
        depTime: pilot.flight_plan?.deptime,
        hrsEnRoute: pilot.flight_plan?.enroute_time?.substring(0, 2),
        minEnRoute: pilot.flight_plan?.enroute_time?.substring(2),
        remarks: pilot.flight_plan?.remarks,
        route: pilot.flight_plan?.route,
      }),
  );
  const controllers = clientData.controllers.map(
    controller =>
      new Controller({
        sourceName: 'VATSIM',
        callsign: controller.callsign,
        id: controller.cid,
        name: controller.name,
        server: controller.server,
        rating: controller.rating,
        timeLogon: controller.logon_time,
        frequency: controller.frequency,
        facilityType: controller.facility,
        atisMessage: controller.text_atis?.join('\n'),
        polygon: polygons[controller.callsign],
      }),
  );
  return [...pilots, ...controllers];
};

export const transformPosconData = ({ clients: data }) => {
  const pilots = data.flights.map(
    pilot =>
      new Pilot({
        sourceName: 'POSCON',
        callsign: pilot.callsign,
        id: pilot.userId,
        name: pilot.userName,
        timeLogon: pilot.login,
        latitude: pilot.position?.lat,
        longitude: pilot.position?.long,
        altitude: pilot.position?.pressure_alt,
        groundSpeed: pilot.position?.gs_kt,
        heading: pilot.position?.true_hdg,
        transponder: pilot.squawk,
        aircraft: pilot.ac_type,
        tasCruise: pilot.flightplan?.cruise_spd,
        depAirport: pilot.flightplan?.dep,
        plannedAltitude: pilot.flightplan?.cruise,
        arrAirport: pilot.flightplan?.dest,
        flightType: pilot.flightplan?.rules,
        depTime: pilot.flightplan?.dep_time,
        hrsEnRoute: pilot.flightplan?.eet?.substring(0, 2),
        minEnRoute: pilot.flightplan?.eet?.substring(2),
        remarks: pilot.flightplan?.remarks,
        route: pilot.flightplan?.route,
      }),
  );
  return pilots;
};
