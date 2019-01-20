import React from 'react';

import Layout from '../components/Layout';
import SEO from '../components/Seo';
import NavPush from 'navpush/src/strategy/push/right';
import theme from 'navpush/src/strategy/push/right/styles.module.scss';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <NavPush
      dim
      theme={theme}
      nav={<NavPush.Nav>navpush</NavPush.Nav>}
      sidebar={<NavPush.Sidebar>Hello</NavPush.Sidebar>}
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
