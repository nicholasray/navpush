import React from 'react';

import Layout from '../components/Layout';
import SEO from '../components/Seo';
import { Push } from 'navpush';
import theme from 'navpush/src/strategy/push/left/styles.module.scss';
import styles from './styles.module.scss';
import HamburgerMenu from 'react-hamburger-menu';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={ [ `gatsby`, `application`, `react` ] } />
    <Push.left
      dim
      theme={ theme }
      nav={ (isOpen, onToggle) => (
        <div className="container">
          <div className={ styles.Nav__items }>
            <div className={ styles.Nav__hamburger }>
              <HamburgerMenu
                animationDuration={ 0.3 }
                height={ 20 }
                width={ 30 }
                isOpen={ isOpen }
                menuClicked={ onToggle }
                strokeWidth={ 4 }
                color="white"
              />
            </div>
          </div>
        </div>
      ) }
      sidebar={ <>Hello</> }
    >
      <section className="hero is-primary is-fullheight">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Cafe CS</h1>
            <h2>A catchy line</h2>
          </div>
        </div>
      </section>
    </Push.left>
  </Layout>
);

export default IndexPage;
