import React from 'react';
import { Clipboard, Text, ToastAndroid, TouchableOpacity, Vibration } from 'react-native';

import styles from './styles';

const RouteBlock = ({ route }) => (
    <TouchableOpacity
        style={styles.routeBlock}
        onLongPress={() => {
            Vibration.vibrate(10);
            ToastAndroid.show('Route copied to clipboard', ToastAndroid.SHORT);
            Clipboard.setString(route);
        }}
    >
        <Text style={{ flex: 1, fontFamily: 'Roboto_Mono' }}>{route}</Text>
    </TouchableOpacity>
);

export default RouteBlock;
