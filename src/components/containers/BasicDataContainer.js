import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { withNavigation } from 'react-navigation';

import Text from '../common/Text';
import { navigationShape } from '../propTypeShapes';
import useClientData from '../../api/useClientData';

const styles = StyleSheet.create({
  callsignText: {
    color: 'white',
    textAlign: 'right',
    marginRight: 30,
    fontSize: 13,
  },
  fromToIcon: {
    width: 45,
    height: 45,
    transform: [
      {
        rotate: '90deg',
      },
    ],
  },
  icaoText: {
    color: 'white',
    flex: 1,
    fontFamily: 'Roboto_Condensed_Regular',
    fontSize: 50,
  },
  infoContainerBasic: {
    flex: 8,
  },
  infoRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    color: 'white',
    textAlign: 'left',
    fontSize: 13,
  },
  pilotInfoView: {
    flexDirection: 'row',
    height: 30,
  },
});

const BasicDataContainer = ({ navigation }) => {
  const { focusedClient } = useClientData();
  const { arrAirport, callsign, depAirport, name } = focusedClient;

  const onPress = () => navigation.navigate('ClientScreen', { callsign });

  return (
    <TouchableOpacity onPress={onPress} style={styles.infoContainerBasic}>
      <View style={styles.infoRow}>
        <Text
          style={{
            marginRight: 6,
            textAlign: 'right',
            ...styles.icaoText,
          }}
        >
          {depAirport || '????'}
        </Text>
        {/* eslint-disable global-require */}
        <Image
          style={styles.fromToIcon}
          source={require('../../../assets/icons/narrowbody.png')}
        />
        {/* eslint-enable global-require */}
        <Text
          style={{
            marginLeft: 6,
            ...styles.icaoText,
          }}
        >
          {arrAirport || '????'}
        </Text>
      </View>

      <View style={styles.pilotInfoView}>
        <View style={{ flex: 1 }}>
          <Text style={styles.callsignText}>{callsign}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.nameText}>{name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

BasicDataContainer.propTypes = {
  navigation: navigationShape.isRequired,
};

export default withNavigation(BasicDataContainer);
