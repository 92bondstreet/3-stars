import React, { Component } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { Configure, InstantSearch } from 'react-instantsearch-dom';
import '@uik/styles.css'; //eslint-disable-line
import '@uik/index.scss'; //eslint-disable-line
import styles from './app.module.scss';
import Container from './components/Container';
import { ALGOLIA_APPLICATION_ID, ALGOLIA_API_KEY } from './constants';

const searchClient = algoliasearch(ALGOLIA_APPLICATION_ID, ALGOLIA_API_KEY);

/**
 * Use the pathname to set the index
 * @return {String} index
 */
const getIndex = () => {
  const path = window.location.pathname;

  if (path === '/') {
    return 'threestars';
  }

  return path.replace(/\//g, '');
};

class App extends Component {
  render() {
    const index = getIndex();

    return (
      <div className={styles.app}>
        <InstantSearch searchClient={searchClient} indexName={index}>
          <Configure facets={['type']} />
          <Container />
        </InstantSearch>
      </div>
    );
  }
}

export default App;
