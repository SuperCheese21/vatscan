import PropTypes from 'prop-types';
import { PureComponent } from 'react';

export default class MapOverlay extends PureComponent {
  onPress = () => {
    const { client, setFocusedClient } = this.props;
    if (setFocusedClient) {
      setFocusedClient(client);
    }
  };
}

MapOverlay.propTypes = {
  client: PropTypes.object.isRequired,
  setFocusedClient: PropTypes.func.isRequired,
};
