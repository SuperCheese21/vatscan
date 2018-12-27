import React from 'react';
import { ProgressBar } from 'react-native-paper';

import colors from '../config/colors.json';

const FlightProgressBar = props => (
    <ProgressBar
        style={{
            flex: 1,
            marginLeft: 20,
            marginRight: 20
        }}
        progress={props.progress}
        color={colors.accent}
    />
);

export default FlightProgressBar;
