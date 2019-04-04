import React from 'react';
import { BackHandler, RefreshControl, ScrollView } from 'react-native';

import ControllerStatsContainer from '../containers/ControllerStatsContainer';
import ClientStatsContainer from '../containers/ClientStatsContainer';
import FlightPlanContainer from '../containers/FlightPlanContainer';
import FlightStatsContainer from '../containers/FlightStatsContainer';
import ShareButton from '../components/ShareButton';

export default class ClientScreen extends React.PureComponent {
    static navigationOptions = ({ navigation }) => {
        const callsign = navigation.getParam('callsign');
        return {
            title: callsign,
            headerRight: <ShareButton callsign={callsign} />
        };
    };

    componentDidMount() {
        const callsign = this.props.navigation.getParam('callsign');
        for (const client of this.props.screenProps.clients) {
            if (client.callsign === callsign) {
                this.props.screenProps.setFocusedClient(client);
                break;
            }
        }
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        if (this.props.navigation.getParam('removeFocusedClient')) {
            this.props.screenProps.collapsePanel();
        }
        BackHandler.removeEventListener(
            'hardwareBackPress',
            this.handleBackPress
        );
    }

    handleBackPress = () => {
        this.props.navigation.goBack();
        return true;
    };

    render() {
        return (
            <ScrollView
                style={{ flex: 1 }}
                refreshControl={
                    <RefreshControl
                        refreshing={this.props.screenProps.loading}
                        onRefresh={this.props.screenProps.refresh}
                    />
                }
            >
                <ClientStatsContainer
                    client={this.props.screenProps.focusedClient}
                />

                <Stats client={this.props.screenProps.focusedClient} />
            </ScrollView>
        );
    }
}

const Stats = ({ client }) => {
    if (client.type === 'PILOT') {
        return (
            <>
                <FlightPlanContainer client={client} />
                <FlightStatsContainer client={client} />
            </>
        );
    } else if (client.type === 'ATC') {
        return <ControllerStatsContainer client={client} />;
    }
    return null;
};
