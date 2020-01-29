import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { connect } from 'react-redux';

import ConfigScreen from './ConfigScreen';

import ChipRow from '../common/ChipRow';
import ConfigRow from '../common/ConfigRow';
import { navigationShape } from '../propTypeShapes';
import { setFilters } from '../../redux/actions';
import { getFilters } from '../../redux/selectors';

class FiltersScreen extends PureComponent {
  static navigationOptions = {
    title: 'Filters',
  };

  render() {
    const { dispatchSetFilters, filters, navigation } = this.props;

    return (
      <ConfigScreen navigation={navigation}>
        <ConfigRow label="Client Type">
          <ChipRow filterKey="clientTypes" />
        </ConfigRow>
        <ConfigRow label="Controller Type">
          <ChipRow filterKey="controllerTypes" />
        </ConfigRow>
        <ConfigRow label="Aircraft Type (ICAO)" style={styles.configRow}>
          <TextInput
            dense
            value={filters.aircraft}
            onChangeText={aircraft => dispatchSetFilters({ aircraft })}
          />
        </ConfigRow>
        <ConfigRow label="Airline (ICAO)" style={styles.configRow}>
          <TextInput
            dense
            value={filters.airline}
            onChangeText={airline => dispatchSetFilters({ airline })}
          />
        </ConfigRow>
        <ConfigRow label="Dep/Arr Airport (ICAO)" style={styles.configRow}>
          <TextInput
            dense
            value={filters.airport}
            onChangeText={airport => dispatchSetFilters({ airport })}
          />
        </ConfigRow>
      </ConfigScreen>
    );
  }
}

const styles = StyleSheet.create({
  configRow: {
    width: 180,
  },
});

FiltersScreen.propTypes = {
  dispatchSetFilters: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  navigation: navigationShape.isRequired,
};

const mapStateToProps = state => ({
  filters: getFilters(state),
});

const mapDispatchToProps = {
  dispatchSetFilters: setFilters,
};

export default connect(mapStateToProps, mapDispatchToProps)(FiltersScreen);
