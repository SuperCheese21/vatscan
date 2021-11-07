import {
  SET_PANEL_POSITION,
  UPDATE_FILTERS,
  UPDATE_FOCUSED_CLIENT,
  UPDATE_FONTS_LOADED,
} from './actionTypes';

const setPanelPosition = payload => ({
  type: SET_PANEL_POSITION,
  payload,
});

const updateFilters = payload => ({
  type: UPDATE_FILTERS,
  payload,
});

const updateFontsLoaded = payload => ({
  type: UPDATE_FONTS_LOADED,
  payload,
});

const updateFocusedClient = payload => ({
  type: UPDATE_FOCUSED_CLIENT,
  payload,
});

const mapDispatchToActions = dispatch => ({
  setPanelPosition: payload => dispatch(setPanelPosition(payload)),
  updateFilters: payload => dispatch(updateFilters(payload)),
  updateFontsLoaded: payload => dispatch(updateFontsLoaded(payload)),
  updateFocusedClient: payload => dispatch(updateFocusedClient(payload)),
});

export default mapDispatchToActions;
