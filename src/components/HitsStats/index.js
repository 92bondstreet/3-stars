import * as React from 'react';
import { connectStateResults } from 'react-instantsearch-dom';

import { UikContentTitle, UikWidget } from '@uik';

import styles from './hits-stats.module.scss';

/**
 * Get data from a facet name
 * @param  {Object} results - algolia search results
 * @param  {String} name - of facet
 * @return {Object} facet's data
 */
const getFacet = (results = {}, name = '') => {
  const facets = (results && results.facets) || [];
  const { data } = facets.find(item => item.name === name) || { data: {} };

  return data;
};

const Stats = connectStateResults(({ searchResults }) => {
  const data = getFacet(searchResults, 'type');

  return (
    <UikWidget margin>
      <div className={styles.boxes}>
        <div className={styles.box}>
          <UikContentTitle>Newsletter posts</UikContentTitle>
          <div className={styles.boxContent}>
            <span className={styles.boxValue}>📱 {data.newsletter || 0}</span>
          </div>
        </div>
        <div className={styles.box}>
          <UikContentTitle>Podcats</UikContentTitle>
          <div className={styles.boxContent}>
            <span className={styles.boxValue}>🎙️ {data.podcast || 0}</span>
          </div>
        </div>
      </div>
    </UikWidget>
  );
});

export default Stats;
