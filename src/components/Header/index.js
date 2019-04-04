import * as React from 'react';
import Emoji from 'a11y-react-emoji';
import { connectSearchBox } from 'react-instantsearch-dom';

import {
  UikTopBar,
  UikTopBarSection,
  UikTopBarMenuDivider,
  UikTopBarTitle,
  Uikon,
  UikInput,
} from '@uik';

import styles from './header.module.scss';

const MySearchBox = connectSearchBox(({ currentRefinement, refine }) => (
  <UikInput
    icon={<Uikon>search_left</Uikon>}
    placeholder="Search..."
    value={currentRefinement}
    onChange={e => {
      refine(e.target.value);
    }}
  />
));

const Header = () => (
  <UikTopBar>
    <UikTopBarSection>
      <UikTopBarTitle>
        <Emoji symbol="👩‍🍳 " label="Chef" className={styles.emoji} /> 3-stars
        brain food
      </UikTopBarTitle>
      <UikTopBarMenuDivider />
      <MySearchBox />
    </UikTopBarSection>
  </UikTopBar>
);

export default Header;
