import * as React from 'react';
import { connectHits } from 'react-instantsearch-dom';
import { UikContainerHorizontal, UikScrollArea, UikDivider } from '@uik';
import HitsWrapper from '../HitsWrapper';

import styles from './hits.module.scss';

const Hits = connectHits(({ hits }) => (
  <UikContainerHorizontal className={styles.page}>
    <UikScrollArea className={styles.mainContent}>
      {hits.map(hit => (
        <HitsWrapper key={hit.objectID}>
          <p>{hit.title}</p>
          <p>{hit.tldr}</p>
          <p>{hit.date}</p>
          <p>{hit.domain}</p>
          <UikDivider />
        </HitsWrapper>
      ))}
    </UikScrollArea>
  </UikContainerHorizontal>
));

export default Hits;
