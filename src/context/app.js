import React, { createContext, useReducer } from 'react';

const initialState = { players: [] };
const appContext = createContext(initialState);
const { Provider } = appContext;

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'add player':
        return { ...state, players: [...state.players, action.payload] };
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { appContext, AppProvider };
