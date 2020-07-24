import React, { createContext, useReducer } from 'react';
import castReceiver from 'castReceiver';

const context = castReceiver.framework.CastReceiverContext.getInstance();
context.start();

const initialState = { players: context.getSenders, reciverContext: context };
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

  context.addEventListener('SENDER_CONNECTED', (...props) =>
    dispatch({
      type: 'add player',
      payload: props,
    })
  );

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { appContext, AppProvider };
