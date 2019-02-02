import * as React from 'react';
import { connectHits } from 'react-instantsearch-dom';
import { UikContainerHorizontal, UikScrollArea, UikDivider } from '@uik';
import HitsHeader from '../HitsHeader';
import HitsWrapper from '../HitsWrapper';

import styles from './hits.module.scss';

const Hits = connectHits(({ hits }) => (
  <UikContainerHorizontal className={styles.page}>
    <UikScrollArea className={styles.mainContent}>
      {hits.map(hit => (
        <HitsWrapper key={hit.objectID}>
          <HitsHeader date={hit.date} domain={hit.domain} title={hit.title} />
          <p>{hit.tldr}</p>
          <UikDivider />
        </HitsWrapper>
      ))}
    </UikScrollArea>
  </UikContainerHorizontal>
));

export default Hits;
