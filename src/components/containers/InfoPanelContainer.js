import React from 'react';
import { Animated } from 'react-native';

import BasicData from './BasicDataContainer';
import ControllerData from './ControllerDataContainer';
import DetailData from './DetailDataContainer';
import styles from '../styles';

const InfoPanelContainer = props => (
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
        return (
            <ControllerData data={props.focusedClient} />
        );
    }
    return null;
}

export default InfoPanelContainer;