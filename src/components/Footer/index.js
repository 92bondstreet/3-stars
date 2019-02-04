import React from 'react';
import Emoji from 'a11y-react-emoji';

import styles from './footer.module.scss';

const Header = () => (
  <div className={styles.aboutAppContainer}>
    <div className={styles.copyright}>
      <span>
        Yassine x{' '}
        <a
          href="https://github.com/92bondstreet"
          target="_blank"
          rel="noopener noreferrer"
        >
          92 Bond Street
        </a>
      </span>
    </div>
    <div className={styles.copyAbout}>
      <span>
        <Emoji symbol="🎨" label="Artist Palette" /> Built with{' '}
        <a
          href="https://janlosert.com/store/dashboard-ui-kit-3.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Dashboard UI Kit 3.0
        </a>
        .
      </span>
      <span>
        <Emoji symbol="🚀" label="Rocket" /> Powered by{' '}
        <a
          href="https://www.algolia.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Algolia
        </a>
        .
      </span>
      <span>
        <Emoji symbol="📅" label="Calendar" /> {new Date().getFullYear()}.
      </span>
    </div>
  </div>
);

export default Header;
