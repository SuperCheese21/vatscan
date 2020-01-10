import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { Chip } from 'react-native-paper';

const ChipRow = ({ filterKey, currentFilters, setFilters }) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
    }}
  >
    {Object.keys(currentFilters[filterKey]).map(type => {
      return (
        <Chip
          key={`chip_${filterKey}_${type}`}
          selected={currentFilters[filterKey][type]}
          onPress={() => {
            const newFilters = {
              [filterKey]: {
                ...currentFilters[filterKey],
              },
            };
            newFilters[filterKey][type] = !newFilters[filterKey][type];
            setFilters(newFilters);
          }}
          style={{
            marginRight: 8,
            marginTop: 4,
            marginBottom: 4,
            padding: 3,
          }}
        >
          {type}
        </Chip>
      );
    })}
  </View>
);

ChipRow.propTypes = {
  filterKey: PropTypes.string.isRequired,
  currentFilters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
};

export default ChipRow;