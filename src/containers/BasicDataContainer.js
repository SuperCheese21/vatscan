import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';

import { navigationShape } from '../components/propTypeShapes';
import Text from '../components/Text';
import { accent as accentColor } from '../config/colors.json';

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
    height: 20,
  },
  progressBar: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
  },
});

export default class BasicDataContainer extends React.PureComponent {
  onPress = () => {
    const {
      data: { callsign },
      stackNavigation,
    } = this.props;
    stackNavigation.navigate('ClientScreen', { callsign });
  };

  render() {
    const {
      data: { arrAirport, callsign, depAirport, name, progress },
    } = this.props;
    return (
      <TouchableOpacity
        onPress={this.onPress}
        style={styles.infoContainerBasic}
      >
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
            source={require('../../assets/icons/narrowbody.png')}
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

        <View style={styles.pilotInfoView}>
          <ProgressBar
            style={styles.progressBar}
            progress={progress}
            color={accentColor}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

BasicDataContainer.propTypes = {
  data: PropTypes.object.isRequired,
  stackNavigation: navigationShape.isRequired,
};
