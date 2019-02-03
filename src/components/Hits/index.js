import * as React from 'react';
import { connectHits, Stats } from 'react-instantsearch-dom';
import HitsHeader from '../HitsHeader';
import HitsWrapper from '../HitsWrapper';
import { UikContainerVertical, UikScrollArea, UikDivider } from '@uik';
import HitsStats from '../HitsStats';

import styles from './hits.module.scss';

const Hits = connectHits(({ hits }) => (
  <UikContainerVertical className={styles.page}>
    <UikScrollArea className={styles.mainContent}>
      <HitsStats />
      {hits.map(hit => (
        <HitsWrapper key={hit.objectID}>
          <HitsHeader
            date={hit.date}
            domain={hit.domain}
            source={hit.source}
            title={hit.title}
            type={hit.type}
            url={hit.url}
          />
          <p>{hit.tldr}</p>
          <UikDivider />
        </HitsWrapper>
      ))}
    </UikScrollArea>
  </UikContainerVertical>
));

export default Hits;
