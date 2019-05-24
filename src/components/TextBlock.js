import React from 'react';
import {
    Clipboard,
    StyleSheet,
    Text,
    ToastAndroid,
    TouchableOpacity,
    Vibration
} from 'react-native';

export default class TextBlock extends React.PureComponent {
    onLongPress = () => {
        Vibration.vibrate(10);
        ToastAndroid.show('Copied to clipboard', ToastAndroid.SHORT);
        Clipboard.setString(this.props.text);
    };

    render() {
        if (this.props.text) {
            return (
                <TouchableOpacity style={styles.textBlock} onLongPress={this.onLongPress}>
                    <Text style={styles.textBlockText}>{this.props.text}</Text>
                </TouchableOpacity>
            );
        }
        return null;
    }
}

const styles = StyleSheet.create({
    textBlock: {
        backgroundColor: '#f2f2f2',
        marginTop: 5,
        marginBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5
    },
    textBlockText: {
        flex: 1,
        fontFamily: 'Roboto_Mono'
    }
});
