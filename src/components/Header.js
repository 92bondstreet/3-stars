import * as React from 'react';

import {
  UikTopBar,
  UikTopBarSection,
  UikTopBarMenuDivider,
  UikTopBarTitle,
  Uikon,
  UikInput,
} from '@uik';

const Header = () => (
  <UikTopBar>
    <UikTopBarSection>
      <UikTopBarTitle>👩‍🍳 3-stars brain food</UikTopBarTitle>
      <UikTopBarMenuDivider />
      <UikInput icon={<Uikon>search_left</Uikon>} placeholder="Search..." />
    </UikTopBarSection>
  </UikTopBar>
);

export default Header;
