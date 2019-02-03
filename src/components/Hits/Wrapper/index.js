import * as React from 'react';

import { UikWidget } from '@uik';

import styles from './wrapper.module.scss';

const HitsWrapper = props => (
  <UikWidget className={styles.wrapper} margin {...props} />
);

export default HitsWrapper;
