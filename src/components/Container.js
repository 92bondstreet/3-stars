import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Hits from './Hits';
import orderBy from 'lodash.orderby';
import Sources from './Sources';
import classnames from 'classnames';
import {
  UikTabContainer,
  UikTabItem,
  UikContainerHorizontal,
  UikContainerVertical,
  Uikon,
  UikNavPanel,
} from '@uik';

import styles from './container.module.scss';

const tabItems = [
  {
    className: 'Menu',
    icon: 'gallery_grid_view',
    content: <Uikon>gallery_grid_view</Uikon>,
  },
  {
    id: 'centerIcon',
    className: 'Home',
    icon: 'home',
    content: <Uikon>home</Uikon>,
  },
];

class Container extends React.PureComponent<{
  location: Object,
}> {
  static getDerivedStateFromProps(props, state) {
    return {
      ...state,
      activeContent: state.activeContent,
    };
  }

  state = {
    activeContent: 'Home',
  };

  setActiveContent = content => () => {
    this.setState({
      activeContent: content,
    });
  };

  render() {
    const { activeContent } = this.state;

    return (
      <UikContainerVertical>
        <Header />
        <UikTabContainer className={styles.mobileNavigation}>
          {tabItems.map(item => (
            <UikTabItem
              key={classnames(styles.mobileItem, item.className)}
              className={classnames(styles.mobileItem, {
                active: activeContent === item.className,
              })}
              onClick={this.setActiveContent(item.className)}
              size="smaller"
            >
              <Uikon>{item.id === 'centerIcon' ? 'home' : item.icon}</Uikon>
            </UikTabItem>
          ))}
        </UikTabContainer>
        <UikContainerHorizontal
          className={classnames(styles.contentContainer, {
            [styles[activeContent]]: activeContent,
          })}
        >
          <UikNavPanel>
            <Sources
              attribute="domain"
              limit="50"
              transformItems={items =>
                orderBy(items, ['count', 'label'], ['desc', 'asc'])
              }
              defaultRefinement={[
                'softwareleadweekly',
                'lethain',
                'pragmaticengineer',
              ]}
            />
            <Footer />
          </UikNavPanel>

          <div className={styles.content}>
            <Hits />
          </div>
        </UikContainerHorizontal>
      </UikContainerVertical>
    );
  }
}

export default Container;

/*
 */
