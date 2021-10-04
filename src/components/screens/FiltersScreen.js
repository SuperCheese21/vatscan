import React, { PureComponent } from 'react';
import { TextInput } from 'react-native-paper';

import ConfigScreen from './ConfigScreen';

import ChipRow from '../common/ChipRow';
import ConfigRow from '../common/ConfigRow';
import { navigationShape, screenPropsShape } from '../propTypeShapes';

export default class FiltersScreen extends PureComponent {
  static navigationOptions = {
    title: 'Filters',
  };

  render() {
    const {
      navigation,
      screenProps: { filters: currentFilters, setFilters },
    } = this.props;

    return (
      <ConfigScreen navigation={navigation}>
        <ConfigRow label="Networks">
          <ChipRow
            currentFilters={currentFilters}
            filterKey="dataSources"
            setFilters={setFilters}
          />
        </ConfigRow>
        <ConfigRow label="Client Type">
          <ChipRow
            currentFilters={currentFilters}
            filterKey="clientTypes"
            setFilters={setFilters}
          />
        </ConfigRow>
        <ConfigRow label="Controller Type">
          <ChipRow
            currentFilters={currentFilters}
            filterKey="controllerTypes"
            setFilters={setFilters}
          />
        </ConfigRow>
        <ConfigRow label="Aircraft Type (ICAO)" style={styles.configRow}>
          <TextInput
            dense
            value={currentFilters.aircraft}
            onChangeText={aircraft => setFilters({ aircraft })}
          />
        </ConfigRow>
        <ConfigRow label="Airline (ICAO)" style={styles.configRow}>
          <TextInput
            dense
            value={currentFilters.airline}
            onChangeText={airline => setFilters({ airline })}
          />
        </ConfigRow>
        <ConfigRow label="Dep/Arr Airport (ICAO)" style={styles.configRow}>
          <TextInput
            dense
            value={currentFilters.airport}
            onChangeText={airport => setFilters({ airport })}
          />
        </ConfigRow>
      </ConfigScreen>
    );
  }
}

FiltersScreen.propTypes = {
  navigation: navigationShape.isRequired,
  screenProps: screenPropsShape.isRequired,
};

const styles = {
  configRow: {
    width: 180,
  },
};
