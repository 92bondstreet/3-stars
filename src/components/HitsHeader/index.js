import * as React from 'react';
import { AVATAR, TYPE } from './constants';
import Emoji from 'a11y-react-emoji';
import format from 'date-fns/format';
import PropTypes from 'prop-types';
import { UikAvatar } from '@uik';

import styles from './hits-header.module.scss';

const HitsHeader = ({ date, domain, source, title, type, url }) => {
  const avatar = AVATAR[domain] || {};
  const emoji = TYPE[type];

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

HitsHeader.propTypes = {
  date: PropTypes.string.isRequired,
  domain: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default HitsHeader;
