import React from 'react';
import { StyleSheet } from 'react-native';
import { List, Surface, TouchableRipple } from 'react-native-paper';

export default class ClientsListItem extends React.PureComponent {
  leftIcon = itemProps => (
    <List.Icon
      {...itemProps}
      icon={
        this.props.client.type === 'ATC' ? 'rss-feed' : 'airplanemode-active'
      }
    />
  );

  onPress = () => {
    this.props.stackNavigation.navigate('ClientScreen', {
      callsign: this.props.client.callsign,
      removeFocusedClient: true
    });
  };

  render() {
    return (
      <Surface style={styles.listItem}>
        <TouchableRipple onPress={this.onPress}>
          <List.Item
            title={this.props.client.callsign}
            description={
              this.props.client.name + ' (' + this.props.client.id + ')'
            }
            left={this.leftIcon}
          />
        </TouchableRipple>
      </Surface>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    elevation: 5,
    margin: 5,
    borderRadius: 5
  }
});
