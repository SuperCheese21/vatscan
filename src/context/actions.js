import { Animated } from 'react-native';

import {
  SET_PANEL_POSITION,
  UPDATE_FILTERS,
  UPDATE_FOCUSED_CLIENT,
  UPDATE_FONTS_LOADED,
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

const setPanelPosition = payload => async (dispatch, getState) => {
  const { panelPosition } = getState();
  Animated.timing(panelPosition, {
    toValue: payload,
    duration: PANEL_TRANSITION_DURATION,
    useNativeDriver: true,
  }).start(() => dispatch({ type: SET_PANEL_POSITION, payload }));
};

const updateFocusedClient = payload => dispatch => {
  const newPanelState = payload.type
    ? PANEL_STATES[`EXPANDED_${payload.type}`]
    : PANEL_STATES.COLLAPSED;
  dispatch(setPanelPosition(newPanelState));
  dispatch({ type: UPDATE_FOCUSED_CLIENT, payload });
};

const collapsePanel = () => (dispatch, getState) => {
  const { panelPositionValue } = getState();
  if (panelPositionValue !== PANEL_STATES.COLLAPSED) {
    dispatch(updateFocusedClient({}));
  }
};

const mapDispatchToActions = dispatch => ({
  setPanelPosition: payload => dispatch(setPanelPosition(payload)),
  updateFilters: payload => dispatch(updateFilters(payload)),
  updateFontsLoaded: payload => dispatch(updateFontsLoaded(payload)),
  updateFocusedClient: payload => dispatch(updateFocusedClient(payload)),
  collapsePanel: () => dispatch(collapsePanel()),
});

export default mapDispatchToActions;
