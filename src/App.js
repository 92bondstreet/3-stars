import React, { Component } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { Configure, InstantSearch } from 'react-instantsearch-dom';
import '@uik/styles.css'; //eslint-disable-line
import './algolia.scss';
import styles from './app.module.scss';
import Container from './components/Container';
import { ALGOLIA_APPLICATION_ID, ALGOLIA_API_KEY } from './constants';

const searchClient = algoliasearch(ALGOLIA_APPLICATION_ID, ALGOLIA_API_KEY);

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <InstantSearch searchClient={searchClient} indexName="threestars">
          <Configure facets={['type']} />
          <Container />
        </InstantSearch>
      </div>
    );
  }
}

export default App;
