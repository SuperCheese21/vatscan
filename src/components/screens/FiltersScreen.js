import React, { PureComponent } from 'react';

import ConfigScreen from './ConfigScreen';

import ChipRow from '../common/ChipRow';
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
        <ChipRow
          label="Client Types"
          currentFilters={currentFilters}
          filterKey="clientTypes"
          setFilters={setFilters}
        />
        <ChipRow
          label="Controller Types"
          currentFilters={currentFilters}
          filterKey="controllerTypes"
          setFilters={setFilters}
        />
      </ConfigScreen>
    );
  }
}

FiltersScreen.propTypes = {
  navigation: navigationShape.isRequired,
  screenProps: screenPropsShape.isRequired,
};
