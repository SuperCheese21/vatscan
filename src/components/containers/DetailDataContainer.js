import Icon from '@expo/vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import Text from '../common/Text';
import {
  accent as accentColor,
  primaryMedium as primaryMediumColor,
} from '../../config/colors.json';

const styles = StyleSheet.create({
  infoContainerDetail: {
    flex: 5,
    backgroundColor: primaryMediumColor,
  },
  infoRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    color: 'white',
    fontSize: 14,
  },
});

const DetailDataContainer = ({
  data: { aircraft, groundSpeed, altitude, heading },
}) => (
  <View style={styles.infoContainerDetail}>
    <View style={styles.infoRow}>
      <View style={styles.infoRow}>
        <Icon name="flight" size={20} color={accentColor} />
        <Text style={styles.infoText}>{` ${aircraft || 'N/A'}`}</Text>
      </View>
      <View style={styles.infoRow}>
        <Icon name="send" size={20} color={accentColor} />
        <Text style={styles.infoText}>{` ${groundSpeed} kts`}</Text>
      </View>
    </View>
    <View style={styles.infoRow}>
      <View style={styles.infoRow}>
        <Icon name="unfold-more" size={20} color={accentColor} />
        <Text style={styles.infoText}>{` ${altitude} ft`}</Text>
      </View>
      <View style={styles.infoRow}>
        <Icon name="navigation" size={20} color={accentColor} />
        <Text style={styles.infoText}>{` ${heading} °`}</Text>
      </View>
    </View>
  </View>
);

DetailDataContainer.propTypes = {
  data: PropTypes.object.isRequired,
};

export default DetailDataContainer;
