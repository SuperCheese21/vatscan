import { createSelector } from 'reselect';

const getState = state => state || {};

const getFilters = createSelector([getState], ({ filters }) => filters);

const getFontsLoaded = createSelector(
  [getState],
  ({ fontsLoaded }) => fontsLoaded,
);

const getFocusedClientId = createSelector(
  [getState],
  ({ focusedClientId }) => focusedClientId,
);

const getPanelPosition = createSelector(
  [getState],
  ({ panelPosition }) => panelPosition,
);

const getPanelPositionValue = createSelector(
  [getState],
  ({ panelPositionValue }) => panelPositionValue,
);

const getSearchQuery = createSelector(
  [getState],
  ({ searchQuery }) => searchQuery,
);

const mapStateToSelectors = state => ({
  filters: getFilters(state),
  fontsLoaded: getFontsLoaded(state),
  focusedClientId: getFocusedClientId(state),
  panelPosition: getPanelPosition(state),
  panelPositionValue: getPanelPositionValue(state),
  searchQuery: getSearchQuery(state),
});

export default mapStateToSelectors;
