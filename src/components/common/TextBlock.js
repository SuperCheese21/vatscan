import { string } from 'prop-types';
import React from 'react';
import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  Vibration,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

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

const TextBlock = ({ text }) => {
  const onLongPress = () => {
    Vibration.vibrate(10);
    ToastAndroid.show('Copied to clipboard', ToastAndroid.SHORT);
    Clipboard.setString(text);
  };

  return text ? (
    <TouchableOpacity style={styles.textBlock} onLongPress={onLongPress}>
      <Text style={styles.textBlockText}>{text}</Text>
    </TouchableOpacity>
  ) : null;
};

TextBlock.propTypes = {
  text: string,
};

TextBlock.defaultProps = {
  text: '',
};

export default TextBlock;
