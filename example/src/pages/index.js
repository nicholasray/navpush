import React from 'react';

import Layout from '../components/Layout';
import SEO from '../components/Seo';
import { PushRight } from 'navpush';
import theme from 'navpush/src/strategy/push/right/styles.module.scss';
import styles from './styles.module.scss';
import Hamburger from 'navpush/src/Hamburger';
import HamburgerTheme from 'navpush/src/Hamburger/styles.module.scss';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={ [ `gatsby`, `application`, `react` ] } />
    <PushRight
      dim
      theme={ theme }
      nav={ (isOpen, toggle) => (
        <div className="container">
          <div className={ styles.Nav__items }>
            navpush
            <div className={ styles.Nav__hamburger }>
              <Hamburger onClick={ toggle } theme={ HamburgerTheme } />
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
    </PushRight>
  </Layout>
);

export default IndexPage;
