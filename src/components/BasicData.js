import React from 'react';
import { Image, Text, View } from 'react-native';

import styles from './styles';

const BasicData = props => (
    <View style={styles.infoContainerBasic}>
        <View style={styles.infoRow}>
            <Text style={[
                styles.text,
                styles.icaoText,
                { marginRight: 6, textAlign: 'right' }
            ]}>
                {props.data.depAirport}
            </Text>
            <Image
                style={styles.fromToIcon}
                source={require('../../assets/icons/narrowbody.png')}
            />
            <Text style={[
                styles.text,
                styles.icaoText,
                { marginLeft: 6 }
            ]}>
                {props.data.arrAirport}
            </Text>
        </View>

        <View style={styles.clientInfoView}>
            <View style={{ flex: 1 }}>
                <Text style={[styles.text, styles.callsignText]}>{props.data.callsign}</Text>
            </View>

            <View style={{ flex: 1 }}>
                <Text style={[styles.text, styles.nameText]}>{props.data.name}</Text>
            </View>
        </View>
    </View>
);

export default BasicData;
