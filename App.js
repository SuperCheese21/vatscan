import React from 'react';
import { Alert, NetInfo } from 'react-native';
import { AppLoading, Font } from 'expo';

import { UPDATE_INTERVAL } from './src/config/constants.json';
import { fetchData, parseClientData } from './src/lib/util/fetch';
import StackNavigator from './src/components/navigation/StackNavigator';

export default class App extends React.PureComponent {
    // Initialize component state
    state = {
        fontLoaded: false,
        loading: false,
        clientData: [],
        focusedClient: {}
    };

    async componentDidMount() {
        // Load fonts and update font loaded state
        await Font.loadAsync({
            'Roboto_Regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
            'Roboto_Condensed_Regular': require('./assets/fonts/Roboto_Condensed/RobotoCondensed-Regular.ttf')
        });
        await this.setState({
            fontLoaded: true
        });

        // Automatically pull data update when internet connection is changed
        NetInfo.addEventListener('connectionChange', () => {
            this.updateData(true);
        });

        // Pull first data update
        this.updateData(true);
    }

    updateData(initialFetch) {
        // Check internet connection and alert if there is no connection
        NetInfo.getConnectionInfo().then(connectionInfo => {
            if (connectionInfo.type === 'none' || connectionInfo.type === 'unknown') {
                Alert.alert('No internet connection', 'Connect to the internet in order to update data');
            } else {
                // Set loading state and call function to fetch data
                this.setState({ loading: true });
                fetchData(initialFetch).then(data => {
                    // Update state with new data
                    this.setState({
                        clientData: parseClientData(data),
                        loading: false
                    });
                    // Set timeout for next data update
                    setTimeout(() => {
                        this.updateData();
                    }, UPDATE_INTERVAL);
                });
            }
        });
    }

    setFocusedClient = client => {
        this.setState({
            focusedClient: client
        });
    }

    removeFocusedClient = () => {
        this.setState({
            focusedClient: {}
        });
    }

    render() {
        // Show app loading screen if font is still being loaded
        if (!this.state.fontLoaded) {
            return ( <AppLoading /> );
        }

        // Otherwise show top-level view
        return (
            <StackNavigator
                screenProps={{
                    loading: this.state.loading,
                    refresh: () => this.updateData(false),
                    clientData: this.state.clientData,
                    focusedClient: this.state.focusedClient,
                    setFocusedClient: this.setFocusedClient,
                    removeFocusedClient: this.removeFocusedClient
                }}
            />
        );
    }
}
