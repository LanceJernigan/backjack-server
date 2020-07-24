import React, { createContext, useReducer } from 'react';
import castReceiver from 'castReceiver';

const context = castReceiver.framework.CastReceiverContext.getInstance();
const playerManager = context.getPlayerManager();
context.start();

const initialState = { players: [], reciverContext: context };
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

  console.log(context.getSenders, 'pre load');

  playerManager.setMessageInterceptor(
    castReceiver.framework.messages.MessageType.LOAD,
    () => console.log(context.getSenders(), 'loaded')
  );

  context.addEventListener('SENDER_CONNECTED', (...props) =>
    dispatch({
      type: 'add player',
      payload: props,
    })
  );

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { appContext, AppProvider };
