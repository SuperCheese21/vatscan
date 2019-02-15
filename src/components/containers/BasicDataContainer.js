import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import FlightProgressBar from '../FlightProgressBar';
import styles from '../styles';

const BasicDataContainer = props => (
    <TouchableOpacity
        onPress={() => props.stackNavigation.navigate('ClientScreen', {
            callsign: props.data.callsign
        })}
        style={styles.infoContainerBasic}
    >
        <View style={styles.infoRow}>
            <Text style={[
                styles.text,
                styles.icaoText,
                { marginRight: 6, textAlign: 'right' }
            ]}>
                {props.data.depAirport || '????'}
            </Text>
            <Image
                style={styles.fromToIcon}
                source={require('../../../assets/icons/narrowbody.png')}
            />
            <Text style={[
                styles.text,
                styles.icaoText,
                { marginLeft: 6 }
            ]}>
                {props.data.arrAirport || '????'}
            </Text>
        </View>

        <View style={styles.pilotInfoView}>
            <View style={{ flex: 1 }}>
                <Text style={[styles.text, styles.callsignText]}>{props.data.callsign}</Text>
            </View>

            <View style={{ flex: 1 }}>
                <Text style={[styles.text, styles.nameText]}>{props.data.name}</Text>
            </View>
        </View>

        <View style={styles.pilotInfoView}>
            <FlightProgressBar progress={props.data.progress} />
        </View>
    </TouchableOpacity>
);

export default BasicDataContainer;
