import { original } from 'immer';
import { Animated } from 'react-native';

import {
  SET_PANEL_POSITION,
  UPDATE_FILTERS,
  UPDATE_FOCUSED_CLIENT_ID,
  UPDATE_FONTS_LOADED,
} from './actionTypes';
import queries from '../api/queries';
import { CONTROLLER_TYPES, PANEL_STATES } from '../config/constants';

export const initialState = {
  fontsLoaded: false,
  focusedClientId: '',
  filters: {
    dataSources: Object.fromEntries(queries.map(({ key }) => [key, true])),
    clientTypes: {
      PILOT: true,
      ATC: true,
    },
    controllerTypes: Object.fromEntries(
      Object.keys(CONTROLLER_TYPES).map(key => [key, true]),
    ),
    aircraft: '',
    airline: '',
    airport: '',
  },
  panelPosition: new Animated.Value(PANEL_STATES.COLLAPSED),
  panelPositionValue: PANEL_STATES.COLLAPSED,
};

export const immerReducer = (draft, action) => {
  switch (action.type) {
    case SET_PANEL_POSITION:
      draft.panelPositionValue = action.payload;
      break;
    case UPDATE_FILTERS: {
      const { filters } = original(draft);
      draft.filters = {
        ...filters,
        ...action.payload,
      };
      break;
    }
    case UPDATE_FONTS_LOADED:
      draft.fontsLoaded = action.payload;
      break;
    case UPDATE_FOCUSED_CLIENT_ID:
      draft.focusedClientId = action.payload;
      break;
    default:
      break;
  }
};

export default immerReducer;
