import * as React from 'react';
import { AVATAR } from './constants';
import format from 'date-fns/format';
import PropTypes from 'prop-types';
import { UikAvatar } from '@uik';

import cls from './hits-header.module.scss';

const HitsHeader = ({ date, domain, title, url }) => {
  const avatar = AVATAR[domain] || {};

  return (
    <div className={cls.wrapper}>
      <UikAvatar
        className={cls[avatar.class || domain]}
        avatarPlaceholder={{
          content: avatar.content,
        }}
        name={
          <a href={url} target="_blank" rel="noopener noreferrer">
            <strong>{title}</strong>
          </a>
        }
        textBottom={format(new Date(date), 'MMMM DD, YYYY')}
      />
    </div>
  );
};

HitsHeader.propTypes = {
  date: PropTypes.string.isRequired,
  domain: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default HitsHeader;
