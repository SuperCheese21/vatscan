import React from 'react';
import { Animated, StyleSheet } from 'react-native';

import BasicDataContainer from './BasicDataContainer';
import ControllerDataContainer from './ControllerDataContainer';
import DetailDataContainer from './DetailDataContainer';
import { defaultPanelPosition } from '../config/constants.json';
import { primary as primaryColor } from '../config/colors.json';

const InfoPanelContainer = props => (
  <Animated.View
    style={[
      styles.infoPanelContainer,
      {
        transform: [
          {
            translateY: props.panelPosition
          }
        ]
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
};

const styles = StyleSheet.create({
  infoPanelContainer: {
    width: '100%',
    height: 154,
    position: 'absolute',
    bottom: defaultPanelPosition,
    backgroundColor: primaryColor
  }
});

export default InfoPanelContainer;
