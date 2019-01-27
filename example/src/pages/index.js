import React from 'react';
import Layout from '../components/Layout';
import Dashboard from '../components/Dashboard';
import SEO from '../components/Seo';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={ [ `gatsby`, `application`, `react` ] } />
    <Dashboard />
  </Layout>
);

export default IndexPage;
