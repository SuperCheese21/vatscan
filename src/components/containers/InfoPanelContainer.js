import PropTypes from 'prop-types';
import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import BasicDataContainer from './BasicDataContainer';
import ControllerDataContainer from './ControllerDataContainer';
import DetailDataContainer from './DetailDataContainer';

import { navigationShape } from '../propTypeShapes';
import { primary as primaryColor } from '../../config/colors.json';
import { defaultPanelPosition } from '../../config/constants.json';
import { getFocusedClient, getPanelPosition } from '../../redux/selectors';

const InfoPanelContainer = ({
  focusedClient: { type },
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
    {type === 'PILOT' ? (
      <>
        <BasicDataContainer stackNavigation={stackNavigation} />
        <DetailDataContainer />
      </>
    ) : (
      <ControllerDataContainer stackNavigation={stackNavigation} />
    )}
  </Animated.View>
);

InfoPanelContainer.propTypes = {
  focusedClient: PropTypes.object.isRequired,
  panelPosition: PropTypes.instanceOf(Animated.Value).isRequired,
  stackNavigation: navigationShape.isRequired,
};

const styles = StyleSheet.create({
  infoPanelContainer: {
    width: '100%',
    height: 154,
    position: 'absolute',
    bottom: defaultPanelPosition,
    backgroundColor: primaryColor,
  },
});

const mapStateToProps = state => ({
  focusedClient: getFocusedClient(state),
  panelPosition: getPanelPosition(state),
});

export default connect(mapStateToProps)(InfoPanelContainer);
