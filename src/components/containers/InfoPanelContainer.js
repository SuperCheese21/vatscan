import PropTypes from 'prop-types';
import React from 'react';
import { Animated, StyleSheet } from 'react-native';

import BasicDataContainer from './BasicDataContainer';
import ControllerDataContainer from './ControllerDataContainer';
import DetailDataContainer from './DetailDataContainer';

import { navigationShape } from '../propTypeShapes';
import { primary as primaryColor } from '../../config/colors.json';
import { DEFAULT_PANEL_POSITION } from '../../config/constants';

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
          client={focusedClient}
        />
        <DetailDataContainer client={focusedClient} />
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

InfoPanelContainer.propTypes = {
  focusedClient: PropTypes.object.isRequired,
  panelPosition: PropTypes.instanceOf(Animated.Value).isRequired,
  stackNavigation: navigationShape.isRequired,
};

Data.propTypes = {
  focusedClient: PropTypes.object.isRequired,
  stackNavigation: navigationShape.isRequired,
};

const styles = StyleSheet.create({
  infoPanelContainer: {
    width: '100%',
    height: 154,
    position: 'absolute',
    bottom: DEFAULT_PANEL_POSITION,
    backgroundColor: primaryColor,
  },
});

export default InfoPanelContainer;
