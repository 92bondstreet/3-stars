import * as React from 'react';
import { connectStateResults } from 'react-instantsearch-dom';

import { UikContentTitle, UikTag, UikWidget } from '@uik';

import styles from './hits-stats.module.scss';

const Stats = connectStateResults(({searchResults}) => {
  const facets = searchResults && searchResults.facets || [];
  const {data} = facets.find(item => item.name === 'type') || {'data': {}};

  return (
    <UikWidget margin>
      <div className={styles.boxes}>
        <div className={styles.box}>
          <UikContentTitle>Newsletter posts</UikContentTitle>
          <div className={styles.boxContent}>
            <span className={styles.boxValue}>📱 {data.newsletter}</span>
          </div>
        </div>
        <div className={styles.box}>
          <UikContentTitle>Podcats</UikContentTitle>
          <div className={styles.boxContent}>
            <span className={styles.boxValue}>🎙️ {data.podcast}</span>
          </div>
        </div>
      </div>
    </UikWidget>
  );
});

export default Stats;
