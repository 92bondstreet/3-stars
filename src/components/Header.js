import * as React from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';

import {
  UikTopBar,
  UikTopBarSection,
  UikTopBarMenuDivider,
  UikTopBarTitle,
  Uikon,
  UikInput,
} from '@uik';

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
      <UikTopBarTitle>👩‍🍳 3-stars brain food</UikTopBarTitle>
      <UikTopBarMenuDivider />
      <MySearchBox />
    </UikTopBarSection>
  </UikTopBar>
);

export default Header;
