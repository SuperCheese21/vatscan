import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import Text from '../common/Text';
import { navigationShape } from '../propTypeShapes';
import {
  accent as accentColor,
  primary as primaryColor,
} from '../../config/colors.json';
import { getFocusedClient } from '../../redux/selectors';

class ControllerDataContainer extends PureComponent {
  onPress = () => {
    const {
      focusedClient: { callsign },
      stackNavigation,
    } = this.props;
    stackNavigation.navigate('ClientScreen', { callsign });
  };

  render() {
    const {
      focusedClient: { callsign, frequency, name },
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

ControllerDataContainer.propTypes = {
  focusedClient: PropTypes.object.isRequired,
  stackNavigation: navigationShape.isRequired,
};

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

const mapStateToProps = state => ({
  focusedClient: getFocusedClient(state),
});

export default connect(mapStateToProps)(ControllerDataContainer);
