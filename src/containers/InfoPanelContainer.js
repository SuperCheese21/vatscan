import React from 'react';
import { Animated, StyleSheet } from 'react-native';

import BasicDataContainer from './BasicDataContainer';
import ControllerDataContainer from './ControllerDataContainer';
import DetailDataContainer from './DetailDataContainer';
import { defaultPanelPosition } from '../config/constants.json';
import { primary as primaryColor } from '../config/colors.json';

const styles = StyleSheet.create({
  infoPanelContainer: {
    width: '100%',
    height: 154,
    position: 'absolute',
    bottom: defaultPanelPosition,
    backgroundColor: primaryColor,
  },
});

const InfoPanelContainer = ({
  focusedClient,
  panelPosition,
  stackNavigation,
}) => (
  <Animated.View
    style={[
      styles.infoPanelContainer,
      {
        transform: [
          {
            translateY: panelPosition,
          },
        ],
      },
    ]}
  >
    <Data stackNavigation={stackNavigation} focusedClient={focusedClient} />
  </Animated.View>
);

const Data = ({ focusedClient, stackNavigation }) => {
  if (focusedClient.type === 'PILOT') {
    return (
      <>
        <BasicDataContainer
          stackNavigation={stackNavigation}
          data={focusedClient}
        />
        <DetailDataContainer data={focusedClient} />
      </>
    );
  }
  if (focusedClient.type === 'ATC') {
    return (
      <ControllerDataContainer
        stackNavigation={stackNavigation}
        data={focusedClient}
      />
    );
  }
  return null;
};

export default InfoPanelContainer;
