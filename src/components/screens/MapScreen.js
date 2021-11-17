import React, { useEffect } from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import Map from '../common/Map';
import { TabBarIcon } from '../common/TabBarIcon';
import Text from '../common/Text';
import InfoPanelContainer from '../containers/InfoPanelContainer';
import { useClientData } from '../../api/useClientData';
import { accent as accentColor } from '../../config/colors.json';
import { useAppContext } from '../../context';

const styles = StyleSheet.create({
  activityIndicator: {
    position: 'absolute',
    right: 3,
    top: 3,
  },
  clientCountText: {
    fontFamily: 'Roboto_Regular',
    position: 'absolute',
    left: 5,
    top: 2,
  },
});

const MapScreen = () => {
  const { collapsePanel, focusedClient } = useAppContext();
  const { clientData, isLoading, setFocusedClient } = useClientData();

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', collapsePanel);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', collapsePanel);
  }, [collapsePanel]);

  return (
    <View style={{ flex: 1 }}>
      <Map style={{ flex: 1 }} onPress={collapsePanel}>
        {clientData.map(client => {
          const isFocusedClient = focusedClient.callsign === client.callsign;
          return client.getMapOverlay(isFocusedClient, setFocusedClient);
        })}
      </Map>
      <ActivityIndicator
        color={accentColor}
        animating={isLoading}
        style={styles.activityIndicator}
      />
      <Text style={styles.clientCountText}>
        {`Clients: ${clientData.length}`}
      </Text>
      <InfoPanelContainer
        panelPosition={panelPosition}
        focusedClient={focusedClient}
      />
    </View>
  );
};

MapScreen.navigationOptions = {
  tabBarIcon: TabBarIcon,
};
