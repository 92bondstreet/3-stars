import React, { Component } from 'react';
import { connectInfiniteHits } from 'react-instantsearch-dom';
import Header from './Header';
import Highlight from './Highlight';
import PropTypes from 'prop-types';
import Stats from './Stats';
import { UikContainerVertical, UikScrollArea, UikDivider } from '@uik';
import Wrapper from './Wrapper';

import styles from './hits.module.scss';

class InfiniteHits extends Component {
  static propTypes = {
    hits: PropTypes.arrayOf(PropTypes.object).isRequired,
    hasMore: PropTypes.bool.isRequired,
    refine: PropTypes.func.isRequired,
  };

  sentinel = null;

  onSentinelIntersection = entries => {
    const { hasMore, refine } = this.props;

    entries.forEach(entry => {
      if (entry.isIntersecting && hasMore) {
        refine();
      }
    });
  };

  componentDidMount() {
    this.observer = new IntersectionObserver(this.onSentinelIntersection);

    this.observer.observe(this.sentinel);
  }

  componentWillUnmount() {
    this.observer.disconnect();
  }

  render() {
    const { hits } = this.props;
    return (
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
              <Highlight hit={hit} attribute="tldr" />
              <UikDivider />
            </Wrapper>
          ))}
          <div
            className="ais-InfiniteHits-sentinel"
            ref={c => (this.sentinel = c)}
          />
        </UikScrollArea>
      </UikContainerVertical>
    );
  }
}

export default connectInfiniteHits(InfiniteHits);
