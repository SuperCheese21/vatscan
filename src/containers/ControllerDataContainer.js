import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import Text from '../components/Text';
import {
  accent as accentColor,
  primary as primaryColor,
} from '../config/colors.json';

const styles = StyleSheet.create({
  callsignText: {
    color: 'white',
    textAlign: 'right',
    marginRight: 30,
    fontSize: 13,
  },
  controllerCallsignText: {
    textAlign: 'center',
    marginLeft: 10,
    color: 'white',
    fontFamily: 'Roboto_Condensed_Regular',
    fontSize: 45,
  },
  controllerInfoView: {
    flexDirection: 'row',
    height: 25,
  },
  infoContainerController: {
    width: '100%',
    height: 85,
    backgroundColor: primaryColor,
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
});

export default class ControllerDataContainer extends React.PureComponent {
  onPress = () => {
    const { data, stackNavigation } = this.props;
    stackNavigation.navigate('ClientScreen', {
      callsign: data.callsign,
    });
  };

  render() {
    const {
      data: { callsign, frequency, name },
    } = this.props;
    return (
      <TouchableOpacity
        onPress={this.onPress}
        style={styles.infoContainerController}
      >
        <View style={styles.infoRow}>
          <Icon name="satellite-uplink" size={42} color={accentColor} />
          <Text style={styles.controllerCallsignText}>{callsign}</Text>
        </View>

        <View style={styles.controllerInfoView}>
          <View style={{ flex: 1 }}>
            <Text style={styles.callsignText}>{frequency}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.nameText}>{name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
