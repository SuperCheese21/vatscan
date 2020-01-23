import { Animated } from 'react-native';

import {
  getFocusedClient,
  getPanelPosition,
  getPanelPositionValue,
  getServerUrls,
  getTimerID,
} from './selectors';

import {
  checkConnectionInfo,
  fetchData,
  fetchServerUrls,
} from '../api/FetchManager';
import {
  panelStates,
  PANEL_TRANSITION_DURATION,
  UPDATE_INTERVAL,
} from '../config/constants.json';

/* ACTION TYPES */

export const SET_FILTERS = 'SET_FILTERS';
export const SET_FOCUSED_CLIENT = 'SET_FOCUSED_CLIENT';
export const SET_FONTS_LOADED = 'SET_FONTS_LOADED';
export const SET_IS_LOADING = 'SET_IS_LOADING';
export const SET_PANEL_POSITION_VALUE = 'SET_PANEL_POSITION_VALUE';
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
export const SET_SERVER_URLS = 'SET_SERVER_URLS';
export const SET_TIMER_ID = 'SET_TIMER_ID';
export const UPDATE_CLIENTS = 'UPDATE_CLIENTS';

/* ACTION CREATORS */

export const setFilters = filters => ({
  type: SET_FILTERS,
  payload: filters,
});

export const setFontsLoaded = () => ({
  type: SET_FONTS_LOADED,
});

export const setIsLoading = isLoading => ({
  type: SET_IS_LOADING,
  payload: isLoading,
});

export const setPanelPositionValue = position => ({
  type: SET_PANEL_POSITION_VALUE,
  payload: position,
});

export const setSearchQuery = query => ({
  type: SET_SEARCH_QUERY,
  payload: query,
});

export const setTimerID = id => ({
  type: SET_TIMER_ID,
  payload: id,
});

/* THUNK ACTIONS */

export const collapsePanel = () => (dispatch, getState) => {
  const panelPositionValue = getPanelPositionValue(getState());

  // Check if panel is collapsed, exit app if it is
  if (panelPositionValue === panelStates.COLLAPSED) {
    return false;
  }

  dispatch(setPanelPosition(panelStates.COLLAPSED));
  dispatch(setFocusedClient({}));

  return true;
};

export const setFocusedClient = newClient => dispatch => {
  const newPanelPosition = panelStates[`EXPANDED_${newClient.type}`];

  dispatch({
    type: SET_FOCUSED_CLIENT,
    payload: newClient,
  });
  dispatch(setPanelPosition(newPanelPosition));
};

export const setPanelPosition = newPosition => (dispatch, getState) => {
  const state = getState();
  const panelPosition = getPanelPosition(state);

  Animated.timing(panelPosition, {
    toValue: newPosition,
    duration: PANEL_TRANSITION_DURATION,
    useNativeDriver: true,
  }).start();

  dispatch(setPanelPositionValue(newPosition));
};

export const updateClients = () => async (dispatch, getState) => {
  // Show loading spinner
  dispatch(setIsLoading(true));

  // Check connection info
  if (!(await checkConnectionInfo())) {
    dispatch(setIsLoading(false));
    return;
  }

  // Get current copy of state
  const state = getState();
  const serverUrls = getServerUrls(state);
  const timerID = getTimerID(state);

  // Fetch and set server URLs if no server URLs have been saved in state
  if (!serverUrls.length) {
    const urls = await fetchServerUrls();
    await dispatch({
      type: SET_SERVER_URLS,
      payload: urls,
    });
  }

  // Fetch client data
  const clients = await fetchData(!timerID);
  const focusedCallsign = getFocusedClient(state);
  const focusedClient =
    clients.find(client => client.callsign === focusedCallsign) || {};

  // Update state with new data
  dispatch({
    type: UPDATE_CLIENTS,
    payload: clients,
  });
  dispatch(setFocusedClient(focusedClient));

  // Clear existing timer for data updates
  if (timerID) {
    clearTimeout(timerID);
  }

  // Set new timer for data updates and remove loading spinner
  dispatch(setTimerID(setTimeout(updateClients, UPDATE_INTERVAL)));
  dispatch(setIsLoading(false));
};
