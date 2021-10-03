import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import * as Linking from 'expo-linking';
import { StatusBar } from 'expo-status-bar';
import React, { PureComponent } from 'react';
import { Animated } from 'react-native';

import {
  fetchData,
  getFilteredClients,
  transformClientData,
  transformControllerData,
} from './src/api/fetchUtils';
import StackNavigator from './src/components/navigation/StackNavigator';
import {
  controllerTypes,
  panelStates,
  panelTransitionDuration,
  CONTROLLER_URL,
  UPDATE_INTERVAL,
  STATUS_URL,
} from './src/config/constants.json';

export default class App extends PureComponent {
  // Initialize component state and fetch manager
  state = {
    clientDataUrls: [],
    fontsLoaded: false,
    isLoading: false,
    clients: [],
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
    this.fetchClientDataUrls();
  }

  componentDidUpdate(_, prevState) {
    const { clientDataUrls } = this.state;
    if (!prevState.clientDataUrls.length && clientDataUrls.length) {
      this.fetchAllData(true);
    }
  }

  componentWillUnmount() {
    if (this.timer) clearTimeout(this.timer);
  }

  setAsyncState = async newState => {
    await new Promise(resolve => this.setState({ ...newState }, resolve));
  };

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

  fetchClientDataUrls = async () => {
    const status = await fetchData(
      STATUS_URL,
      'Unable to fetch client data URL',
    );
    await this.setAsyncState({
      clientDataUrls: status?.data?.v3 || [],
    });
  };

  fetchControllerData = async isInitialFetch => {
    const controllerData = await fetchData(
      CONTROLLER_URL,
      isInitialFetch ? 'Unable to fetch ARTCC data' : '',
    );
    this.setAsyncState({
      polygonCoords: transformControllerData(controllerData?.data),
    });
  };

  fetchClientData = async () => {
    const { clientDataUrls, polygonCoords } = this.state;
    const clientData = await fetchData(
      clientDataUrls,
      'Unable to fetch client data',
    );
    await this.setAsyncState({
      clients: transformClientData(clientData, polygonCoords),
    });
  };

  fetchAllData = async isInitialFetch => {
    const { polygonCoords } = this.state;

    this.setState({ isLoading: true });

    if (!Object.keys(polygonCoords).length) {
      await this.fetchControllerData(isInitialFetch);
    }

    await this.fetchClientData();

    this.setState({ isLoading: false });

    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => this.fetchAllData(), UPDATE_INTERVAL);
  };

  render() {
    const {
      clients,
      filters,
      fontsLoaded,
      isLoading,
      focusedClient,
      polygonCoords,
      panelPosition,
    } = this.state;

    const filteredClients = getFilteredClients(clients, filters);

    // Otherwise show top-level view
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
