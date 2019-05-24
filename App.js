import React from 'react';
import { Alert, Animated, NetInfo, Platform } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { AppLoading, Font, Linking } from 'expo';

import FetchManager from './src/api/FetchManager';
import StackNavigator from './src/navigation/StackNavigator';
import { panelStates, panelTransitionDuration, UPDATE_INTERVAL } from './src/config/constants.json';

export default class App extends React.PureComponent {
    // Initialize component state and fetch manager
    constructor() {
        super();
        this.state = {
            fontLoaded: false,
            loading: false,
            clients: [],
            focusedClient: {},
            panelPosition: new Animated.Value(panelStates.COLLAPSED)
        };
        this.fetchManager = new FetchManager();
    }

    async componentDidMount() {
        // Load fonts and update font loaded state
        await Font.loadAsync({
            Roboto_Regular: require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
            Roboto_Condensed_Regular: require('./assets/fonts/Roboto_Condensed/RobotoCondensed-Regular.ttf'),
            Roboto_Mono: require('./assets/fonts/Roboto_Mono/RobotoMono-Regular.ttf')
        });
        this.setState({ fontLoaded: true }); // eslint-disable-line

        // Fix status bar height
        if (Platform.OS === 'android') {
            SafeAreaView.setStatusBarHeight(0);
        }

        // Automatically pull data update when internet connection is changed
        NetInfo.addEventListener('connectionChange', () => {
            this.updateData(true);
        });

        // Pull first data update
        this.updateData(true);
    }

    updateData = isInitialFetch => {
        // Check internet connection and alert if there is no connection
        this.setState({ loading: true });
        NetInfo.getConnectionInfo().then(connectionInfo => {
            if (connectionInfo.type === 'none' || connectionInfo.type === 'unknown') {
                this.setState({ loading: false });
                Alert.alert('No internet connection', 'Connect to the internet to update data');
            } else {
                // Fetch data
                this.fetchManager.fetchData(isInitialFetch).then(clients => {
                    // Update state with new client data
                    this._handleUpdate(clients);

                    // Clear existing timeout
                    if (this.timer) {
                        clearTimeout(this.timer);
                    }

                    // Set timeout for next data update
                    this.timer = setTimeout(this.updateData, UPDATE_INTERVAL);
                });
            }
        });
    };

    setFocusedClient = client => {
        if (client.type === 'PILOT') {
            this._setPanelPosition(panelStates.EXPANDED_PILOT);
        } else if (client.type === 'ATC') {
            this._setPanelPosition(panelStates.EXPANDED_ATC);
        }
        this.setState({ focusedClient: client });
    };

    collapsePanel = () => {
        // Collapse panel and remove focused client
        this._setPanelPosition(panelStates.COLLAPSED);
        this.setState({ focusedClient: {} });

        return true;
    };

    _handleUpdate(clients) {
        const focusedCallsign = this.state.focusedClient.callsign;
        let focusedClient = {};

        // Find focused client inside updated client data array
        for (const client of clients) {
            if (focusedCallsign === client.callsign) {
                focusedClient = client;
                break;
            }
        }

        // Update state with new data
        this.setState({
            loading: false,
            clients,
            focusedClient
        });
    }

    _setPanelPosition(position) {
        // Animate info panel position change
        Animated.timing(this.state.panelPosition, {
            toValue: position,
            duration: panelTransitionDuration,
            useNativeDriver: true
        }).start();
    }

    render() {
        // Show app loading screen if font is still being loaded
        if (!this.state.fontLoaded) {
            return <AppLoading />;
        }

        // Otherwise show top-level view
        return (
            <StackNavigator
                uriPrefix={Linking.makeUrl('/')}
                screenProps={{
                    loading: this.state.loading,
                    clients: this.state.clients,
                    focusedClient: this.state.focusedClient,
                    panelPosition: this.state.panelPosition,
                    refresh: this.updateData,
                    setFocusedClient: this.setFocusedClient,
                    collapsePanel: this.collapsePanel
                }}
            />
        );
    }
}
