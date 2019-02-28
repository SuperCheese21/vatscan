import React from 'react';
import { Animated } from 'react-native';

import BasicDataContainer from './BasicDataContainer';
import ControllerDataContainer from './ControllerDataContainer';
import DetailDataContainer from './DetailDataContainer';
import styles from '../styles';

const InfoPanelContainer = props => (
    <Animated.View
        style={[
            styles.infoPanelContainer,
            {
                transform: [{
                    translateY: props.panelPosition
                }]
            }
        ]}
    >
        <Data
            stackNavigation={props.stackNavigation}
            focusedClient={props.focusedClient}
        />
    </Animated.View>
);

const Data = props => {
    if (props.focusedClient.type === 'PILOT') {
        return (
            <>
                <BasicDataContainer
                    stackNavigation={props.stackNavigation}
                    data={props.focusedClient}
                />
                <DetailDataContainer data={props.focusedClient} />
            </>
        );
    } else if (props.focusedClient.type === 'ATC') {
        return (
            <ControllerDataContainer
                stackNavigation={props.stackNavigation}
                data={props.focusedClient}
            />
        );
    }
    return null;
}

export default InfoPanelContainer;
