import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import FlightProgressBar from '../FlightProgressBar';

const BasicDataContainer = props => (
    <TouchableOpacity
        onPress={() =>
            props.stackNavigation.navigate('ClientScreen', {
                callsign: props.data.callsign
            })
        }
        style={styles.infoContainerBasic}
    >
        <View style={styles.infoRow}>
            <Text
                style={[
                    styles.text,
                    styles.icaoText,
                    { marginRight: 6, textAlign: 'right' }
                ]}
            >
                {props.data.depAirport || '????'}
            </Text>
            <Image
                style={styles.fromToIcon}
                source={require('../../../assets/icons/narrowbody.png')}
            />
            <Text style={[styles.text, styles.icaoText, { marginLeft: 6 }]}>
                {props.data.arrAirport || '????'}
            </Text>
        </View>

        <View style={styles.pilotInfoView}>
            <View style={{ flex: 1 }}>
                <Text style={[styles.text, styles.callsignText]}>
                    {props.data.callsign}
                </Text>
            </View>

            <View style={{ flex: 1 }}>
                <Text style={[styles.text, styles.nameText]}>
                    {props.data.name}
                </Text>
            </View>
        </View>

        <View style={styles.pilotInfoView}>
            <FlightProgressBar progress={props.data.progress} />
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    callsignText: {
        textAlign: 'right',
        marginRight: 30,
        fontSize: 13
    },
    fromToIcon: {
        width: 45,
        height: 45,
        transform: [
            {
                rotate: '90deg'
            }
        ]
    },
    icaoText: {
        flex: 1,
        fontFamily: 'Roboto_Condensed_Regular',
        fontSize: 50
    },
    infoContainerBasic: {
        flex: 8
    },
    infoRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    nameText: {
        textAlign: 'left',
        fontSize: 13
    },
    pilotInfoView: {
        flexDirection: 'row',
        height: 20
    },
    text: {
        fontFamily: 'Roboto_Regular',
        color: 'white'
    }
});

export default BasicDataContainer;
