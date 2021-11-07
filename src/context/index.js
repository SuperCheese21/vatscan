import React, { createContext, useContext } from 'react';
import { arrayOf, node, oneOfType } from 'prop-types';
import { useImmerReducer } from 'use-immer';

import mapDispatchToActions from './actions';
import { immerReducer, initialState } from './reducer';
import mapStateToSelectors from './selectors';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useImmerReducer(immerReducer, initialState);

  const dispatchWithThunk = action => {
    if (typeof action === 'function') {
      return action(dispatch, () => state);
    }
    return dispatch(action);
  };

  const actions = mapDispatchToActions(dispatchWithThunk);
  const currentState = mapStateToSelectors(state);

  return (
    <AppContext.Provider
      value={{
        ...actions,
        ...currentState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: oneOfType([node, arrayOf(node)]).isRequired,
};

export const useAppContext = () => useContext(AppContext);

export default AppProvider;
