import { useReducer, useCallback, useRef, useMemo } from 'react';
import { combineReducers, compose } from 'redux';

const INIT = {
  type: `@@INIT${Math.random().toFixed(20).slice(2)}`
}

const getInitialState = (reducer, initialState) => ({
  ...reducer(undefined, INIT),
  ...initialState
});

const applyMiddlewares = (store, originalDispatch, middlewares) => {
  const bindedToStore = middlewares.map(
    middleware => middleware(store)
  );
  return compose(...bindedToStore)(originalDispatch);
}

export default function useStore(reducers, middlewares, initialState) {
  const reducer = useCallback(
    combineReducers(reducers),
    [reducers]
  );

  const [state, originalDispatch] = useReducer(
    reducer,
    undefined,
    () => getInitialState(reducer, initialState)
  );
  
  const stateRef = useRef();
  const dispatchRef = useRef();

  const dispatch = useCallback(
    (...args) => dispatchRef.current(...args),
    []
  );

  const getState = useCallback(
    () => stateRef.current,
    [] // no deps
  );

  const store = useMemo(
    () => ({ dispatch, getState }),
    [dispatch, getState]
  )

  dispatchRef.current = useCallback(
    applyMiddlewares(store, originalDispatch, middlewares),
    [store, originalDispatch, middlewares]
  );

  stateRef.current = state;

  return store;
}