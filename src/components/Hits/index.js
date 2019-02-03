import * as React from 'react';
import { connectHits } from 'react-instantsearch-dom';
import Header from './Header';
import Stats from './Stats';
import { UikContainerVertical, UikScrollArea, UikDivider } from '@uik';
import Wrapper from './Wrapper';

import styles from './hits.module.scss';

const Hits = connectHits(({ hits }) => (
  <UikContainerVertical className={styles.page}>
    <UikScrollArea className={styles.mainContent}>
      <Stats />
      {hits.map(hit => (
        <Wrapper key={hit.objectID}>
          <Header
            date={hit.date}
            domain={hit.domain}
            source={hit.source}
            title={hit.title}
            type={hit.type}
            url={hit.url}
          />
          <p>{hit.tldr}</p>
          <UikDivider />
        </Wrapper>
      ))}
    </UikScrollArea>
  </UikContainerVertical>
));

export default Hits;
