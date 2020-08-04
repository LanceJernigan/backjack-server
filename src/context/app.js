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
        const isDuplicate = state.players.reduce(
          (_isDuplicate, player) =>
            _isDuplicate || player.senderId === action.player.senderId,
          false
        );

        return {
          ...state,
          players: isDuplicate
            ? state.players
            : [...state.players, action.player],
        };

      case 'remove player':
        return {
          ...state,
          players: state.players.filer(
            ({ senderId }) => senderId !== action.player.senderId
          ),
        };

      default:
        throw new Error();
    }
  }, initialState);

  context.addEventListener(
    castReceiver.framework.system.EventType.SENDER_CONNECTED,
    (player) =>
      dispatch({
        type: 'add player',
        player,
      })
  );

  context.addEventListener(
    castReceiver.framework.system.EventType.SENDER_DISDCONNECTED,
    (player) =>
      dispatch({
        type: 'remove player',
        player,
      })
  );

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { appContext, AppProvider };
