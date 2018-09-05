import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';

import styles from '../config/styles';

export default class BasicData extends Component {
    render() {
        const data = this.props.data;
        return (
            <View style={styles.infoContainerBasic}>
                <View style={styles.infoRow}>
                    <Text style={[
                        styles.icaoText,
                        { marginRight: 6, textAlign: 'right' }
                    ]}>
                        {data.depAirport}
                    </Text>
                    <Image
                        style={styles.fromToIcon}
                        source={require('../assets/icons/narrowbody.png')}
                    />
                    <Text style={[
                        styles.icaoText,
                        { marginLeft: 6 }
                    ]}>
                        {data.arrAirport}
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', height: 20 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.nameText}>{data.name}</Text>
                    </View>

                    <View style={{ flex: 1 }}>
                        <Text style={styles.cidText}>{data.id}</Text>
                    </View>
                </View>
            </View>
        );
    }
}
