import * as React from 'react';
import { connectHighlight } from 'react-instantsearch-dom';
import PropTypes from 'prop-types';

import styles from './highlight.module.scss';

const Highlight = connectHighlight(({ highlight, attribute, hit }) => {
  const parsedHit = highlight({
    highlightProperty: '_highlightResult',
    attribute,
    hit,
  });

  return (
    <p>
      {parsedHit.map((part, index) =>
        part.isHighlighted ? (
          <mark key={index} className={styles.highlight}>
            {part.value}
          </mark>
        ) : (
          <span key={index}>{part.value}</span>
        )
      )}
    </p>
  );
});

Highlight.propTypes = {
  highlight: PropTypes.func,
  attribute: PropTypes.string.isRequired,
  hit: PropTypes.object.isRequired,
};

export default Highlight;
