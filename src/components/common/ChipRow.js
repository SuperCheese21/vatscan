import { func, object, string } from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Chip } from 'react-native-paper';

const styles = StyleSheet.create({
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
});

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
  filterKey: string.isRequired,
  currentFilters: object.isRequired,
  setFilters: func.isRequired,
};

export default ChipRow;
