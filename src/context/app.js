import React, { createContext, useReducer } from 'react';
import castReceiver from 'castReceiver';

const context = castReceiver.framework.CastReceiverContext.getInstance();
context.start();

const initialState = { players: [], reciverContext: context };
const appContext = createContext(initialState);
const { Provider } = appContext;

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'add player':
        return { ...state, players: [{ senderId: '1', userAgent: '2' }] };
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { appContext, AppProvider };
