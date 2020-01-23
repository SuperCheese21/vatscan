import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { connect } from 'react-redux';

import Map from '../common/Map';
import Text from '../common/Text';
import InfoPanelContainer from '../containers/InfoPanelContainer';
import {
  animatedValueShape,
  clientsShape,
  screenPropsShape,
} from '../propTypeShapes';
import { accent as accentColor } from '../../config/colors.json';
import { collapsePanel, setFocusedClient } from '../../redux/actions';
import {
  getFilteredClients,
  getFocusedClient,
  getIsLoading,
  getPanelPosition,
} from '../../redux/selectors';

class MapScreen extends PureComponent {
  componentDidMount() {
    const { dispatchCollapsePanel } = this.props;

    // Add listener for Android hardware back button to close info panel
    BackHandler.addEventListener('hardwareBackPress', dispatchCollapsePanel);
  }

  componentWillUnmount() {
    const { dispatchCollapsePanel } = this.props;

    // Remove back button listener before component is unmounted
    BackHandler.removeEventListener('hardwareBackPress', dispatchCollapsePanel);
  }

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="google-maps" size={20} color={tintColor} />
    ),
  };

  render() {
    const {
      dispatchCollapsePanel,
      dispatchSetFocusedClient,
      filteredClients,
      focusedClient,
      isLoading,
      panelPosition,
      screenProps: { stackNavigation },
    } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Map style={{ flex: 1 }} onPress={dispatchCollapsePanel}>
          {filteredClients.map(client => {
            const isFocusedClient = focusedClient.callsign === client.callsign;
            return client.getMapOverlay(
              isFocusedClient,
              dispatchSetFocusedClient,
            );
          })}
        </Map>
        <ActivityIndicator
          color={accentColor}
          animating={isLoading}
          style={styles.activityIndicator}
        />
        <Text style={styles.clientCountText}>
          {`Clients: ${filteredClients.length}`}
        </Text>
        <InfoPanelContainer
          stackNavigation={stackNavigation}
          panelPosition={panelPosition}
          focusedClient={focusedClient}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  activityIndicator: {
    position: 'absolute',
    right: 3,
    top: 3,
  },
  clientCountText: {
    fontFamily: 'Roboto_Regular',
    position: 'absolute',
    left: 5,
    top: 2,
  },
});

MapScreen.propTypes = {
  dispatchCollapsePanel: PropTypes.func.isRequired,
  dispatchSetFocusedClient: PropTypes.func.isRequired,
  filteredClients: clientsShape.isRequired,
  focusedClient: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  panelPosition: animatedValueShape.isRequired,
  screenProps: screenPropsShape.isRequired,
};

const mapStateToProps = state => ({
  filteredClients: getFilteredClients(state),
  focusedClient: getFocusedClient(state),
  isLoading: getIsLoading(state),
  panelPosition: getPanelPosition(state),
});

const mapDispatchToProps = {
  dispatchCollapsePanel: collapsePanel,
  dispatchSetFocusedClient: setFocusedClient,
};

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
