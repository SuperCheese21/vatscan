import { createSelector } from 'reselect';

const getState = state => state || {};

const getFilters = createSelector([getState], ({ filters }) => filters);

const getFontsLoaded = createSelector(
  [getState],
  ({ fontsLoaded }) => fontsLoaded,
);

const getFocusedClient = createSelector(
  [getState],
  ({ focusedClient }) => focusedClient,
);

const getPanelPosition = createSelector(
  [getState],
  ({ panelPosition }) => panelPosition,
);

const getPanelPositionValue = createSelector(
  [getState],
  ({ panelPositionValue }) => panelPositionValue,
);

const mapStateToSelectors = state => ({
  filters: getFilters(state),
  fontsLoaded: getFontsLoaded(state),
  focusedClient: getFocusedClient(state),
  panelPosition: getPanelPosition(state),
  panelPositionValue: getPanelPositionValue(state),
});

export default mapStateToSelectors;
