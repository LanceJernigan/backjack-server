import React from 'react';
import { Global, css } from '@emotion/core';
import normalize from 'emotion-normalize';

const styles = css`
  ${normalize}
`;

export default () => <Global styles={styles} />;
