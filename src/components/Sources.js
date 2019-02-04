import * as React from 'react';
import { connectRefinementList } from 'react-instantsearch-dom';

import { UikNavSectionTitle, UikNavSection, UikNavLink } from '@uik';

import { SOURCES } from './constants';

const Sources = connectRefinementList(({ items, refine }) => (
  <UikNavSection>
    <UikNavSectionTitle>The Sources</UikNavSectionTitle>
    {items.map(item => (
      <UikNavLink
        className={item.isRefined && 'active'}
        onClick={event => {
          event.preventDefault();
          refine(item.value);
        }}
        icon={SOURCES[item.label].emoji || '🚀'}
        key={item.label}
        highlighted={item.isRefined}
        rightEl={item.count}
      >
        {SOURCES[item.label].label || item.label}
      </UikNavLink>
    ))}
  </UikNavSection>
));

export default Sources;
