import React from 'react';
import { Share } from 'react-native';
import { IconButton } from 'react-native-paper';
import { Linking } from 'expo';

import colors from '../config/colors.json';

const ShareButton = ({ callsign }) => (
    <IconButton
        icon='share'
        color={colors.accent}
        onPress={() => {
            const url = Linking.makeUrl('clients/' + callsign);
            const message = 'Check out ' + callsign + ' on VATSCAN!\n\n' + url;
            Share.share({
                message: message, url: url
            });
        }}
    />
);

export default ShareButton;
