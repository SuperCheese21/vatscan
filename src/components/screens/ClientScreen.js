import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import ConfigScreen from './ConfigScreen';

import ShareButton from '../common/ShareButton';
import ClientStatsContainer from '../containers/ClientStatsContainer';
import ControllerStatsContainer from '../containers/ControllerStatsContainer';
import FlightPlanContainer from '../containers/FlightPlanContainer';
import FlightStatsContainer from '../containers/FlightStatsContainer';
import { clientsShape, navigationShape } from '../propTypeShapes';
import { collapsePanel, setFocusedClient } from '../../redux/actions';
import { getClients, getFocusedClient } from '../../redux/selectors';

class ClientScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const callsign = navigation.getParam('callsign');
    return {
      title: callsign,
      headerRight: () => <ShareButton callsign={callsign} />,
    };
  };

  componentDidMount() {
    const { clients, dispatchSetFocusedClient, navigation } = this.props;
    const focusedCallsign = navigation.getParam('callsign');
    const focusedClient = clients.find(
      client => client.callsign === focusedCallsign,
    );
    if (focusedClient) {
      dispatchSetFocusedClient(focusedClient);
    }
  }

  componentWillUnmount() {
    const { dispatchCollapsePanel, navigation } = this.props;
    if (navigation.getParam('removeFocusedClient')) {
      dispatchCollapsePanel();
    }
  }

  render() {
    const { focusedClient, navigation } = this.props;
    return (
      <ConfigScreen navigation={navigation} refresh>
        <ClientStatsContainer />

        {focusedClient.type === 'PILOT' ? (
          <>
            <FlightPlanContainer />
            <FlightStatsContainer />
          </>
        ) : (
          <ControllerStatsContainer />
        )}
      </ConfigScreen>
    );
  }
}

ClientScreen.propTypes = {
  clients: clientsShape.isRequired,
  focusedClient: PropTypes.object.isRequired,
  dispatchCollapsePanel: PropTypes.func.isRequired,
  dispatchSetFocusedClient: PropTypes.func.isRequired,
  navigation: navigationShape.isRequired,
};

const mapStateToProps = state => ({
  clients: getClients(state),
  focusedClient: getFocusedClient(state),
});

const mapDispatchToProps = {
  dispatchCollapsePanel: collapsePanel,
  dispatchSetFocusedClient: setFocusedClient,
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientScreen);
