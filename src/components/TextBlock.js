import React from 'react';
import { Clipboard, Text, ToastAndroid, TouchableOpacity, Vibration } from 'react-native';

import styles from './styles';

const TextBlock = ({ text }) => {
    if (text) {
        return (
            <TouchableOpacity
                style={styles.textBlock}
                onLongPress={() => {
                    Vibration.vibrate(10);
                    ToastAndroid.show('Copied to clipboard', ToastAndroid.SHORT);
                    Clipboard.setString(text);
                }}
            >
                <Text style={{ flex: 1, fontFamily: 'Roboto_Mono' }}>{text}</Text>
            </TouchableOpacity>
        );
    }
    return null;
};

export default TextBlock;
