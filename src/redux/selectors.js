import { createSelector } from 'reselect';

export const getClients = ({ clients }) => clients;
export const getFilters = ({ filters }) => filters;
export const getFocusedClient = ({ focusedClient }) => focusedClient;
export const getFontsLoaded = ({ fontsLoaded }) => fontsLoaded;
export const getIsLoading = ({ isLoading }) => isLoading;
export const getPanelPosition = ({ panelPosition }) => panelPosition;
export const getPanelPositionValue = ({ panelPositionValue }) =>
  panelPositionValue;
export const getSearchQuery = ({ searchQuery }) => searchQuery;
export const getServerUrls = ({ serverUrls }) => serverUrls;
export const getTimerID = ({ timerID }) => timerID;

export const getFilteredClients = createSelector(
  getClients,
  getFilters,
  (clients, filters) =>
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
    ),
);

export const searchFilteredClients = createSelector(
  getFilteredClients,
  getSearchQuery,
  (clients, oldQuery) => {
    const query = oldQuery.toLowerCase();
    return clients.filter(
      client =>
        client.name.toLowerCase().includes(query) ||
        client.callsign.toLowerCase().includes(query) ||
        client.id.includes(query) ||
        (client.aircraft && client.aircraft.toLowerCase().includes(query)),
    );
  },
);
