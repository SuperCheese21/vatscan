import React from 'react';
import { BackHandler, RefreshControl, ScrollView, Text, View } from 'react-native';

import ClientStatsContainer from '../containers/ClientStatsContainer';
import FlightPlanContainer from '../containers/FlightPlanContainer';
import FlightStatsContainer from '../containers/FlightStatsContainer';
import HeaderContainer from '../containers/HeaderContainer';
import styles from '../styles';

export default class ClientScreen extends React.PureComponent {
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        if (this.props.navigation.getParam('removeFocusedClient')) {
            this.props.screenProps.removeFocusedClient();
        }
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        this.props.navigation.goBack();
        return true;
    }

    getStats(client) {
        if (client.type === 'PILOT') {
            return (
                <>
                    <FlightPlanContainer client={client} />
                    <FlightStatsContainer client={client} />
                </>
            );
        } else if (client.type === 'ATC') {
            return null;
        }
    }

    render() {
        const { focusedClient: client } = this.props.screenProps;
        return (
            <>
                <View style={styles.header}>
                    <Text style={[styles.text, styles.headerText, {
                        textAlign: 'center'
                    }]}>
                        {client.callsign}
                    </Text>
                </View>
                <ScrollView
                    style={{ flex: 1 }}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.screenProps.loading}
                            onRefresh={this.props.screenProps.refresh}
                        />
                    }
                >

                    <ClientStatsContainer client={client} />

                    {this.getStats(client)}

                </ScrollView>
            </>
        );
    }
}
