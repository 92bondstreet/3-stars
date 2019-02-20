import * as React from 'react';
import differenceInDays from 'date-fns/difference_in_days';
import PropTypes from 'prop-types';
import { UikStatusDot } from '@uik';

import styles from './latest.module.scss';

const Latest = ({ date }) => {
  const diff = differenceInDays(new Date(), new Date(date));

  return diff <= 7 ? <UikStatusDot className={styles.week} /> : null;
};

Latest.propTypes = {
  date: PropTypes.string.isRequired,
};

export default Latest;
