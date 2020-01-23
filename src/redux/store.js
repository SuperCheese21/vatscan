import { applyMiddleware, createStore } from 'redux';
import { Animated } from 'react-native';
import thunk from 'redux-thunk';

import reducer from './reducer';

import { controllerTypes, panelStates } from '../config/constants.json';

const initialState = {
  clients: [],
  filters: {
    clientTypes: {
      PILOT: true,
      ATC: true,
    },
    controllerTypes: Object.fromEntries(
      Object.keys(controllerTypes).map(key => [key, true]),
    ),
    aircraft: '',
    airline: '',
    airport: '',
  },
  focusedClient: {},
  fontsLoaded: false,
  isLoading: false,
  panelPosition: new Animated.Value(panelStates.COLLAPSED),
  panelPositionValue: panelStates.COLLAPSED,
  searchQuery: '',
  serverUrls: [],
  timerID: null,
};

export default createStore(reducer, initialState, applyMiddleware(thunk));
