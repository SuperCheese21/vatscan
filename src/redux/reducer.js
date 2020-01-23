import {
  SET_FILTERS,
  SET_FOCUSED_CLIENT,
  SET_FONTS_LOADED,
  SET_IS_LOADING,
  SET_PANEL_POSITION_VALUE,
  SET_SERVER_URLS,
  SET_TIMER_ID,
  UPDATE_CLIENTS,
} from './actions';
import { getFilters } from './selectors';

export default (state, { type, payload }) => {
  switch (type) {
    case SET_FILTERS: {
      const oldFilters = getFilters(state);
      return {
        ...state,
        filters: {
          ...oldFilters,
          ...payload,
        },
      };
    }
    case SET_FOCUSED_CLIENT:
      return {
        ...state,
        focusedClient: payload,
      };
    case SET_FONTS_LOADED:
      return {
        ...state,
        fontsLoaded: true,
      };
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    case SET_PANEL_POSITION_VALUE:
      return {
        ...state,
        panelPositionValue: payload,
      };
    case SET_SERVER_URLS:
      return {
        ...state,
        serverUrls: payload,
      };
    case SET_TIMER_ID:
      return {
        ...state,
        timerID: payload || null,
      };
    case UPDATE_CLIENTS:
      return {
        ...state,
        clients: payload,
      };
    default:
      return state;
  }
};
