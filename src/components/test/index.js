import React, { useContext, useEffect } from 'react';
import { appContext } from '../../context/app';
import castReceiver from 'castReceiver';

export default () => {
  const { state, dispatch } = useContext(appContext);

  console.log(state.players);

  return (
    <section>
      <h2>Players</h2>
      <ul>
        {state.players.map(({ id, userAgent }) => (
          <li>
            {senderId}: {userAgent}
          </li>
        ))}
      </ul>
    </section>
  );
};
