import React from 'react';

import Layout from '../components/Layout';
import SEO from '../components/Seo';
import { OverlayLeft as NavPush, Hamburger } from 'navpush';
import theme from 'navpush/dist/styles/OverlayLeft.module.scss';
import styles from './styles.module.scss';
import HamburgerTheme from 'navpush/dist/styles/Hamburger.module.scss';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={ [ `gatsby`, `application`, `react` ] } />
    <NavPush
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
    </NavPush>
  </Layout>
);

export default IndexPage;
