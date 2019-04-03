import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';

import Text from '../components/Text';
import colors from '../config/colors.json';

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
                style={{
                    marginRight: 6,
                    textAlign: 'right',
                    ...styles.icaoText
                }}
            >
                {props.data.depAirport || '????'}
            </Text>
            <Image
                style={styles.fromToIcon}
                source={require('../../assets/icons/narrowbody.png')}
            />
            <Text
                style={{
                    marginLeft: 6,
                    ...styles.icaoText
                }}
            >
                {props.data.arrAirport || '????'}
            </Text>
        </View>

        <View style={styles.pilotInfoView}>
            <View style={{ flex: 1 }}>
                <Text style={styles.callsignText}>{props.data.callsign}</Text>
            </View>

            <View style={{ flex: 1 }}>
                <Text style={styles.nameText}>{props.data.name}</Text>
            </View>
        </View>

        <View style={styles.pilotInfoView}>
            <ProgressBar
                style={styles.progressBar}
                progress={props.data.progress}
                color={colors.accent}
            />
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    callsignText: {
        color: 'white',
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
        color: 'white',
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
        color: 'white',
        textAlign: 'left',
        fontSize: 13
    },
    pilotInfoView: {
        flexDirection: 'row',
        height: 20
    },
    progressBar: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20
    }
});

export default BasicDataContainer;
