import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import * as Linking from 'expo-linking';
import { StatusBar } from 'expo-status-bar';
import React, { PureComponent } from 'react';
import { Animated } from 'react-native';

import { fetchData, getFilteredClients } from './src/api/fetchUtils';
import StackNavigator from './src/components/navigation/StackNavigator';
import {
  controllerTypes,
  panelStates,
  panelTransitionDuration,
  DATA_SOURCES,
} from './src/config/constants.json';

export default class App extends PureComponent {
  // Initialize component state and fetch manager
  state = {
    fontsLoaded: false,
    loadingStates: {},
    data: {},
    timerIds: {},
    clients: {},
    focusedClient: {},
    polygonCoords: {},
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
    panelPosition: new Animated.Value(panelStates.COLLAPSED),
    panelPositionValue: panelStates.COLLAPSED,
  };

  componentDidMount() {
    this.fetchAllData();
  }

  componentWillUnmount() {
    const { timerIds } = this.state;
    Object.values(timerIds).forEach(timerId => {
      if (timerId) clearTimeout(timerId);
    });
  }

  setFilters = newFilters =>
    this.setState(({ filters: oldFilters }) => ({
      filters: {
        ...oldFilters,
        ...newFilters,
      },
    }));

  setFocusedClient = focusedClient => {
    this.setPanelPosition(panelStates[`EXPANDED_${focusedClient.type}`]);
    this.setState({ focusedClient });
  };

  setPanelPosition(newPosition) {
    // Animate info panel position change
    const { panelPosition } = this.state;
    Animated.timing(panelPosition, {
      toValue: newPosition,
      duration: panelTransitionDuration,
      useNativeDriver: true,
    }).start();
    this.setState({
      panelPositionValue: newPosition,
    });
  }

  collapsePanel = () => {
    const { panelPositionValue } = this.state;

    // Check if panel is collapsed, exit app if it is
    if (panelPositionValue === panelStates.COLLAPSED) {
      return false;
    }

    // Collapse panel and remove focused client
    this.setPanelPosition(panelStates.COLLAPSED);
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

  getTransformedData = ({ sourceName, data }) => {
    switch (sourceName) {
      case 'VATSIM':
        return [];
      case 'POSCON':
        return [];
      default:
        return [];
    }
  };

  fetchData = async ({ sourceName, updateInterval }) => {
    this.setState(({ loadingStates, timerIds }) => {
      const timerId = timerIds[sourceName];
      if (timerId) clearTimeout(timerId);
      return {
        loadingStates: {
          ...loadingStates,
          [sourceName]: true,
        },
        timerIds: {
          ...timerIds,
          [sourceName]: setTimeout(
            () => this.fetchData({ sourceName, updateInterval }),
            updateInterval,
          ),
        },
      };
    });
    const { sources } = DATA_SOURCES[sourceName];
    const promises = sources.map(({ url }) => fetchData(url));
    const results = await Promise.all(promises);
    const newData = Object.fromEntries(
      results.map((res, index) => [sources[index].name, res]),
    );
    this.setState(({ clients, data, loadingStates }) => ({
      data: {
        ...data,
        [sourceName]: newData,
      },
      clients: {
        ...clients,
        [sourceName]: this.getTransformedData({ sourceName, data: newData }),
      },
      loadingStates: {
        ...loadingStates,
        [sourceName]: false,
      },
    }));
  };

  fetchAllData = () =>
    Promise.all(
      Object.entries(DATA_SOURCES).map(([sourceName, { updateInterval }]) =>
        this.fetchData({ sourceName, updateInterval }),
      ),
    );

  render() {
    const {
      clients,
      filters,
      fontsLoaded,
      loadingStates,
      focusedClient,
      polygonCoords,
      panelPosition,
    } = this.state;

    const allClients = Object.values(clients).flat();
    const filteredClients = getFilteredClients(allClients, filters);

    const isLoading = Object.values(loadingStates).some(loading => loading);

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
              polygonCoords,
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
