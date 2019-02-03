import * as React from 'react';
import { SOURCES, TYPES } from '../../constants';
import Emoji from 'a11y-react-emoji';
import format from 'date-fns/format';
import PropTypes from 'prop-types';
import { UikAvatar } from '@uik';

import styles from './header.module.scss';

const Header = ({ date, domain, source, title, type, url }) => {
  const avatar = SOURCES[domain] || {};
  const emoji = TYPES[type];

  return (
    <div className={styles.wrapper}>
      <UikAvatar
        className={styles[avatar.class || domain]}
        avatarPlaceholder={{
          content: avatar.content,
        }}
        name={
          <React.Fragment>
            <Emoji symbol={emoji.symbol} label={emoji.label} />
            <a href={url} target="_blank" rel="noopener noreferrer">
              <strong>{title}</strong>
            </a>
          </React.Fragment>
        }
        textBottom={
          <a
            className={styles.source}
            href={source}
            target="_blank"
            rel="noopener noreferrer"
          >
            {format(new Date(date), 'MMMM DD, YYYY')}
          </a>
        }
      />
    </div>
  );
};

Header.propTypes = {
  date: PropTypes.string.isRequired,
  domain: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default Header;
