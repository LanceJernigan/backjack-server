import React, { useContext, useEffect } from 'react';
import { appContext } from '../../context/app';
import castReceiver from 'castReceiver';

export default () => {
  const { state, dispatch } = useContext(appContext);

  return (
    <section>
      <h2>Players</h2>
      <ul>
        {state.players.map(({ senderId, userAgent }) => (
          <li>
            {senderId}: {userAgent}
          </li>
        ))}
      </ul>
    </section>
  );
};
