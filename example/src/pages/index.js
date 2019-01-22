import React from 'react';

import Layout from '../components/Layout';
import SEO from '../components/Seo';
import { OverlayLeft } from 'navpush';
import theme from 'navpush/src/strategy/overlay/left/styles.module.scss';
import styles from './styles.module.scss';
import HamburgerMenu from 'react-hamburger-menu';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={ [ `gatsby`, `application`, `react` ] } />
    <OverlayLeft
      dim
      theme={ theme }
      nav={ (isOpen, toggle) => (
        <div className="container">
          <div className={ styles.Nav__items }>
            navpush
            <div className={ styles.Nav__hamburger }>
              <HamburgerMenu
                animationDuration={ 0.3 }
                height={ 20 }
                width={ 30 }
                isOpen={ isOpen }
                menuClicked={ toggle }
                strokeWidth={ 4 }
                color="white"
              />
            </div>
          </div>
        </div>
      ) }
      sidebar={ (isOpen, toggle) => <>Hello</> }
    >
      <section className="hero is-primary is-fullheight">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Cafe CS</h1>
            <h2>A catchy line</h2>
          </div>
        </div>
      </section>
    </OverlayLeft>
  </Layout>
);

export default IndexPage;
