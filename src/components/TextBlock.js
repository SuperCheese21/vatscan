import React from 'react';
import {
  Clipboard,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  Vibration,
} from 'react-native';

const styles = StyleSheet.create({
  textBlock: {
    backgroundColor: '#f2f2f2',
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  textBlockText: {
    flex: 1,
    fontFamily: 'Roboto_Mono',
  },
});

export default class TextBlock extends React.PureComponent {
  onLongPress = () => {
    const { text } = this.props;
    Vibration.vibrate(10);
    ToastAndroid.show('Copied to clipboard', ToastAndroid.SHORT);
    Clipboard.setString(text);
  };

  render() {
    const { text } = this.props;
    if (text) {
      return (
        <TouchableOpacity
          style={styles.textBlock}
          onLongPress={this.onLongPress}
        >
          <Text style={styles.textBlockText}>{text}</Text>
        </TouchableOpacity>
      );
    }
    return null;
  }
}
