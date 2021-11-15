import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

import ConfigScreen from './ConfigScreen';
import ChipRow from '../common/ChipRow';
import ConfigRow from '../common/ConfigRow';
import { navigationShape } from '../propTypeShapes';
import { useAppContext } from '../../context';

const styles = StyleSheet.create({
  configRow: {
    width: 180,
  },
});

export const FiltersScreen = ({ navigation }) => {
  const { filters, setFilters } = useAppContext();

  return (
    <ConfigScreen navigation={navigation}>
      <ConfigRow label="Networks">
        <ChipRow
          currentFilters={filters}
          filterKey="dataSources"
          setFilters={setFilters}
        />
      </ConfigRow>
      <ConfigRow label="Client Type">
        <ChipRow
          currentFilters={filters}
          filterKey="clientTypes"
          setFilters={setFilters}
        />
      </ConfigRow>
      <ConfigRow label="Controller Type">
        <ChipRow
          currentFilters={filters}
          filterKey="controllerTypes"
          setFilters={setFilters}
        />
      </ConfigRow>
      <ConfigRow label="Aircraft Type (ICAO)" style={styles.configRow}>
        <TextInput
          dense
          value={filters.aircraft}
          onChangeText={aircraft => setFilters({ aircraft })}
        />
      </ConfigRow>
      <ConfigRow label="Airline (ICAO)" style={styles.configRow}>
        <TextInput
          dense
          value={filters.airline}
          onChangeText={airline => setFilters({ airline })}
        />
      </ConfigRow>
      <ConfigRow label="Dep/Arr Airport (ICAO)" style={styles.configRow}>
        <TextInput
          dense
          value={filters.airport}
          onChangeText={airport => setFilters({ airport })}
        />
      </ConfigRow>
    </ConfigScreen>
  );
};

FiltersScreen.navigationOptions = {
  title: 'Filters',
};

FiltersScreen.propTypes = {
  navigation: navigationShape.isRequired,
};

export default FiltersScreen;
