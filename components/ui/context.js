import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';

const initialState = {};

const UiContext = createContext(initialState);

const uiReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const UiProvider = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  const value = useMemo(() => ({}), []);

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
};

export const useUiContext = () => useContext(UiContext);
