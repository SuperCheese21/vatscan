import React from 'react';
import { Animated, StyleSheet } from 'react-native';

import BasicDataContainer from './BasicDataContainer';
import ControllerDataContainer from './ControllerDataContainer';
import DetailDataContainer from './DetailDataContainer';
import useClientData from '../../api/useClientData';
import { primary as primaryColor } from '../../config/colors.json';
import { DEFAULT_PANEL_POSITION } from '../../config/constants';
import { useAppContext } from '../../context';

const styles = StyleSheet.create({
  infoPanelContainer: {
    width: '100%',
    height: 154,
    position: 'absolute',
    bottom: DEFAULT_PANEL_POSITION,
    backgroundColor: primaryColor,
  },
});

const InfoPanelContainer = () => {
  const { panelPosition } = useAppContext();
  const { focusedClient } = useClientData();
  return (
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
      {focusedClient.type === 'PILOT' ? (
        <>
          <BasicDataContainer />
          <DetailDataContainer />
        </>
      ) : (
        <ControllerDataContainer />
      )}
    </Animated.View>
  );
};

export default InfoPanelContainer;
