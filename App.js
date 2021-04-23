import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import * as Linking from 'expo-linking';
import React, { PureComponent } from 'react';
import { Alert, Animated } from 'react-native';

import { fetchData } from './src/api/fetchUtils';
import StackNavigator from './src/components/navigation/StackNavigator';
import {
  controllerTypes,
  panelStates,
  panelTransitionDuration,
  MAP_DATA_URL,
  UPDATE_INTERVAL,
  STATUS_URL,
} from './src/config/constants.json';

export default class App extends PureComponent {
  // Initialize component state and fetch manager
  state = {
    urls: {
      clientDataUrls: [],
      firDataUrl: '',
    },
    fontsLoaded: false,
    isLoading: false,
    clients: {},
    focusedClient: {},
    firData: {},
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
    this.fetchDataUrls();
  }

  componentDidUpdate(_, prevState) {
    const {
      urls: { clientDataUrls, firDataUrl },
    } = this.state;

    if (!prevState.urls.clientDataUrls.length && clientDataUrls.length) {
      this.updateClientData();
    }

    if (prevState.urls.firDataUrl !== firDataUrl) {
      this.fetchFirData();
    }
  }

  getFilteredClients = () => {
    const { clients, filters } = this.state;
    const pilots = clients.pilots || [];
    return pilots.filter(
      client =>
        Object.keys(filters.clientTypes)
          .filter(key => filters.clientTypes[key])
          .includes(client.type) &&
        (client.type !== 'ATC' ||
          Object.keys(filters.controllerTypes)
            .filter(key => filters.controllerTypes[key])
            .includes(client.controllerType)) &&
        (client.type !== 'PILOT' ||
          (client.aircraft.includes(filters.aircraft) &&
            client.callsign.includes(filters.airline) &&
            (client.depAirport.includes(filters.airport) ||
              client.arrAirport.includes(filters.airport)))),
    );
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
    this.setState({ panelPositionValue: newPosition });
  }

  collapsePanel = () => {
    const { panelPositionValue } = this.state;

    // Check if panel is collapsed, exit app if it is
    if (panelPositionValue === panelStates.COLLAPSED) {
      return false;
    }

    // Collapse panel and remove focused client
    this.setPanelPosition(panelStates.COLLAPSED);
    this.setState({ focusedClient: {} });

    return true;
  };

  transformFirData = rawFirData => {
    const firData = rawFirData;
    return {
      data: firData,
    };
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

  fetchDataUrls = async () => {
    const [status, mapData] = await Promise.all([
      fetchData(STATUS_URL, 'Unable to fetch client data URL').then(
        res => res && res.json(),
      ),
      fetchData(MAP_DATA_URL, 'Unable to fetch ARTCC data URL').then(
        res => res && res.json(),
      ),
    ]);
    const clientDataUrls = status?.data?.v3 || [];
    const firDataUrl = mapData?.fir_boundaries_dat_url || '';

    this.setState({ urls: { clientDataUrls, firDataUrl } });
  };

  updateClientData = async () => {
    const {
      urls: { clientDataUrls },
    } = this.state;

    const res = await fetchData(clientDataUrls, 'Unable to fetch client data');
    if (!res) return;

    const clients = await res.json();
    this.setState({ clients });

    // Clear existing timeout
    if (this.timer) {
      clearTimeout(this.timer);
    }

    // Set timeout for next data update
    this.timer = setTimeout(() => this.updateClientData(), UPDATE_INTERVAL);
  };

  fetchFirData = async () => {
    const {
      urls: { firDataUrl },
    } = this.state;

    const res = await fetchData(firDataUrl, 'Unable to fetch ARTCC data');
    if (!res) return;

    const rawFirData = await res.text();
    const firData = this.transformFirData(rawFirData);

    this.setState({ firData });
  };

  render() {
    const {
      filters,
      fontsLoaded,
      isLoading,
      focusedClient,
      firData,
      panelPosition,
    } = this.state;

    const filteredClients = this.getFilteredClients();

    // Show app loading screen if font is still being loaded
    if (!fontsLoaded) {
      return (
        <AppLoading
          startAsync={this.loadFonts}
          onFinish={() => this.setState({ fontsLoaded: true })}
          onError={console.warn}
        />
      );
    }

    // Otherwise show top-level view
    return (
      <StackNavigator
        uriPrefix={Linking.makeUrl('/')}
        screenProps={{
          isLoading,
          filters,
          filteredClients,
          focusedClient,
          firData,
          panelPosition,
          updateData: this.updateClientData,
          setFilters: this.setFilters,
          setFocusedClient: this.setFocusedClient,
          collapsePanel: this.collapsePanel,
        }}
      />
    );
  }
}
