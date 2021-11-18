import { Animated } from 'react-native';

import {
  SET_PANEL_POSITION,
  UPDATE_FILTERS,
  UPDATE_FOCUSED_CLIENT_ID,
  UPDATE_FONTS_LOADED,
  UPDATE_SEARCH_QUERY,
} from './actionTypes';
import { PANEL_STATES, PANEL_TRANSITION_DURATION } from '../config/constants';

const updateFilters = payload => ({
  type: UPDATE_FILTERS,
  payload,
});

const updateFontsLoaded = payload => ({
  type: UPDATE_FONTS_LOADED,
  payload,
});

const updateSearchQuery = payload => ({
  type: UPDATE_SEARCH_QUERY,
  payload,
});

const setPanelPosition = payload => async (dispatch, getState) => {
  const { panelPosition } = getState();
  Animated.timing(panelPosition, {
    toValue: payload,
    duration: PANEL_TRANSITION_DURATION,
    useNativeDriver: true,
  }).start(() => dispatch({ type: SET_PANEL_POSITION, payload }));
};

const updateFocusedClientId = payload => dispatch => {
  const newPanelState = payload.type
    ? PANEL_STATES[`EXPANDED_${payload.type}`]
    : PANEL_STATES.COLLAPSED;
  dispatch(setPanelPosition(newPanelState));
  dispatch({ type: UPDATE_FOCUSED_CLIENT_ID, payload });
};

const collapsePanel = () => (dispatch, getState) => {
  const { panelPositionValue } = getState();
  if (panelPositionValue !== PANEL_STATES.COLLAPSED) {
    dispatch(updateFocusedClientId(''));
  }
};

const mapDispatchToActions = dispatch => ({
  setPanelPosition: payload => dispatch(setPanelPosition(payload)),
  updateFilters: payload => dispatch(updateFilters(payload)),
  updateFontsLoaded: payload => dispatch(updateFontsLoaded(payload)),
  updateFocusedClientId: payload => dispatch(updateFocusedClientId(payload)),
  updateSearchQuery: payload => dispatch(updateSearchQuery(payload)),
  collapsePanel: () => dispatch(collapsePanel()),
});

export default mapDispatchToActions;
