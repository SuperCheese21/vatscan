import React from 'react';
import { BackHandler, RefreshControl, ScrollView } from 'react-native';

import ShareButton from '../components/ShareButton';
import ClientStatsContainer from '../containers/ClientStatsContainer';
import ControllerStatsContainer from '../containers/ControllerStatsContainer';
import FlightPlanContainer from '../containers/FlightPlanContainer';
import FlightStatsContainer from '../containers/FlightStatsContainer';

export default class ClientScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    const callsign = navigation.getParam('callsign');
    return {
      title: callsign,
      headerRight: <ShareButton callsign={callsign} />,
    };
  };

  componentDidMount() {
    const { navigation, screenProps } = this.props;
    const callsign = navigation.getParam('callsign');
    const focusedClient = screenProps.clients.find(
      client => client.callsign === callsign,
    );
    if (focusedClient) {
      screenProps.setFocusedClient(focusedClient);
    }
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    const { navigation, screenProps } = this.props;
    if (navigation.getParam('removeFocusedClient')) {
      screenProps.collapsePanel();
    }
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    const { navigation } = this.props;
    navigation.goBack();
    return true;
  };

  render() {
    const { screenProps } = this.props;
    return (
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={screenProps.loading}
            onRefresh={screenProps.refresh}
          />
        }
      >
        <ClientStatsContainer client={screenProps.focusedClient} />

        <Stats client={screenProps.focusedClient} />
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
  }
  if (client.type === 'ATC') {
    return <ControllerStatsContainer client={client} />;
  }
  return null;
};
