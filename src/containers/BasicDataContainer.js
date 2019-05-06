import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';

import Text from '../components/Text';
import colors from '../config/colors.json';

export default class BasicDataContainer extends React.PureComponent {
    onPress = () => {
        this.props.stackNavigation.navigate('ClientScreen', {
            callsign: this.props.data.callsign
        });
    };

    render() {
        return (
            <TouchableOpacity onPress={this.onPress} style={styles.infoContainerBasic}>
                <View style={styles.infoRow}>
                    <Text
                        style={{
                            marginRight: 6,
                            textAlign: 'right',
                            ...styles.icaoText
                        }}
                    >
                        {this.props.data.depAirport || '????'}
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
                        {this.props.data.arrAirport || '????'}
                    </Text>
                </View>

                <View style={styles.pilotInfoView}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.callsignText}>{this.props.data.callsign}</Text>
                    </View>

                    <View style={{ flex: 1 }}>
                        <Text style={styles.nameText}>{this.props.data.name}</Text>
                    </View>
                </View>

                <View style={styles.pilotInfoView}>
                    <ProgressBar
                        style={styles.progressBar}
                        progress={this.props.data.progress}
                        color={colors.accent}
                    />
                </View>
            </TouchableOpacity>
        );
    }
}

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
