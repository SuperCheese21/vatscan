import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { Chip } from 'react-native-paper';

const ChipRow = ({ filterKey, currentFilters, setFilters }) => (
  <View style={styles.chipContainer}>
    {Object.keys(currentFilters[filterKey]).map(type => (
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
        style={styles.chip}
      >
        {type}
      </Chip>
    ))}
  </View>
);

ChipRow.propTypes = {
  filterKey: PropTypes.string.isRequired,
  currentFilters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
};

const styles = {
  chipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  chip: {
    marginRight: 8,
    marginTop: 4,
    marginBottom: 4,
    padding: 3,
  },
};

export default ChipRow;
