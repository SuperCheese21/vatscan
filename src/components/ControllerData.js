import React from 'react';
import { Text, View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

import colors from '../config/colors.json';
import styles from './styles';

const ControllerData = props => (
    <View style={styles.infoContainerController}>
        <View style={styles.infoRow}>
            <Icon name='satellite-uplink' size={42} color={colors.accent}></Icon>
            <Text style={styles.controllerCallsignText}>
                {props.data.callsign}
            </Text>
        </View>

        <View style={styles.controllerInfoView}>
            <View style={{ flex: 1 }}>
                <Text style={[styles.text, styles.callsignText]}>{props.data.frequency}</Text>
            </View>
            <View style={{ flex: 1 }}>
                <Text style={[styles.text, styles.nameText]}>{props.data.name}</Text>
            </View>
        </View>
    </View>
);

export default ControllerData;
