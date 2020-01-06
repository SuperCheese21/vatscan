import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { RefreshControl, ScrollView } from 'react-native';

import ConfigScreen from './ConfigScreen';

import ShareButton from '../common/ShareButton';
import ClientStatsContainer from '../containers/ClientStatsContainer';
import ControllerStatsContainer from '../containers/ControllerStatsContainer';
import FlightPlanContainer from '../containers/FlightPlanContainer';
import FlightStatsContainer from '../containers/FlightStatsContainer';
import { navigationShape, screenPropsShape } from '../propTypeShapes';

export default class ClientScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const callsign = navigation.getParam('callsign');
    return {
      title: callsign,
      headerRight: () => <ShareButton callsign={callsign} />,
    };
  };

  componentDidMount() {
    const { navigation, screenProps } = this.props;
    const callsign = navigation.getParam('callsign');
    const focusedClient = screenProps.filteredClients.find(
      client => client.callsign === callsign,
    );
    if (focusedClient) {
      screenProps.setFocusedClient(focusedClient);
    }
  }

  componentWillUnmount() {
    const { navigation, screenProps } = this.props;
    if (navigation.getParam('removeFocusedClient')) {
      screenProps.collapsePanel();
    }
  }

  render() {
    const {
      navigation,
      screenProps: { isLoading, focusedClient, updateData },
    } = this.props;
    return (
      <ConfigScreen navigation={navigation}>
        <ScrollView
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={updateData} />
          }
        >
          <ClientStatsContainer client={focusedClient} />

          <Stats client={focusedClient} />
        </ScrollView>
      </ConfigScreen>
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

ClientScreen.propTypes = {
  navigation: navigationShape.isRequired,
  screenProps: screenPropsShape.isRequired,
};

Stats.propTypes = {
  client: PropTypes.object.isRequired,
};
