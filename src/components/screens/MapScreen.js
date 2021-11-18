import React, { useEffect } from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import Map from '../common/Map';
import { TabBarIcon } from '../common/TabBarIcon';
import Text from '../common/Text';
import InfoPanelContainer from '../containers/InfoPanelContainer';
import useClientData from '../../api/useClientData';
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
  const { collapsePanel, setFocusedClientId } = useAppContext();
  const { clientData, focusedClient, isLoading } = useClientData();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      collapsePanel,
    );
    return () => backHandler.remove();
  }, [collapsePanel]);

  return (
    <View style={{ flex: 1 }}>
      <Map style={{ flex: 1 }} onPress={collapsePanel}>
        {clientData.map(({ callsign, getMapOverlay }) => {
          const isFocusedClient = focusedClient.callsign === callsign;
          return getMapOverlay(isFocusedClient, setFocusedClientId);
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
      <InfoPanelContainer />
    </View>
  );
};

MapScreen.navigationOptions = {
  tabBarIcon: TabBarIcon,
};

export default MapScreen;
