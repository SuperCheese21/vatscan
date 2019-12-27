import { PureComponent } from 'react';

export default class MapOverlay extends PureComponent {
  onPress = () => {
    const { client, setFocusedClient } = this.props;
    if (setFocusedClient) {
      setFocusedClient(client);
    }
  };
}
