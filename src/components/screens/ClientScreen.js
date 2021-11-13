import PropTypes from 'prop-types';
import React, { Component, useEffect } from 'react';

import ConfigScreen from './ConfigScreen';

import ShareButton from '../common/ShareButton';
import ClientStatsContainer from '../containers/ClientStatsContainer';
import ControllerStatsContainer from '../containers/ControllerStatsContainer';
import FlightPlanContainer from '../containers/FlightPlanContainer';
import FlightStatsContainer from '../containers/FlightStatsContainer';
import { navigationShape, screenPropsShape } from '../propTypeShapes';
import useClientData from '../../api/useClientData';

const ClientScreen = () => {
  const { clientData, results } = useClientData();

  const isDataLoading = results.some(({ isLoading }) => isLoading);

  const focusedClient = clientData.find(client => client.callsign === callsign);

  // componentDidMount() {
  //   const { navigation, screenProps } = this.props;
  //   const callsign = navigation.getParam('callsign');

  //   if (focusedClient) {
  //     screenProps.setFocusedClient(focusedClient);
  //   }
  // }

  // componentWillUnmount() {
  //   const { navigation, screenProps } = this.props;
  //   if (navigation.getParam('removeFocusedClient')) {
  //     screenProps.collapsePanel();
  //   }
  // }

  // render() {
  //   const {
  //     navigation,
  //     screenProps: { isLoading, focusedClient, updateData },
  //   } = this.props;
  //   return (
  //     <ConfigScreen
  //       navigation={navigation}
  //       onRefresh={updateData}
  //       refreshing={isLoading}
  //     >
  //       <ClientStatsContainer client={focusedClient} />

  //       <Stats client={focusedClient} />
  //     </ConfigScreen>
  //   );
  // }
};

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

ClientScreen.navigationOptions = ({ navigation }) => {
  const callsign = navigation.getParam('callsign');
  return {
    title: callsign,
    headerRight: () => <ShareButton callsign={callsign} />,
  };
};

ClientScreen.propTypes = {
  navigation: navigationShape.isRequired,
  screenProps: screenPropsShape.isRequired,
};

Stats.propTypes = {
  client: PropTypes.object.isRequired,
};
