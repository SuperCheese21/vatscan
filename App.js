import React from 'react';
import { Alert, NetInfo, Platform } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { AppLoading, Font, Linking } from 'expo';

import FetchManager from './src/api/FetchManager';
import StackNavigator from './src/components/navigation/StackNavigator';
import { UPDATE_INTERVAL } from './src/config/constants.json';

export default class App extends React.PureComponent {
    // Initialize component state and fetch manager
    constructor() {
        super();
        this.state = {
            fontLoaded: false,
            loading: false,
            clients: [],
            focusedClient: {}
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
        await this.setState({ fontLoaded: true }); // eslint-disable-line

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
        NetInfo.getConnectionInfo().then(connectionInfo => {
            if (
                connectionInfo.type === 'none' ||
                connectionInfo.type === 'unknown'
            ) {
                Alert.alert(
                    'No internet connection',
                    'Connect to the internet to update data'
                );
            } else {
                // Set loading state
                this.setState({ loading: true });

                // Fetch data
                const focusedCallsign = this.state.focusedClient.callsign;
                this.fetchManager
                    .fetchData(focusedCallsign, isInitialFetch)
                    .then(data => {
                        // Update state with new data
                        this.setState({
                            loading: false,
                            clients: data.clients,
                            focusedClient: data.focusedClient
                        });

                        // Set timeout for next data update
                        setTimeout(this.updateData, UPDATE_INTERVAL);
                    });
            }
        });
    };

    setFocusedClient = client => {
        this.setState({ focusedClient: client });
    };

    removeFocusedClient = () => {
        this.setState({ focusedClient: {} });
    };

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
                    refresh: this.updateData,
                    clients: this.state.clients,
                    focusedClient: this.state.focusedClient,
                    setFocusedClient: this.setFocusedClient,
                    removeFocusedClient: this.removeFocusedClient
                }}
            />
        );
    }
}
