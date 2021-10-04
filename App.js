import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import * as Linking from 'expo-linking';
import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Animated } from 'react-native';

import {
  fetchData,
  getFilteredClients,
  transformData,
} from './src/api/fetchUtils';
import StackNavigator from './src/components/navigation/StackNavigator';
import {
  CONTROLLER_TYPES,
  PANEL_STATES,
  PANEL_TRANSITION_DURATION,
  DATA_SOURCES,
} from './src/config/constants';

export default class App extends Component {
  // Initialize component state and fetch manager
  state = {
    fontsLoaded: false,
    dataSources: Object.fromEntries(
      Object.keys(DATA_SOURCES).map(sourceName => [
        sourceName,
        {
          timerId: null,
          clients: [],
          loading: false,
        },
      ]),
    ),
    focusedClient: {},
    filters: {
      dataSources: Object.fromEntries(
        Object.keys(DATA_SOURCES).map(key => [key, true]),
      ),
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

  componentDidMount() {
    this.fetchAllData();
  }

  componentWillUnmount() {
    this.clearAllFetchTimers();
  }

  setFilters = newFilters =>
    this.setState(({ filters: oldFilters }) => ({
      filters: {
        ...oldFilters,
        ...newFilters,
      },
    }));

  setFocusedClient = focusedClient => {
    this.setPanelPosition(PANEL_STATES[`EXPANDED_${focusedClient.type}`]);
    this.setState({ focusedClient });
  };

  setPanelPosition(newPosition) {
    // Animate info panel position change
    const { panelPosition } = this.state;
    Animated.timing(panelPosition, {
      toValue: newPosition,
      duration: PANEL_TRANSITION_DURATION,
      useNativeDriver: true,
    }).start();
    this.setState({
      panelPositionValue: newPosition,
    });
  }

  collapsePanel = () => {
    const { panelPositionValue } = this.state;

    // Check if panel is collapsed, exit app if it is
    if (panelPositionValue === PANEL_STATES.COLLAPSED) {
      return false;
    }

    // Collapse panel and remove focused client
    this.setPanelPosition(PANEL_STATES.COLLAPSED);
    this.setState({
      focusedClient: {},
    });

    return true;
  };

  loadFonts = async () => {
    /* eslint-disable global-require */
    await Font.loadAsync({
      Roboto_Regular: require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
      Roboto_Condensed_Regular: require('./assets/fonts/Roboto_Condensed/RobotoCondensed-Regular.ttf'),
      Roboto_Mono: require('./assets/fonts/Roboto_Mono/RobotoMono-Regular.ttf'),
    });
    /* eslint-enable global-require */
  };

  clearAllFetchTimers = () => {
    const { dataSources } = this.state;
    Object.values(dataSources).forEach(({ timerId }) => {
      if (timerId) clearTimeout(timerId);
    });
  };

  updateDataSource = ({ sourceName, update }) =>
    this.setState(({ dataSources }) => ({
      dataSources: {
        ...dataSources,
        [sourceName]: {
          ...dataSources[sourceName],
          ...update,
        },
      },
    }));

  fetchData = async ({ sourceName, updateInterval }) => {
    this.updateDataSource({
      sourceName,
      update: {
        timerId: setTimeout(
          () => this.fetchData({ sourceName, updateInterval }),
          updateInterval,
        ),
        loading: true,
      },
    });
    const { sources } = DATA_SOURCES[sourceName];
    const promises = sources.map(({ url }) => fetchData(url));
    const results = await Promise.all(promises);
    const data = Object.fromEntries(
      results.map((res, index) => [sources[index].name, res]),
    );
    this.updateDataSource({
      sourceName,
      update: {
        clients: transformData({ sourceName, data }),
        loading: false,
      },
    });
  };

  fetchAllData = () => {
    this.clearAllFetchTimers();
    Promise.all(
      Object.entries(DATA_SOURCES).map(([sourceName, { updateInterval }]) =>
        this.fetchData({ sourceName, updateInterval }),
      ),
    );
  };

  render() {
    const {
      dataSources,
      filters,
      fontsLoaded,
      focusedClient,
      panelPosition,
    } = this.state;

    const allClients = Object.values(dataSources)
      .map(({ clients }) => clients)
      .flat();
    const filteredClients = getFilteredClients(allClients, filters);

    const isLoading = Object.values(dataSources).some(({ loading }) => loading);

    return (
      <>
        {fontsLoaded ? (
          <StackNavigator
            uriPrefix={Linking.makeUrl('/')}
            screenProps={{
              isLoading,
              filters,
              filteredClients,
              focusedClient,
              panelPosition,
              updateData: this.fetchAllData,
              setFilters: this.setFilters,
              setFocusedClient: this.setFocusedClient,
              collapsePanel: this.collapsePanel,
            }}
          />
        ) : (
          <AppLoading
            startAsync={this.loadFonts}
            onFinish={() =>
              this.setState({
                fontsLoaded: true,
              })
            }
            onError={console.warn}
          />
        )}
        {/* eslint-disable-next-line react/style-prop-object */}
        <StatusBar style="light" />
      </>
    );
  }
}
