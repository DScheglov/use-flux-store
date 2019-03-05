import React, {
  useContext, useMemo, useCallback
} from 'react';

export const ReduxContext = React.createContext(null);
export const { Provider, Consumer } = ReduxContext;

const stateItSelf = state => state;

export function useStoredState(selector = stateItSelf, ...selectorArgs) {
  const store = useContext(ReduxContext);
  const state = store.getState();
  return useMemo(
    () => selector(state, ...selectorArgs),
    [state, ...selectorArgs]
  );
}

export function useAction(actionCreator, deps) {
  const store = useContext(ReduxContext);

  return useCallback(
    (...args) => store.dispatch(
      actionCreator(...args)
    ), deps // eslint-disable-line react-hooks/exhaustive-deps
  );
}
