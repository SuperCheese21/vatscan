import React from 'react';

import ConfigScreen from './ConfigScreen';
import ShareButton from '../common/ShareButton';
import ClientStatsContainer from '../containers/ClientStatsContainer';
import ControllerStatsContainer from '../containers/ControllerStatsContainer';
import FlightPlanContainer from '../containers/FlightPlanContainer';
import FlightStatsContainer from '../containers/FlightStatsContainer';
import useClientData from '../../api/useClientData';

const ClientScreen = () => {
  const { focusedClient } = useClientData();
  return (
    <ConfigScreen>
      <ClientStatsContainer />
      {focusedClient.type === 'PILOT' ? (
        <>
          <FlightPlanContainer />
          <FlightStatsContainer />
        </>
      ) : (
        <ControllerStatsContainer />
      )}
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

export default ClientScreen;
