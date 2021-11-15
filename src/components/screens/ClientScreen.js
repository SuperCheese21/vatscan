import React from 'react';

import ConfigScreen from './ConfigScreen';
import ShareButton from '../common/ShareButton';
import ClientStatsContainer from '../containers/ClientStatsContainer';
import ControllerStatsContainer from '../containers/ControllerStatsContainer';
import FlightPlanContainer from '../containers/FlightPlanContainer';
import FlightStatsContainer from '../containers/FlightStatsContainer';
import { navigationShape } from '../propTypeShapes';
import { useClientData } from '../../api/useClientData';

export const ClientScreen = ({ navigation }) => {
  const { focusedClient } = useClientData();
  const getStatsContainer = () => {
    if (focusedClient.type === 'PILOT') {
      return (
        <>
          <FlightPlanContainer />
          <FlightStatsContainer />
        </>
      );
    }
    if (focusedClient.type === 'ATC') {
      return <ControllerStatsContainer />;
    }
    return null;
  };
  return (
    <ConfigScreen navigation={navigation}>
      <ClientStatsContainer />
      {getStatsContainer()}
    </ConfigScreen>
  );
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
};

export default ClientScreen;
