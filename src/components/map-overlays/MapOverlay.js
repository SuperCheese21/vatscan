import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import Client from '../../api/Client';

export default class MapOverlay extends PureComponent {
  onPress = () => {
    const { client, setFocusedClient } = this.props;
    if (setFocusedClient) {
      setFocusedClient(client);
    }
  };
}

MapOverlay.propTypes = {
  client: PropTypes.instanceOf(Client).isRequired,
  setFocusedClient: PropTypes.func.isRequired,
};
