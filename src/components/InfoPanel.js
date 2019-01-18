import React from 'react';
import { Animated } from 'react-native';

import BasicData from './BasicData';
import DetailData from './DetailData';
import styles from './styles';

const InfoPanel = props => (
    <Animated.View
        style={[
            styles.infoPanelContainer,
            { bottom: props.panelPosition }
        ]}
    >
        <Data focusedClient={props.focusedClient} />
    </Animated.View>
);

const Data = props => {
    if (props.focusedClient.type === 'PILOT') {
        return (
            <>
                <BasicData data={props.focusedClient} />
                <DetailData data={props.focusedClient} />
            </>
        );
    } else if (props.focusedClient.type === 'ATC') {
        return null;
    }
}

export default InfoPanel;
