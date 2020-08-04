import React, { createContext, useReducer } from 'react';
import cast from 'castReceiver';

const BACKJACK_NAMESPACE = 'urn:x-cast:backjack';
const context = cast.framework.CastReceiverContext.getInstance();
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
          players: state.players.filter(
            ({ senderId }) => senderId !== action.player.senderId
          ),
        };

      case 'update player':
        return {
          ...state,
          players: state.players.map((player) => ({ ...player, data })),
        };

      default:
        throw new Error();
    }
  }, initialState);

  context.addEventListener(
    cast.framework.system.EventType.SENDER_CONNECTED,
    (player) =>
      dispatch({
        type: 'add player',
        player,
      })
  );

  context.addEventListener(
    cast.framework.system.EventType.SENDER_DISDCONNECTED,
    (player) =>
      dispatch({
        type: 'remove player',
        player,
      })
  );

  context.addEventListener(cast.framework.system.EventType.READY, () => {
    context.addCustomMessageListener(
      BACKJACK_NAMESPACE,
      (type, data) => console.log(type) || dispatch(data)
    );
  });

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { appContext, AppProvider };
