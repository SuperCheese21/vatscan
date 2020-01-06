import { AppLoading, Linking } from 'expo';
import * as Font from 'expo-font';
import React, { PureComponent } from 'react';
import { Alert, Animated } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import FetchManager from './src/api/FetchManager';
import StackNavigator from './src/components/navigation/StackNavigator';
import {
  panelStates,
  panelTransitionDuration,
  UPDATE_INTERVAL,
} from './src/config/constants.json';

export default class App extends PureComponent {
  // Initialize component state and fetch manager
  state = {
    fontsLoaded: false,
    isLoading: false,
    clients: [],
    focusedClient: {},
    filters: {
      clients: ['PILOT', 'ATC'],
      controllers: [
        'ATIS',
        'DEL',
        'GND',
        'TWR',
        'DEP',
        'CTR',
        'FSS',
        'APP',
        'OBS',
        'SUP',
      ],
      aircraft: '',
      airline: '',
      airport: '',
    },
    panelPosition: new Animated.Value(panelStates.COLLAPSED),
  };

  fetchManager = new FetchManager();

  componentDidMount() {
    // Automatically pull data update when internet connection is changed
    this.unsubscribe = NetInfo.addEventListener(() => this.updateData(true));
  }

  componentWillUnmount() {
    // Unsubscribe from updates on internet connection changes
    this.unsubscribe();
  }

  getFilteredClients = () => {
    const { clients, filters } = this.state;
    return clients.filter(
      client =>
        filters.clients.includes(client.type) &&
        (client.type !== 'ATC' ||
          filters.controllers.includes(client.controllerType)) &&
        (client.type !== 'PILOT' ||
          (client.aircraft.includes(filters.aircraft) &&
            client.callsign.includes(filters.airline) &&
            (client.depAirport.includes(filters.airport) ||
              client.arrAirport.includes(filters.airport)))),
    );
  };

  setFilters = filters => {
    this.setState({ filters });
  };

  setFocusedClient = focusedClient => {
    this.setPanelPosition(panelStates[`EXPANDED_${focusedClient.type}`]);
    this.setState({ focusedClient });
  };

  setPanelPosition(position) {
    // Animate info panel position change
    const { panelPosition } = this.state;
    Animated.timing(panelPosition, {
      toValue: position,
      duration: panelTransitionDuration,
      useNativeDriver: true,
    }).start();
  }

  loadFonts = async () => {
    /* eslint-disable global-require */
    await Font.loadAsync({
      Roboto_Regular: require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
      Roboto_Condensed_Regular: require('./assets/fonts/Roboto_Condensed/RobotoCondensed-Regular.ttf'),
      Roboto_Mono: require('./assets/fonts/Roboto_Mono/RobotoMono-Regular.ttf'),
    });
    /* eslint-enable global-require */
  };

  updateData = async isInitialFetch => {
    this.setState({ isLoading: true });

    // Check internet connection and alert if there is no connection
    const connectionInfo = await NetInfo.fetch();
    if (connectionInfo.type === 'none' || connectionInfo.type === 'unknown') {
      this.setState({ isLoading: false });
      Alert.alert(
        'No internet connection',
        'Connect to the internet to update data',
      );
      return;
    }

    // Fetch data
    const clients = await this.fetchManager.fetchData(isInitialFetch);

    // Update state with new client data
    this.handleUpdatedData(clients);

    // Clear existing timeout
    if (this.timer) {
      clearTimeout(this.timer);
    }

    // Set timeout for next data update
    this.timer = setTimeout(this.updateData, UPDATE_INTERVAL);
  };

  collapsePanel = () => {
    // Collapse panel and remove focused client
    this.setPanelPosition(panelStates.COLLAPSED);
    this.setState({ focusedClient: {} });

    return true;
  };

  handleUpdatedData(clients) {
    const {
      focusedClient: { callsign: focusedCallsign },
    } = this.state;

    const focusedClient =
      clients.find(client => client.callsign === focusedCallsign) || {};

    // Update state with new data
    this.setState({
      isLoading: false,
      clients,
      focusedClient,
    });
  }

  render() {
    const {
      filters,
      fontsLoaded,
      isLoading,
      focusedClient,
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
          panelPosition,
          updateData: this.updateData,
          setFilters: this.setFilters,
          setFocusedClient: this.setFocusedClient,
          collapsePanel: this.collapsePanel,
        }}
      />
    );
  }
}
