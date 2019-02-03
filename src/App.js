import React, { Component } from 'react';
import algoliasearch from 'algoliasearch/lite';
import Header from './components/Header';
import Hits from './components/Hits';
import Sources from './components/Sources';
import { Configure, InstantSearch } from 'react-instantsearch-dom';

import { UikContainerHorizontal, UikContainerVertical } from '@uik';
import { ALGOLIA_APPLICATION_ID, ALGOLIA_API_KEY } from './constants';

import cls from './App.module.scss';
import '@uik/styles.css'; //eslint-disable-line
import './algolia.scss';

const searchClient = algoliasearch(ALGOLIA_APPLICATION_ID, ALGOLIA_API_KEY);

class App extends Component {
  render() {
    return (
      <div className={cls.app}>
        <InstantSearch searchClient={searchClient} indexName="threestars">
          <Configure facets={['type']} />
          <UikContainerVertical>
            <Header />
            <UikContainerHorizontal>
              <Sources attribute="domain" />
              <Hits />
            </UikContainerHorizontal>
          </UikContainerVertical>
        </InstantSearch>
      </div>
    );
  }
}

export default App;
