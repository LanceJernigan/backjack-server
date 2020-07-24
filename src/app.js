import React from 'react';
import GlobalStyles from './global.styles';
import Styles from './app.styles';
import { AppProvider } from './context/app';
import Test from './components/test';

export default () => (
  <AppProvider>
    <Styles>
      <GlobalStyles />
      <Test />
    </Styles>
  </AppProvider>
);
