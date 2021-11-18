import * as Linking from 'expo-linking';
import { string } from 'prop-types';
import React from 'react';
import { Share } from 'react-native';
import { IconButton } from 'react-native-paper';

import { accent as accentColor } from '../../config/colors.json';

const ShareButton = ({ callsign }) => (
  <IconButton
    icon="share"
    color={accentColor}
    onPress={() => {
      const url = Linking.createURL(`clients/${callsign}`);
      const message = `Check out ${callsign} on VATSCAN!\n\n${url}`;
      Share.share({ message, url });
    }}
  />
);

ShareButton.propTypes = {
  callsign: string.isRequired,
};

export default ShareButton;
