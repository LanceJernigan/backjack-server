import React, { useContext, useEffect } from 'react';
import { appContext } from '../../context/app';
import castReceiver from 'castReceiver';

export default () => {
  const { state, dispatch } = useContext(appContext);

  console.log(state.players, 'players');

  return (
    <section>
      <h2>Players</h2>
      <ul>
        {state.players.map(({ name, senderId, userAgent }) => (
          <li>
            <h5>{name}</h5>
            <p>
              {senderId}: {userAgent}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};
